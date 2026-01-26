import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailOtp: {
      type: String,
      default: null,
    },
    tipsSent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
