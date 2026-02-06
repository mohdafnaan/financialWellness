import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Emailotp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_URL
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${url}/email-otp`,
        {otp}
      );

      if(res.status === 200){
        localStorage.setItem("token",res.data.token)
      }
      setSuccess(res.data.msg);
      console.log(res)

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.msg || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-teal-600 px-4">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          Verify Your Email ✉️
        </h2>

        <p className="text-sm text-center text-gray-500 mb-6">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={verifyOtp} className="space-y-4">

          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-3 border rounded-xl"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Emailotp;
