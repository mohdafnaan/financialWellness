import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendTips = async () => {
    const token = localStorage.getItem("token");

    // Step 1: If no token -> go to login
    if (!token) {
      navigate("/login");
      return;
    }

    // Step 2: If token exists -> call backend API
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/private/cron",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );  
      console.log(res.data)
      if (res.data.isActive) {
        localStorage.setItem("isActive", "true");
      }
      setMessage(res.data.msg);
      navigate("/active");
    } catch (error) {
      setMessage("Something went wrong while sending tips");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-600 to-teal-600 text-white">

      <div className="flex flex-col items-center justify-center text-center px-6 py-24">

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl mb-6">
          <span className="text-5xl">💰</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Salary Saver Pro
        </h1>

        <p className="max-w-xl text-white/90 mb-8">
          Turn your monthly salary into smart savings and investments with 
          daily expert tips delivered straight to your inbox for 30 days.
        </p>

        <button
          onClick={handleSendTips}
          className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-100 transition"
        >
          {loading ? "Sending..." : "📩 Start Sending Tips"}
        </button>

        {message && (
          <p className="mt-4 text-yellow-200 font-semibold">
            {message}
          </p>
        )}

        <button
          onClick={logout}
          className="mt-6 bg-red-500 px-6 py-2 rounded-xl"
        >
          Logout
        </button>

      </div>

      {/* FEATURES */}
      <div className="bg-white text-gray-800 rounded-t-[40px] px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div className="p-6 rounded-2xl bg-green-50 text-center shadow">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-semibold mb-2">Register</h3>
            <p className="text-sm">
              Enter your email and monthly salary while signing up.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 text-center shadow">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="font-semibold mb-2">Daily Tips</h3>
            <p className="text-sm">
              Receive personalized saving and investment tips for 30 days.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 text-center shadow">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-semibold mb-2">Grow Money</h3>
            <p className="text-sm">
              Learn how to budget, save and invest smartly.
            </p>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center py-6 text-sm text-white/80">
        Built to help you manage your salary smarter 💡
      </div>

    </div>
  );
};

export default Home;
