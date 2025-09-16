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
    noAccount: "Don't have an account?",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <User className="text-white" size={32} />
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {t.title}
            </h1>
            <p className="text-gray-600 text-sm">
              {t.subtitle}
            </p>
          </div>

          {alert && <Alert type={alert.type} message={alert.message} />}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (alert) setAlert(null);
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder={t.passwordPlaceholder}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (alert) setAlert(null);
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-gray-700">{t.rememberMe}</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                {t.forgotPassword}
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
            >
              {isLoading ? "Signing in..." : t.signIn}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {t.noAccount}{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                {t.signUp}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}