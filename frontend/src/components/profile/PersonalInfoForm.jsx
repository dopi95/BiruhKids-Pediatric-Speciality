import React from "react";
import { Mail, Phone } from "lucide-react";

export const PersonalInfoForm = ({
    formData,
    isEditing,
    handleChange,
    role,
}) => {
    return (
        <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing
                                ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                : "bg-gray-50"
                        } transition-colors duration-200`}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                                isEditing
                                    ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    : "bg-gray-50"
                            } transition-colors duration-200`}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                                isEditing
                                    ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    : "bg-gray-50"
                            } transition-colors duration-200`}
                        />
                    </div>
                </div>



                {role && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <input
                            type="text"
                            name="role"
                            value={role}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                        />
                    </div>
                )}
            </div>

            {/* Email Notifications Toggle */}
            <div className="mt-6">
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium">
                            Email Notifications
                        </span>
                        <span className="text-xs text-gray-500">
                            Receive updates and notifications via email
                        </span>
                        {formData.emailNotifications && (
                            <span className="text-xs text-blue-600 font-medium mt-1">
                                ✓ Notifications enabled
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        disabled={!isEditing}
                        onClick={() => handleChange({
                            target: {
                                name: 'emailNotifications',
                                type: 'checkbox',
                                checked: !formData.emailNotifications
                            }
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            formData.emailNotifications ? "bg-blue-600" : "bg-gray-300"
                        } ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                formData.emailNotifications ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
