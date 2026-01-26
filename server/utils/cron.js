import cron from "node-cron";
import userModel from "../models/User/User.js";
import sendTip from "./tipMailer.js";

function CRON (){
cron.schedule("40 9 * * *",async ()=>{
    const users = await userModel.find({tipsSent:{$lt:30}})

    for (let user of users){
        const day = user.tipsSent;

        await sendTip(user.email,day);

        user.tipsSent +=1 ;
        await user.save()
    }
})
}

export default CRON;