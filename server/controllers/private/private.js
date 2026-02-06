import express from "express";
import userModel from "../../models/User/User.js";
import CRON from "../../utils/cron.js";
import sendMail from "../../utils/mailer.js";
import { serviceStartedEmail } from "../../utils/templates/serviceStartedEmail.js";
const router = express.Router();

router.get("/cron",async (req,res)=>{
    try {
        await sendMail(
            req.user.email,
            "Service Started – Financial Wellness Tips",
            "We're excited to let you know that your service has started! You will receive financial wellness tips daily at 9:00 PM.",
            serviceStartedEmail
        );
        await CRON();
        await userModel.updateOne({email : req.user.email},{$set: {isActive : true}})
        res.status(200).json({msg : "tips will be sent everyday at 9:00 PM", isActive: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong" });
    }
})

export default router;