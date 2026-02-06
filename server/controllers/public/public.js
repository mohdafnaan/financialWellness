import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// import userSchema
import userModel from "../../models/User/User.js";

// import mailer
import sendMail from "../../utils/mailer.js";
import { getVerifyEmailHtml } from "../../utils/templates/verifyEmailTemplate.js";

const router = express.Router();

//register
router.post("/register", async (req, res) => {
  try {
    let { fullName, email, password, salary } = req.body;
    email = String(email || "").toLowerCase().trim();
    let dupuser = await userModel.findOne({ email });
    if (dupuser) {
      return res.status(400).json({ msg: "user already exists" });
    }
    let bPass = await bcrypt.hash(password, 10);
    let emailOtp = String(Math.floor(Math.random() * (9999 - 1000) + 1000));

    const user = await userModel.create({
      fullName,
      email,
      emailOtp,
      password: bPass,
      salary: Number(salary),
    });

    try {
      await sendMail(
        email,
        "Verify your email – Financial Wellness",
        `Your verification OTP is: ${emailOtp}\n\nEnter this code to verify your email.`,
        getVerifyEmailHtml(emailOtp)
      );
    } catch (mailError) {
      await userModel.deleteOne({ _id: user._id });
      console.log(mailError);
      return res.status(500).json({ msg: "Failed to send verification email. Please try again." });
    }
    res.status(200).json({ msg: "account created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// otp - email
router.post("/email-otp", async (req, res) => {
  try {
    let otp = String(req.body.otp || "").trim();
    let user = await userModel.findOne({ emailOtp: otp });
    if (!user) {
      return res.status(400).json({ msg: "invalid otp" });
    }
    let payload = {
      email : user.email,
      id: user._id,
    };

    let token = jwt.sign(payload, process.env.JWT_SECKEY, { expiresIn: "1D" });
    await userModel.updateOne(
      { emailOtp: otp },
      { $set: { emailVerified: true, emailOtp: null } },
    );
    res.status(200).json({ msg: "email verified successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = String(email || "").toLowerCase().trim();

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }

    let hPass = await bcrypt.compare(password, user.password);

    if (!hPass) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    let payload = {
      email,
      id: user._id,
    };

    let token = jwt.sign(payload, process.env.JWT_SECKEY, { expiresIn: "1D" });

    res.status(200).json({ msg: "login successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
export default router;
