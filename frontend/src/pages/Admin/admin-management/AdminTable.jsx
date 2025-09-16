import React from "react";
import { UserCog, Shield, Edit, Trash2 } from "lucide-react";

export default function AdminTable({ admins, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    <span className="text-2xl">👤 </span>
                    Administrator Accounts ({admins.length})
                </h2>
            </div>

            {/* Table Wrapper */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-[600px] w-full text-sm sm:text-base">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Admin
                            </th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Permissions
                            </th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Last Login
                            </th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map((admin) => (
                            <tr key={admin._id || admin.id} className="hover:bg-gray-50">
                                {/* Admin Info */}
                                <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-2 sm:ml-3 truncate">
                                            <div className="text-sm sm:text-base font-medium text-gray-900 truncate">
                                                {admin.name}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-500 truncate">
                                                {admin.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-purple-600" />
                                        <span
                                            className={`px-2 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                                                admin.role === "super_admin"
                                                    ? "bg-purple-100 text-purple-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                                        </span>
                                    </div>
                                </td>

                                {/* Permissions */}
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {admin.role === 'super_admin' ? (
                                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs sm:text-sm rounded-full">
                                                All Permissions
                                            </span>
                                        ) : (
                                            Object.entries(admin.permissions || {})
                                                .filter(([key, value]) => value)
                                                .slice(0, 2)
                                                .map(([key], i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full truncate"
                                                    >
                                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                    </span>
                                                ))
                                        )}
                                        {admin.role !== 'super_admin' && Object.values(admin.permissions || {}).filter(Boolean).length > 2 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
                                                +{Object.values(admin.permissions || {}).filter(Boolean).length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs sm:text-sm font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>

                                {/* Last Login */}
                                <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                    {admin.updatedAt ? new Date(admin.updatedAt).toLocaleDateString() : 'N/A'}
                                </td>

                                {/* Actions */}
                                <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium flex space-x-2">
                                    <button 
                                        onClick={() => onEdit(admin)}
                                        className="text-green-600 hover:text-green-900 p-1 sm:p-2"
                                        title="Edit admin"
                                    >
                                        <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(admin)}
                                        className="text-red-600 hover:text-red-900 p-1 sm:p-2"
                                        title="Delete admin"
                                    >
                                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
