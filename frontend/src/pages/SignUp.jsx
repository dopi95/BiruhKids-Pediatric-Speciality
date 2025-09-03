import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Smartphone } from "lucide-react";
import Alert from "../components/Alert";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [notify, setNotify] = useState(false);

  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const phoneRegex = /^(09|07)\d{8}$/;

  const validate = () => {
    const next = {};
    if (!fullName.trim()) next.fullName = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!emailRegex.test(email))
      next.email = "Please enter a valid email like example@gmail.com";
    if (!phone.trim()) next.phone = "Phone number is required";
    else if (!phoneRegex.test(phone))
      next.phone = "Enter a valid 10-digit phone number starting with 09 or 07";
    if (!password) next.password = "Password is required";
    else if (!pwRegex.test(password))
      next.password = "Min 8 chars with upper, lower, number & symbol";
    if (!confirm) next.confirm = "Please confirm your password";
    else if (confirm !== password) next.confirm = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setAlert({
        type: "error",
        message: "Please fix the errors and try again.",
      });
      return;
    }
    console.log("Notify by email:", notify);
    setAlert({ type: "success", message: "Account created! Redirecting..." });
    setTimeout(() => navigate("/signin"), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 sm:px-6 lg:px-8 pb-20">
      <div className="w-full mt-10 sm:mt-16 max-w-md bg-white shadow-md rounded-xl p-6 sm:p-8">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600" size={28} />
          </div>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-center mb-2">
          Create your account
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Sign up to manage your appointments
        </p>

        {alert && <Alert type={alert.type} message={alert.message} />}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium mb-2"
            >
              Full Name:
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 ${
                errors.fullName ? "border-red-300" : "border-gray-300"
              }`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address:
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number:
            </label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                }`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password:
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="Create a password"
                className={`w-full pl-10 pr-10 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-300" : "border-gray-300"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium mb-2">
              Confirm Password:
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                id="confirm"
                type={showPw2 ? "text" : "password"}
                placeholder="Re-enter your password"
                className={`w-full pl-10 pr-10 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 ${
                  errors.confirm ? "border-red-300" : "border-gray-300"
                }`}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500"
                onClick={() => setShowPw2((v) => !v)}
              >
                {showPw2 ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirm && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.confirm}
              </p>
            )}
          </div>

          {/* 🔹 Notify toggle switch */}
<div className="flex items-center justify-between">
  <div className="flex flex-col">
    <span className="text-sm sm:text-base text-gray-600 font-medium">
      Allow notifications
    </span>
    <span className="text-xs sm:text-sm text-gray-400">
      (notify me by email when any updates)
    </span>
  </div>

  <button
    type="button"
    onClick={() => setNotify((v) => !v)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
      notify ? "bg-blue-600" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
        notify ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
</div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
