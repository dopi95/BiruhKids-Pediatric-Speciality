import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, CheckCircle, ArrowLeft } from "lucide-react";

const ChangePassword = ({ backPath, lang = "En" }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const t = {
    En: {
      title: "Change Password",
      subtitle: "Update your account password",
      current: "Current Password",
      new: "New Password",
      confirm: "Confirm New Password",
      placeholderCurrent: "Enter your current password",
      placeholderNew: "Enter your new password",
      placeholderConfirm: "Confirm your new password",
      requirements: "Password Requirements:",
      req1: "At least 8 characters long",
      req2: "One lowercase letter",
      req3: "One uppercase letter",
      req4: "One number",
      req5: "One special character (!@#$%^&*)",
      cancel: "Cancel",
      submit: "Change Password",
      errorsTitle: "Please fix the following errors:",
      successTitle: "Password Changed!",
      successDesc:
        "Your password has been successfully updated. You will be redirected to your profile in a few seconds.",
      redirecting: "Redirecting you to your profile...",
      goNow: "Go to Profile Now",
      tips: "Security Tips:",
      tip1: "• Use a unique password that you don't use elsewhere",
      tip2: "• Avoid using personal information in your password",
      tip3: "• Consider using a password manager",
      tip4: "• Enable two-factor authentication for extra security",
      validations: {
        currentRequired: "Current password is required",
        length: "Password must be at least 8 characters long",
        lowercase: "Password must contain at least one lowercase letter",
        uppercase: "Password must contain at least one uppercase letter",
        number: "Password must contain at least one number",
        special:
          "Password must contain at least one special character (!@#$%^&*)",
        mismatch: "New passwords do not match",
        sameAsCurrent:
          "New password must be different from current password",
      },
    },
    Am: {
      title: "የይለፍ ቃል ቀይር",
      subtitle: "የመለያዎን የይለፍ ቃል ያዘምኑ",
      current: "የአሁኑ የይለፍ ቃል",
      new: "አዲስ የይለፍ ቃል",
      confirm: "አዲሱን የይለፍ ቃል ያረጋግጡ",
      placeholderCurrent: "የአሁኑን የይለፍ ቃል ያስገቡ",
      placeholderNew: "አዲስ የይለፍ ቃል ያስገቡ",
      placeholderConfirm: "አዲሱን የይለፍ ቃል ያረጋግጡ",
      requirements: "የይለፍ ቃል መስፈርቶች፦",
      req1: "ቢያንስ 8 ቁምፊ ርዝመት ይኖረው አለበት",
      req2: "ቢያንስ አንድ ትንሽ ፊደል ይኖረው አለበት",
      req3: "ቢያንስ አንድ ትልቅ ፊደል ይኖረው አለበት",
      req4: "ቢያንስ አንድ ቁጥር ይኖረው አለበት",
      req5: "ቢያንስ አንድ ልዩ ቁምፊ (!@#$%^&*) ይኖረው አለበት",
      cancel: "ይቅር",
      submit: "የይለፍ ቃል ቀይር",
      errorsTitle: "እባክዎ የሚከተሉትን ስህተቶች ያስተካክሉ፦",
      successTitle: "የይለፍ ቃል ተቀይሯል!",
      successDesc:
        "የይለፍ ቃልዎ በተሳካ ሁኔታ ተዘመነ። በጥቂት ሰከንዶች ውስጥ ወደ መገለጫዎ ትመራላችሁ።",
      redirecting: "ወደ መገለጫዎ በመሄድ ላይ...",
      goNow: "አሁን ወደ መገለጫ ይሂዱ",
      tips: "የደህንነት ምክሮች፦",
      tip1: "• በሌላ ቦታ ያልተጠቀሙበትን የተለየ የይለፍ ቃል ይጠቀሙ",
      tip2: "• የግል መረጃ በይለፍ ቃልዎ አትጠቀሙ",
      tip3: "• የይለፍ ቃል ማናጋሪ መጠቀም ይመረጣል",
      tip4: "• ተጨማሪ ደህንነት ለማግኘት ሁለት ደረጃ ማረጋገጫ ያንቁ",
      validations: {
        currentRequired: "የአሁኑ የይለፍ ቃል ያስፈልጋል",
        length: "የይለፍ ቃል ቢያንስ 8 ቁምፊ ርዝመት ሊኖረው ይኖርበታል",
        lowercase: "የይለፍ ቃል ቢያንስ አንድ ትንሽ ፊደል ይኖርበታል",
        uppercase: "የይለፍ ቃል ቢያንስ አንድ ትልቅ ፊደል ይኖርበታል",
        number: "የይለፍ ቃል ቢያንስ አንድ ቁጥር ይኖርበታል",
        special:
          "የይለፍ ቃል ቢያንስ አንድ ልዩ ቁምፊ (!@#$%^&*) ይኖርበታል",
        mismatch: "አዲሱ የይለፍ ቃል ከያረጋጉት አይዛመድም",
        sameAsCurrent:
          "አዲሱ የይለፍ ቃል ከአሁኑ የይለፍ ቃል በተለየ መሆን አለበት",
      },
    },
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push(t[lang].validations.length);
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push(t[lang].validations.lowercase);
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push(t[lang].validations.uppercase);
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push(t[lang].validations.number);
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push(t[lang].validations.special);
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = [];

    if (!formData.currentPassword) {
      validationErrors.push(t[lang].validations.currentRequired);
    }
    const passwordErrors = validatePassword(formData.newPassword);
    validationErrors.push(...passwordErrors);

    if (formData.newPassword !== formData.confirmPassword) {
      validationErrors.push(t[lang].validations.mismatch);
    }
    if (formData.currentPassword === formData.newPassword) {
      validationErrors.push(t[lang].validations.sameAsCurrent);
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/profile");
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors.length > 0) setErrors([]);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {t[lang].successTitle}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{t[lang].successDesc}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-4">{t[lang].redirecting}</p>
            <Link
              to={backPath}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
            >
              {t[lang].goNow}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20 sm:mt-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              to={backPath}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t[lang].title}
              </h1>
              <p className="text-gray-600">{t[lang].subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {errors.length > 0 && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              {t[lang].errorsTitle}
            </h3>
            <ul className="text-sm text-red-700 space-y-1">
              {errors.map((error, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t[lang].current}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  required
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={t[lang].placeholderCurrent}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t[lang].new}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={t[lang].placeholderNew}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t[lang].confirm}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={t[lang].placeholderConfirm}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                {t[lang].requirements}
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>{t[lang].req1}</li>
                <li>{t[lang].req2}</li>
                <li>{t[lang].req3}</li>
                <li>{t[lang].req4}</li>
                <li>{t[lang].req5}</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to={backPath}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-center"
              >
                {t[lang].cancel}
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t[lang].submit}
              </button>
            </div>
          </form>

          {/* Security Tips */}
          <div className="border-t border-gray-200 p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              {t[lang].tips}
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>{t[lang].tip1}</li>
              <li>{t[lang].tip2}</li>
              <li>{t[lang].tip3}</li>
              <li>{t[lang].tip4}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
