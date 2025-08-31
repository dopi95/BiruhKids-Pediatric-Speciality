import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, CheckCircle, ArrowLeft } from "lucide-react";

const ChangePassword = ({ backPath }) => {
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

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long");
        }
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push("Password must contain at least one lowercase letter");
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push("Password must contain at least one uppercase letter");
        }
        if (!/(?=.*\d)/.test(password)) {
            errors.push("Password must contain at least one number");
        }
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            errors.push(
                "Password must contain at least one special character (!@#$%^&*)"
            );
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const validationErrors = [];

        if (!formData.currentPassword) {
            validationErrors.push("Current password is required");
        }

        const passwordErrors = validatePassword(formData.newPassword);
        validationErrors.push(...passwordErrors);

        if (formData.newPassword !== formData.confirmPassword) {
            validationErrors.push("New passwords do not match");
        }

        if (formData.currentPassword === formData.newPassword) {
            validationErrors.push(
                "New password must be different from current password"
            );
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors([]);

        // Placeholder for password change logic
        console.log("Password change:", formData);
        setIsSubmitted(true);

        // Redirect back to profile after 3 seconds
        setTimeout(() => {
            navigate("/profile");
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        // Clear errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords({
            ...showPasswords,
            [field]: !showPasswords[field],
        });
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            Password Changed!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Your password has been successfully updated. You
                            will be redirected to your profile in a few seconds.
                        </p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6 text-center">
                        <p className="text-sm text-gray-600 mb-4">
                            Redirecting you to your profile...
                        </p>
                        <Link
                            to={backPath}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
                        >
                            Go to Profile Now
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
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
                                Change Password
                            </h1>
                            <p className="text-gray-600">
                                Update your account password
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Error Messages */}
                {errors.length > 0 && (
                    <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-red-800 mb-2">
                            Please fix the following errors:
                        </h3>
                        <ul className="text-sm text-red-700 space-y-1">
                            {errors.map((error, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-red-500 mr-2">•</span>
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 sm:p-6 space-y-6"
                    >
                        {/* Current Password */}
                        <div>
                            <label
                                htmlFor="currentPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Current Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={
                                        showPasswords.current
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                                    placeholder="Enter your current password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        togglePasswordVisibility("current")
                                    }
                                >
                                    {showPasswords.current ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={
                                        showPasswords.new ? "text" : "password"
                                    }
                                    required
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                                    placeholder="Enter your new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        togglePasswordVisibility("new")
                                    }
                                >
                                    {showPasswords.new ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showPasswords.confirm
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                                    placeholder="Confirm your new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        togglePasswordVisibility("confirm")
                                    }
                                >
                                    {showPasswords.confirm ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                                Password Requirements:
                            </h3>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li className="flex items-center">
                                    <CheckCircle
                                        className={`h-3 w-3 mr-2 ${
                                            formData.newPassword.length >= 8
                                                ? "text-green-500"
                                                : "text-gray-300"
                                        }`}
                                    />
                                    At least 8 characters long
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle
                                        className={`h-3 w-3 mr-2 ${
                                            /(?=.*[a-z])/.test(
                                                formData.newPassword
                                            )
                                                ? "text-green-500"
                                                : "text-gray-300"
                                        }`}
                                    />
                                    One lowercase letter
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle
                                        className={`h-3 w-3 mr-2 ${
                                            /(?=.*[A-Z])/.test(
                                                formData.newPassword
                                            )
                                                ? "text-green-500"
                                                : "text-gray-300"
                                        }`}
                                    />
                                    One uppercase letter
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle
                                        className={`h-3 w-3 mr-2 ${
                                            /(?=.*\d)/.test(
                                                formData.newPassword
                                            )
                                                ? "text-green-500"
                                                : "text-gray-300"
                                        }`}
                                    />
                                    One number
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle
                                        className={`h-3 w-3 mr-2 ${
                                            /(?=.*[!@#$%^&*])/.test(
                                                formData.newPassword
                                            )
                                                ? "text-green-500"
                                                : "text-gray-300"
                                        }`}
                                    />
                                    One special character (!@#$%^&*)
                                </li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                            <Link
                                to={backPath}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-center"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>

                    {/* Security Tips */}
                    <div className="border-t border-gray-200 p-4 sm:p-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">
                            Security Tips:
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>
                                • Use a unique password that you don't use
                                elsewhere
                            </li>
                            <li>
                                • Avoid using personal information in your
                                password
                            </li>
                            <li>• Consider using a password manager</li>
                            <li>
                                • Enable two-factor authentication for extra
                                security
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
