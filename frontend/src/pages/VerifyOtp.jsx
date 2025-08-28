// src/pages/VerifyOtp.jsx
import React, { useState } from "react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Entered OTP: " + otp.join(""));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Verify OTP
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((data, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-lg sm:text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007799]"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold shadow-md transition transform hover:scale-[1.02]"
            style={{ backgroundColor: "#007799" }}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
