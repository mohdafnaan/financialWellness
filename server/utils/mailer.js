import mailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function sendMail(to, subject, text, html) {
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.PASS;
  if (!pass) {
    throw new Error(
      "Email not configured: Set GMAIL_APP_PASSWORD or PASS in .env (use Gmail App Password, not regular password)"
    );
  }

  const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER || "mohdafnaan833@gmail.com",
      pass,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER || "mohdafnaan833@gmail.com",
    to,
    subject,
    text,
  };
  if (html) mailOptions.html = html;

  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent:", info.messageId);
  return info;
}

export default sendMail;