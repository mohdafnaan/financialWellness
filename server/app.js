import express from "express"
import dotenv from "dotenv"
dotenv.config();
// import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
// const corsObject = {
//     origin : ["http://localhost:5173"],
//     methods : ["POST","GET","PUT","DELETE"]
// }
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
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
// app.use(cors(corsObject))
const port = process.env.PORT;
const buildPath = path.join(__dirname,"dist")
// app.get("/",(req,res)=>{
//     try {
//         res.status(200).json({msg:"sever is live"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error)
//     }
// })
app.get("*",(req,res)=>{
    res.sendFile(path.join(buildPath,"index.html"))
})
app.use("/public",publicRouter)
app.use(middleware)
app.use("/private",privateRouter)
app.listen(port,()=>{
    console.log(`sever is running at http://localhost:${port}`)
})