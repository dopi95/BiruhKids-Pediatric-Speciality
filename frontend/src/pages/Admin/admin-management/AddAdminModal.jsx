import React from "react";

export default function AddAdminModal({
    formData,
    onClose,
    onSubmit,
    onChange,
    onPermissionChange,
    isEditing = false,
    title,
    submitting = false,
}) {
    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return {
            minLength,
            hasUpper,
            hasLower,
            hasSymbol,
            isValid: minLength && hasUpper && hasLower && hasSymbol
        };
    };

    const passwordValidation = validatePassword(formData.password || '');
    const showValidation = !isEditing && formData.password;
    const permissionsList = [
        { key: "dashboard", label: "Dashboard" },
        { key: "userManagement", label: "User Management" },
        { key: "resultManagement", label: "Result Management" },
        { key: "doctorManagement", label: "Doctor Management" },
        { key: "serviceManagement", label: "Service Management" },
        { key: "appointmentManagement", label: "Appointment Management" },
        { key: "videoManagement", label: "Video Management" },
        { key: "testimonialManagement", label: "Testimonial Management" },
        { key: "subscriberManagement", label: "Subscriber Management" },
        { key: "adminManagement", label: "Admin Management" },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {title || (isEditing ? 'Edit Admin' : 'Add New Admin')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                placeholder="Enter full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                placeholder="Enter email address"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password {isEditing ? '(leave blank to keep current)' : '*'}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={onChange}
                                required={!isEditing}
                                className={`w-full px-4 py-3 border rounded-lg ${
                                    showValidation && !passwordValidation.isValid
                                        ? 'border-red-300 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-blue-500'
                                }`}
                                placeholder={isEditing ? "Enter new password (optional)" : "Enter password"}
                            />
                            {showValidation && (
                                <div className="mt-2 text-sm space-y-1">
                                    <div className={`flex items-center ${
                                        passwordValidation.minLength ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        <span className="mr-2">{passwordValidation.minLength ? '✓' : '✗'}</span>
                                        At least 8 characters
                                    </div>
                                    <div className={`flex items-center ${
                                        passwordValidation.hasUpper ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        <span className="mr-2">{passwordValidation.hasUpper ? '✓' : '✗'}</span>
                                        At least 1 uppercase letter
                                    </div>
                                    <div className={`flex items-center ${
                                        passwordValidation.hasLower ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        <span className="mr-2">{passwordValidation.hasLower ? '✓' : '✗'}</span>
                                        At least 1 lowercase letter
                                    </div>
                                    <div className={`flex items-center ${
                                        passwordValidation.hasSymbol ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        <span className="mr-2">{passwordValidation.hasSymbol ? '✓' : '✗'}</span>
                                        At least 1 symbol (!@#$%^&*)
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role *
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={onChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            >
                                <option value="admin">Admin</option>
                                <option value="super_admin">Super Admin</option>
                            </select>
                            {formData.role === 'super_admin' && (
                                <p className="text-sm text-blue-600 mt-1">
                                    Super Admin automatically has all permissions
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Permissions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Permissions
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {permissionsList.map((p) => (
                                <div key={p.key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={p.key}
                                        checked={formData.permissions[p.key]}
                                        onChange={() =>
                                            onPermissionChange(p.key)
                                        }
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={p.key}
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        {p.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || (!isEditing && formData.password && !passwordValidation.isValid)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Admin' : 'Add Admin')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
