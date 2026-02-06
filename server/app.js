import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const corsObject = {
    origin : ["http://localhost:5173","https://finance.afnaaan.in"],
    methods : ["POST","GET","PUT","DELETE"]
}
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
app.use(cors(corsObject))
const port = process.env.PORT;
const buildPath = path.join(__dirname,"dist")

// API routes MUST come before the catch-all for SPA
app.use("/public", publicRouter);
app.use("/private", middleware, privateRouter);

// Serve static assets (JS, CSS, images) from dist
app.use(express.static(buildPath));

// Catch-all for SPA - serve index.html for non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});