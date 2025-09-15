import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../services/authService";
import Alert from "../components/Alert";

function VerifyOTP({ lang = "En" }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [hasAttempted, setHasAttempted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const inputRefs = useRef([]);

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
      
      // Reset attempt status when user changes input
      if (hasAttempted) {
        setHasAttempted(false);
        setAlert(null);
      }

      // Auto focus next box
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      
      // Reset attempt status when user modifies input
      if (hasAttempted) {
        setHasAttempted(false);
        setAlert(null);
      }
      
      if (otp[index]) {
        // Clear current field if it has a value
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous field and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length > 0) {
      const newOtp = Array(6).fill('');
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      
      // Focus the next empty field or last field
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Auto-submit when all 6 digits are entered (only if not already attempted)
  useEffect(() => {
    const otpString = otp.join('');
    if (otpString.length === 6 && !isLoading && !hasAttempted) {
      handleSubmit();
    }
  }, [otp, isLoading, hasAttempted]);

  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setAlert({ type: "error", message: t[lang].alert });
      return;
    }

    setIsLoading(true);
    setAlert(null);
    setHasAttempted(true);

    const result = await authService.verifyOtp(email, otpString);
    
    if (result.success) {
      setAlert({ type: "success", message: "OTP verified successfully!" });
      setTimeout(() => navigate("/reset-password", { state: { email, lang } }), 1500);
    } else {
      setAlert({ type: "error", message: result.error });
      // Keep hasAttempted as true to prevent auto-retry
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t[lang].title}
        </h2>
        <p className="text-gray-600 mb-6">{t[lang].desc}</p>
        
        {alert && <Alert type={alert.type} message={alert.message} />}

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg font-semibold"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#007799] text-white py-3 rounded-xl font-semibold hover:bg-[#006680] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : t[lang].button}
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP;
