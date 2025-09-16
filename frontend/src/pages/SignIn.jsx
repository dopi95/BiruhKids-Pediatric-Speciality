import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import { getUserRoleRedirect } from "../utils/authHelpers";

const translations = {
  En: {
    title: "Sign in to your account",
    subtitle: "Access your healthcare dashboard and manage your appointments",
    emailLabel: "Email Address:",
    emailPlaceholder: "Enter your email address",
    passwordLabel: "Password:",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot your password?",
    signIn: "Sign In",
    noAccount: "Don’t have an account?",
    signUp: "Sign Up",
    alerts: {
      success: "Signed in successfully!",
      error: "Please fix the errors and try again.",
    },
    errors: {
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "Password is required",
    },
  },
  Am: {
    title: "ወደ መለያዎ ይግቡ",
    subtitle: "የጤና ዳሽቦርድዎን ይጠቀሙ እና ቀጠሮዎችዎን ያቀናብሩ",
    emailLabel: "ኢሜይል አድራሻ:",
    emailPlaceholder: "ኢሜይል አድራሻዎን ያስገቡ",
    passwordLabel: "የይለፍ ቃል:",
    passwordPlaceholder: "የይለፍ ቃልዎን ያስገቡ",
    rememberMe: "አስታውሰኝ",
    forgotPassword: "የይለፍ ቃልዎን ረሱን?",
    signIn: "ይግቡ",
    noAccount: "መለያ የሎትም?",
    signUp: "ይመዝገቡ",
    alerts: {
      success: "በተሳካ ሁኔታ ገብተዋል!",
      error: "እባክዎ ስህተቶቹን ያስተካክሉ እና እንደገና ይሞክሩ።",
    },
    errors: {
      emailRequired: "ኢሜይል አስፈላጊ ነው",
      emailInvalid: "እባክዎ ትክክለኛ ኢሜይል ያስገቡ",
      passwordRequired: "የይለፍ ቃል አስፈላጊ ነው",
    },
  },
};

export default function SignIn({ lang = "En" }) {
  const t = translations[lang];
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = t.errors.emailRequired;
    else if (!emailRegex.test(email)) next.email = t.errors.emailInvalid;
    if (!password) next.password = t.errors.passwordRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setAlert({ type: "error", message: t.alerts.error });
      return;
    }

    setIsLoading(true);
    setAlert(null);

    const result = await login({ email, password });
    
    if (result.success) {
      setAlert({ type: "success", message: t.alerts.success });
      const redirectPath = getUserRoleRedirect(result.user.role);
      setTimeout(() => navigate(redirectPath), 1000);
    } else {
      setAlert({ type: "error", message: result.error });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 pb-48">
      <div className="w-full mt-20 max-w-md bg-white shadow-md rounded-xl p-8">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600" size={32} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-2">
          {t.title}
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          {t.subtitle}
        </p>

        {alert && <Alert type={alert.type} message={alert.message} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t.emailLabel}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (alert) setAlert(null);
                }}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-300" : "border-gray-300"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (alert) setAlert(null);
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" /> {t.rememberMe}
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              {t.forgotPassword}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : t.signIn}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {t.noAccount}{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            {t.signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}
