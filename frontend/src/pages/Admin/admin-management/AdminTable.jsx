import React from "react";
import { UserCog, Shield, Eye, Edit, Trash2 } from "lucide-react";

export default function AdminTable({ admins, onDelete }) {
    return (
        <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    <span className="text-2xl">👤 </span>
                    Administrator Accounts ({admins.length})
                </h2>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-[600px] w-full text-sm sm:text-base">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Admin
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Permissions
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Last Login
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map((admin) => (
                            <tr key={admin.id} className="hover:bg-gray-50">
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                        </div>
                                        <div className="ml-3 sm:ml-4 truncate">
                                            <div className="text-sm sm:text-base font-medium text-gray-900 truncate">
                                                {admin.name}
                                            </div>
                                            <div className="text-sm sm:text-base text-gray-500 truncate">
                                                {admin.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-600" />
                                        <span
                                            className={`px-2 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                                                admin.role === "Super Admin"
                                                    ? "bg-purple-100 text-purple-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {admin.role}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-4 sm:px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {admin.permissions
                                            .slice(0, 2)
                                            .map((p, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full truncate"
                                                >
                                                    {p}
                                                </span>
                                            ))}
                                        {admin.permissions.length > 2 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
                                                +{admin.permissions.length - 2}{" "}
                                                more
                                            </span>
                                        )}
                                    </div>
                                </td>

                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                                            admin.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {admin.status}
                                    </span>
                                </td>

                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-500">
                                    {admin.lastLogin}
                                </td>

                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 p-1 sm:p-2">
                                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                    <button className="text-green-600 hover:text-green-900 p-1 sm:p-2">
                                        <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                    {admin.role !== "Super Admin" && (
                                        <button
                                            onClick={() => onDelete(admin.id)}
                                            className="text-red-600 hover:text-red-900 p-1 sm:p-2"
                                        >
                                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
