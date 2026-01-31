import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Active = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isActive = localStorage.getItem("isActive");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!isActive) {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isActive");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">

      <div className="bg-white p-10 rounded-2xl shadow text-center">

        <h1 className="text-3xl font-bold text-green-700 mb-4">
          ✅ Tips Activated
        </h1>

        <p className="mb-6 text-gray-600">
          Your daily financial tips are now active.  
          Emails will be sent to your registered email for 30 days.
        </p>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded-xl"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Active;
