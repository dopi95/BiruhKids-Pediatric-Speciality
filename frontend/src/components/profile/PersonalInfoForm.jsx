import React from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

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
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
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
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
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
                        Gender
                    </label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing
                                ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                : "bg-gray-50"
                        } transition-colors duration-200`}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                    </label>
                    <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
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
                        Occupation
                    </label>
                    <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing
                                ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                : "bg-gray-50"
                        } transition-colors duration-200`}
                    />
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
        </div>
    );
};
