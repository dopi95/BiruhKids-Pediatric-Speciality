import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function ConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = "Delete", 
    confirmButtonClass = "bg-red-600 hover:bg-red-700",
    requireTextConfirmation = false,
    confirmationText = "",
    isLoading = false
}) {
    const [inputValue, setInputValue] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (requireTextConfirmation && inputValue.trim() !== confirmationText.trim()) {
            return;
        }
        await onConfirm();
        setInputValue("");
        onClose();
    };

    const isValid = !requireTextConfirmation || inputValue.trim() === confirmationText.trim();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {title}
                        </h2>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <p className="text-gray-700 mb-2">
                            {message}
                        </p>
                        {requireTextConfirmation && (
                            <p className="font-semibold text-gray-900 bg-gray-100 p-2 rounded">
                                {confirmationText}
                            </p>
                        )}
                        <p className="text-sm text-gray-600 mt-2">
                            This action cannot be undone.
                        </p>
                    </div>

                    {requireTextConfirmation && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type the {title.toLowerCase().includes('admin') ? "admin's name" : "email"} to confirm:
                            </label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
                                    inputValue && !isValid 
                                        ? "border-red-300 bg-red-50" 
                                        : "border-gray-300"
                                }`}
                                placeholder={`Enter "${confirmationText}" to confirm`}
                                autoComplete="off"
                            />
                            {inputValue && !isValid && (
                                <p className="text-red-600 text-sm mt-1">
                                    {title.toLowerCase().includes('admin') ? 'Name' : 'Email'} doesn't match. Please type exactly: {confirmationText}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid || isLoading}
                            className={`px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${confirmButtonClass}`}
                        >
                            {isLoading ? "Processing..." : confirmText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}