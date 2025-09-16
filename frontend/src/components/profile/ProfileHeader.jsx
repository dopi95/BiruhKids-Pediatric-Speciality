import React from "react";
import { Link } from "react-router-dom";
import { User, Key, Edit, Save, X } from "lucide-react";

export const ProfileHeader = ({
    isEditing,
    onEdit,
    onCancel,
    onSave,
    role,
    submitting = false,
}) => {
    return (
        <div className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Profile Settings
                            </h1>
                            <p className="text-gray-600">
                                Manage your account information and preferences
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                        <Link
                            to={
                                role === "admin"
                                    ? "/admin/change-password"
                                    : "/change-password"
                            }
                            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                            <Key className="h-4 w-4 mr-2" />
                            Change Password
                        </Link>

                        {!isEditing ? (
                            <button
                                onClick={onEdit}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                <button
                                    onClick={onCancel}
                                    disabled={submitting}
                                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </button>
                                <button
                                    onClick={onSave}
                                    disabled={submitting}
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {submitting ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
