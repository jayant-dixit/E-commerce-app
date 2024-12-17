import Stripe from "stripe";
import ApiResponse from "../../utils/ApiResponse.js";
import Cart from "../../models/cart.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import ApiError from "../../utils/ApiError.js";


const processOrderAndPayment = async (req, res, next) => {
    try {
        const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
        const userId = req.user._id;
        const { address } = req.body;

        // Fetch the user's cart and populate product details
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length <= 0) {
            return res.status(400).json(ApiResponse.error(400, "Cart is Empty"));
        }

        let totalPrice = 0;
        let orderItems = [];
        let totalQuantity = 0;

        // Calculate total price and prepare order items (no stock deduction yet)
        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);

            if (!product) {
                return res.status(404).json(ApiResponse.error(404, "Product is not available"));
            }

            if (product.stock < item.quantity) {
                return res.status(200).json(ApiResponse.error(200, `Insufficient Quantity of ${product.name}`));
            }

            totalPrice += product.price * item.quantity;
            totalQuantity += item.quantity;

            orderItems.push({
                product: item.product._id,
                quantity: item.quantity,
            });
        }

        // Create payment intent using Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100, // Amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
            receipt_email: req.user.email,
        });

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalQuantity,
            totalPrice,
            paymentDetails: {
                transactionId: paymentIntent.id,
                paymentMethod: "Card"
            },
            shippingAddress: address
        });

        // Send the clientSecret to the client for payment confirmation
        return res.status(200).json(
            ApiResponse.success(200, "Payment Intent Created", {
                clientSecret: paymentIntent.client_secret,
                totalPrice,
                totalQuantity,
                orderItems,
                orderId: order._id,
            })
        );
    } catch (error) {
        console.error(error);
        next(new ApiError(500, "Internal Server Error"));
    }
};

const confirmOrder = async (req, res, next) => {
    try {
        const { paymentIntentId, orderItems, orderId } = req.body;
        const userId = req.user._id;

        // Retrieve payment intent to ensure it's successful
        const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            const order = await Order.findByIdAndUpdate(orderId, {
                paymentDetails:{
                    status: "failed",
                }
            })
            return res.status(400).json(ApiResponse.error(400, "Payment not successful"));
        }

        let totalPrice = 0;
        let totalQuantity = 0;

        // Deduct stock after payment confirmation
        for (const item of orderItems) {
            const product = await Product.findById(item.product);

            if (!product || product.stock < item.quantity) {
                return res.status(400).json(ApiResponse.error(400, `Insufficient stock for ${product ? product.name : "a product"}`));
            }

            product.stock -= item.quantity;
            await product.save();

            totalPrice += product.price * item.quantity;
            totalQuantity += item.quantity;
        }

        // Create the order
        const order = await Order.findByIdAndUpdate(orderId, {
            paymentDetails: {
                status: "completed",
            },
        })

        // Clear the user's cart
        await Cart.findOneAndUpdate({ user: userId }, { items: [] });

        return res.status(200).json(ApiResponse.success(200, "Order Placed Successfully", order));
    } catch (error) {
        console.error(error);
        next(new ApiError(500, "Internal Server Error"));
    }
};


export  {
    processOrderAndPayment,
    confirmOrder
};
