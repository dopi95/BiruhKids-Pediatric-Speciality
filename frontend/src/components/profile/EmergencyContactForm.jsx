import React from "react";

export const EmergencyContactForm = ({ formData, isEditing, handleChange }) => {
    return (
        <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Name
                    </label>
                    <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
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
                        Emergency Contact Phone
                    </label>
                    <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                            isEditing
                                ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                : "bg-gray-50"
                        } transition-colors duration-200`}
                    />
                </div>
            </div>
        </div>
    );
};
