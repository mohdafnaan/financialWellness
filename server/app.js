import express from "express"
import dotenv from "dotenv"
dotenv.config();

// import database
import "./utils/dbConnect.js"

// import public routes
import publicRouter from "./controllers/public/public.js"
//import middleware
import middleware from "./auth/auth.js";
// import private routes
import privateRouter from "./controllers/private/private.js"
const app = express()
app.use(express.json()) 

const port = process.env.PORT;

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"sever is live"})
    } catch (error) {
        console.log(error)
    }
})

app.use("/public",publicRouter)
app.use(middleware)
app.use("/private",privateRouter)
app.listen(port,()=>{
    console.log(`sever is running at http://localhost:${port}`)
})