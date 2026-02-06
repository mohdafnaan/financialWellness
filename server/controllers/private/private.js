import express from "express";
import userModel from "../../models/User/User.js";
import CRON from "../../utils/cron.js";
import sendMail from "../../utils/mailer.js";
const router = express.Router();

router.get("/cron",async (req,res)=>{
    try {
        await sendMail
        await CRON();
        await userModel.updateOne({email : req.user.email},{$set: {isActive : true}})
        res.status(200).json({msg : "tips will be sent everyday at 9:00 am", isActive: true})
    } catch (error) {
        console.log(error)
        res.status(200).json(error)
    }
})

export default router;