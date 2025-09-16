import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function DeleteAdminModal({ admin, onClose, onConfirm }) {
    const [confirmName, setConfirmName] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmName.trim() !== admin.name.trim()) {
            return;
        }
        
        setIsDeleting(true);
        await onConfirm(admin._id);
        setIsDeleting(false);
        onClose();
    };

    const isNameMatch = confirmName.trim() === admin.name.trim();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Delete Admin
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <p className="text-gray-700 mb-2">
                            Are you sure you want to delete the admin:
                        </p>
                        <p className="font-semibold text-gray-900 bg-gray-100 p-2 rounded">
                            {admin.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type the admin's name to confirm:
                        </label>
                        <input
                            type="text"
                            value={confirmName}
                            onChange={(e) => setConfirmName(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                                confirmName && !isNameMatch 
                                    ? "border-red-300 bg-red-50" 
                                    : "border-gray-300"
                            }`}
                            placeholder={`Enter "${admin.name}" to confirm`}
                            autoComplete="off"
                        />
                        {confirmName && !isNameMatch && (
                            <p className="text-red-600 text-sm mt-1">
                                Name doesn't match. Please type exactly: {admin.name}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isNameMatch || isDeleting}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDeleting ? "Deleting..." : "Delete Admin"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}