import mailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
import tips from './tips.js';
import { tipEmailTemplate } from './templates/tipEmail.js';

async function sendTip(email, day) {
    
    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "mohdafnaan833@gmail.com",
            pass: process.env.PASS
        }
    });

    const tipContent = tips[day] || "Stay consistent with your financial goals!";
    const currentDay = day + 1;

    try {
        const info = await transporter.sendMail({
            from: '"Financial Wellness" <mohdafnaan833@gmail.com>',
            to: email,
            subject: `Day ${currentDay}: Money Saving Tip`,
            html: tipEmailTemplate(currentDay, tipContent)
        });
        console.log(`Tip sent for Day ${currentDay} to ${email}: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending tip to ${email}:`, error);
    }
}

export default sendTip;
