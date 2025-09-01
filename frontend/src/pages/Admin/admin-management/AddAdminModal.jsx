import React from "react";

export default function AddAdminModal({
    formData,
    onClose,
    onSubmit,
    onChange,
    onPermissionChange,
}) {
    const permissionsList = [
        { key: "dashboard", label: "Dashboard" },
        { key: "userManagement", label: "User Management" },
        { key: "resultManagement", label: "Result Management" },
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
                        Add New Admin
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
                                Password *
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                placeholder="Enter password"
                            />
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
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
