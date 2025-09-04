import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOTP({ lang = "En" }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();

  const t = {
    En: {
      title: "Verify OTP",
      desc: "Enter the 6-digit OTP sent to your email",
      button: "Verify OTP",
      alert: "Please enter a valid 6-digit OTP.",
    },
    Am: {
      title: "ኦቲፒ ያረጋግጡ",
      desc: "ወደ ኢሜይልዎ የተላከውን 6-አሃዝ ኦቲፒ ያስገቡ",
      button: "ኦቲፒ ያረጋግጡ",
      alert: "እባክዎ ትክክለኛ 6-አሃዝ ኦቲፒ ያስገቡ።",
    },
  };

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto focus next box
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    if (otp.join("").length === 6) {
      navigate("/reset-password");
    } else {
      alert(t[lang].alert);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t[lang].title}
        </h2>
        <p className="text-gray-600 mb-6">{t[lang].desc}</p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#007799] text-white py-3 rounded-xl font-semibold hover:bg-[#006680] transition"
        >
          {t[lang].button}
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;
