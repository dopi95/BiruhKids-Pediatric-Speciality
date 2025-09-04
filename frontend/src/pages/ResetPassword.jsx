// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword({ lang = "En" }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const t = {
    En: {
      title: "Reset Password",
      newPw: "New Password",
      confirmPw: "Confirm Password",
      button: "Change Password",
      success: "Password changed successfully!",
      error: "Passwords do not match or are too short!",
    },
    Am: {
      title: "የይለፍ ቃል ዳግም አስጀምር",
      newPw: "አዲስ የይለፍ ቃል",
      confirmPw: "የይለፍ ቃል ያረጋግጡ",
      button: "የይለፍ ቃል ይቀይሩ",
      success: "የይለፍ ቃል በተሳካ ሁኔታ ተቀይሯል!",
      error: "የይለፍ ቃሎች አይዛመዱም ወይም በጣም አጭር ናቸው!",
    },
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      alert(t[lang].success);
      navigate("/login");
    } else {
      alert(t[lang].error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {t[lang].title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t[lang].newPw}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t[lang].confirmPw}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#007799] text-white py-3 rounded-lg font-semibold hover:bg-[#006680] transition"
          >
            {t[lang].button}
          </button>
        </form>
      </div>
    </div>
  );
}
