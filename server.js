import {app} from "./app.js";
import { dbConnect } from "./config/dbConnect.js";
import dotenv from 'dotenv'

dotenv.config()

dbConnect()

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`)
})