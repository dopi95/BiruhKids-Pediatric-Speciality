import React from "react";
import { Link } from "react-router-dom";

export const AccountActions = ({ showDelete, role }) => {
    return (
        <div className="mt-8 bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                    Account Actions
                </h2>
                <div className="space-y-4">
                    <Link
                        to={
                            role === "admin"
                                ? "/admin/change-password"
                                : "/change-password"
                        }
                        className="block w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                    >
                        Change Password
                    </Link>

                    {showDelete && (
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                                Danger Zone
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Once you delete your account, there is no going
                                back. Please be certain.
                            </p>
                            <button
                                type="button"
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                            >
                                Delete Account
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
