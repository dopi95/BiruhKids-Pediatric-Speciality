import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Smartphone } from "lucide-react";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";

const translations = {
  En: {
    title: "Create your account",
    subtitle: "Sign up to manage your appointments",
    fullNameLabel: "Full Name:",
    fullNamePlaceholder: "Enter your full name",
    emailLabel: "Email Address:",
    emailPlaceholder: "Enter your email address",
    phoneLabel: "Phone Number:",
    phonePlaceholder: "Enter your phone number",
    passwordLabel: "Password:",
    passwordPlaceholder: "Create a password",
    confirmPasswordLabel: "Confirm Password:",
    confirmPasswordPlaceholder: "Re-enter your password",
    notifyTitle: "Allow notifications",
    notifyDesc: "(notify me by email when any updates)",
    signUp: "Sign Up",
    haveAccount: "Already have an account?",
    signIn: "Sign In",
    alerts: {
      success: "Account created! Redirecting...",
      error: "Please fix the errors and try again.",
    },
    errors: {
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email like example@gmail.com",
      phoneRequired: "Phone number is required",
      phoneInvalid: "Enter a valid 10-digit phone number starting with 09 or 07",
      passwordRequired: "Password is required",
      passwordWeak: "Min 8 chars with upper, lower, number & symbol",
      confirmRequired: "Please confirm your password",
      confirmMismatch: "Passwords do not match",
    },
  },
  Am: {
    title: "መለያዎን ይፍጠሩ",
    subtitle: "ቀጠሮዎትን ለመቆጣጠር ይመዝገቡ",
    fullNameLabel: "ሙሉ ስም:",
    fullNamePlaceholder: "ሙሉ ስምዎን ያስገቡ",
    emailLabel: "ኢሜይል አድራሻ:",
    emailPlaceholder: "ኢሜይል አድራሻዎን ያስገቡ",
    phoneLabel: "ስልክ ቁጥር:",
    phonePlaceholder: "ስልክ ቁጥርዎን ያስገቡ",
    passwordLabel: "የይለፍ ቃል:",
    passwordPlaceholder: "የይለፍ ቃል ይፍጠሩ",
    confirmPasswordLabel: "የይለፍ ቃል ያረጋግጡ:",
    confirmPasswordPlaceholder: "የይለፍ ቃልዎን እንደገና ያስገቡ",
    notifyTitle: "ማሳወቂያ ይፍቀዱ",
    notifyDesc: "(ማንኛውም አዳዲስ ማስታወቂያ በኢሜይል ይደርስብኝ)",
    signUp: "ይመዝገቡ",
    haveAccount: "መለያ አለዎ?",
    signIn: "ይግቡ",
    alerts: {
      success: "መለያ ተፈጥሯል! በቅርቡ ተመለስ...",
      error: "እባክዎ ስህተቶቹን ያስተካክሉ እና እንደገና ይሞክሩ።",
    },
    errors: {
      nameRequired: "ስም አስፈላጊ ነው",
      emailRequired: "ኢሜይል አስፈላጊ ነው",
      emailInvalid: "እባክዎ ትክክለኛ ኢሜይል ያስገቡ ለምሳሌ example@gmail.com",
      phoneRequired: "ስልክ ቁጥር አስፈላጊ ነው",
      phoneInvalid: "በ 09 ወይም 07 የሚጀምር ትክክለኛ 10 አሃዝ ስልክ ቁጥር ያስገቡ",
      passwordRequired: "የይለፍ ቃል አስፈላጊ ነው",
      passwordWeak: "ቢያንስ 8 ቁምፊ ከአማካይ፣ ከታችኛው፣ ቁጥር እና ምልክት ጋር",
      confirmRequired: "የይለፍ ቃልዎን እባክዎ ያረጋግጡ",
      confirmMismatch: "የይለፍ ቃሎች አይዛመዱም",
    },
  },
};

export default function SignUp({ lang = "En" }) {
  const t = translations[lang];
  const navigate = useNavigate();
  const { register } = useAuth();
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
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/i;
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const phoneRegex = /^(09|07)\d{8}$/;

  const validate = () => {
    const next = {};
    if (!fullName.trim()) next.fullName = t.errors.nameRequired;
    if (!email.trim()) next.email = t.errors.emailRequired;
    else if (!emailRegex.test(email)) next.email = t.errors.emailInvalid;
    if (!phone.trim()) next.phone = t.errors.phoneRequired;
    else if (!phoneRegex.test(phone)) next.phone = t.errors.phoneInvalid;
    if (!password) next.password = t.errors.passwordRequired;
    else if (!pwRegex.test(password)) next.password = t.errors.passwordWeak;
    if (!confirm) next.confirm = t.errors.confirmRequired;
    else if (confirm !== password) next.confirm = t.errors.confirmMismatch;
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

    const userData = {
      name: fullName,
      email,
      phone,
      password,
      emailNotifications: notify
    };

    const result = await register(userData);
    
    if (result.success) {
      setAlert({ type: "success", message: t.alerts.success });
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setAlert({ type: "error", message: result.error });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center shadow-lg">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                {t.fullNameLabel}
              </label>
              <input
                id="fullName"
                type="text"
                placeholder={t.fullNamePlaceholder}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.fullName ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="text-xs text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {t.phoneLabel}
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="phone"
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder={t.passwordPlaceholder}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                {t.confirmPasswordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="confirm"
                  type={showPw2 ? "text" : "password"}
                  placeholder={t.confirmPasswordPlaceholder}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.confirm ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPw2((v) => !v)}
                >
                  {showPw2 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirm && (
                <p className="text-xs text-red-600">{errors.confirm}</p>
              )}
            </div>

            {/* Notify toggle */}
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <span className="text-sm text-gray-700 font-medium">
                  {t.notifyTitle}
                </span>
                <span className="text-xs text-gray-500">
                  {t.notifyDesc}
                </span>
                {notify && (
                  <span className="text-xs text-blue-600 font-medium mt-1">
                    {lang === "En" ? "✓ Notifications enabled" : "✓ ማሳወቂያ ተነቅቷል"}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setNotify((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
            >
              {isLoading ? "Creating account..." : t.signUp}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {t.haveAccount}{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                {t.signIn}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}