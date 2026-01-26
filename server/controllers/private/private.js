import express from "express";

import CRON from "../../utils/cron.js";

const router = express.Router();

router.get("/corn",async (req,res)=>{
    try {
        await CRON();
        res.status(200).json({msg : "tips will be sent everyday at 9:00 am"})
    } catch (error) {
        console.log(error)
        res.status(200).json(error)
    }
})

export default router;