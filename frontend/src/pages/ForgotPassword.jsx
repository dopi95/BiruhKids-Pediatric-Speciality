import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword({ lang = "En" }) {
  const navigate = useNavigate();

  const t = {
    En: {
      title: "Forgot your password?",
      desc: "Enter your email address and we'll send you a 6-digit verification code to reset your password.",
      email: "Email Address:",
      placeholder: "Enter your email address",
      button: "Send Verification Code",
      back: "Back to Sign In",
    },
    Am: {
      title: "ፓስዎርድዎን ረሱአት?",
      desc: "ኢሜል አድራሻዎን ያስገቡ፣ የይለፍ ቃልዎን ለማደስ 6-አሃዝ የማረጋገጫ ኮድ እንልክልዎታለን።",
      email: "የኢሜል አድራሻ:",
      placeholder: "ኢሜል አድራሻዎን ያስገቡ",
      button: "የማረጋገጫ ኮድ ይላኩ",
      back: "ወደ መግቢያ ተመለስ",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verify", { state: { lang } }); // ✅ Pass lang state
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-4">
            <Mail className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {t[lang].title}
        </h2>
        <p className="text-center text-gray-600">{t[lang].desc}</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t[lang].email}
            </label>
            <div className="mt-3 flex items-center rounded-lg border px-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder={t[lang].placeholder}
                className="ml-2 w-full border-none p-2 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {t[lang].button}
          </button>
        </form>

        {/* Back to Sign In */}
        <div className="text-center">
          <button
            onClick={() => navigate("/login", { state: { lang } })}
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <span className="mr-1">←</span> {t[lang].back}
          </button>
        </div>
      </div>
    </div>
  );
}
