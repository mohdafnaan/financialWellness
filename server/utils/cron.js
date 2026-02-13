import cron from "node-cron";
import userModel from "../models/User/User.js";
import sendTip from "./tipMailer.js";

function CRON (){
    cron.schedule("0 21 * * *",async ()=>{
        console.log("Running Daily Tip Cron Job...");
        try {
            const users = await userModel.find({ tipsSent: { $lt: 30 }, isActive: true });
            console.log(`Found ${users.length} active users to send tips to.`);

            for (let user of users){
                const day = user.tipsSent;

                await sendTip(user.email, day);

                user.tipsSent += 1;
                await user.save();
            }
        } catch (error) {
            console.error("Error in Cron Job:", error);
        }
    });
}

export default CRON;