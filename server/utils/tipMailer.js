import mailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
import tips from './tips.js';

async function sendTip(email,day) {
    
    const transporter = mailer.createTransport({
        service : "gmail",
        auth : {
            user : "mohdafnaan833@gmail.com",
            pass : process.env.PASS
        }
    })
    const sender = await transporter.sendMail({
        from : "mohdafnaan833@gmail.com",
        to : email,
        subject : `Day ${day + 1} : Money Saving Tip`,
        html :` 
            <h2>Day ${day + 1} Tip</h2>
            <p>${tips[day]}</p>
            <p>See you tomorrow!</p>
            `
            }
)
console.log(`tip sent`,sender.messageId)
}

export default sendTip;
