import { useState, useEffect } from "react";
import { Search, FileText, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/StatsCard";
import userService from "../../services/userService";

const ResultManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [regularUsers, setRegularUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter users when search term changes
    useEffect(() => {
        if (searchTerm === "") {
            setFilteredUsers(regularUsers || []);
        } else {
            const filtered = (regularUsers || []).filter((user) => {
                const searchLower = searchTerm.toLowerCase();
                return (
                    user.name?.toLowerCase().includes(searchLower) ||
                    user.phone?.includes(searchTerm) ||
                    user.email?.toLowerCase().includes(searchLower)
                );
            });
            setFilteredUsers(filtered);
        }
    }, [searchTerm, regularUsers]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await userService.getUsers();
            console.log("API Response:", response); // Debug log
            
            // Handle different response structures
            let usersData = [];
            
            if (Array.isArray(response)) {
                usersData = response;
            } else if (response && Array.isArray(response.data)) {
                usersData = response.data;
            } else if (response && response.users) {
                usersData = response.users;
            } else if (response && response.result) {
                usersData = response.result;
            }
            
            setAllUsers(usersData);
            
            // Filter out admin and super_admin users, keep only regular users
            const regularUsersOnly = usersData.filter(user => 
                user.role === 'user' || !user.role // Include users with no role or 'user' role
            );
            
            setRegularUsers(regularUsersOnly);
            setFilteredUsers(regularUsersOnly);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to fetch users. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        {
            label: "Total Results",
            value: "1,284",
            color: "blue",
            icon: FileText,
        },
        {
            label: "Total Patients",
            value: (regularUsers?.length || 0).toString(),
            color: "green",
            icon: FileText,
        },
    ];

    const handleSendResult = (user) => {
        navigate("/admin/results/form", { state: { patient: user } });
    };

    if (loading) {
        return (
            <div className="flex-1 pt-14 md:pt-0 p-4 flex items-center justify-center">
                <div className="text-gray-500">Loading patients...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 pt-14 md:pt-0 p-4 flex items-center justify-center">
                <div className="text-red-500">{error}</div>
                <button 
                    onClick={fetchUsers}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 pt-14 md:pt-0">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-4 md:px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            Result Management
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">
                            Upload and send results to patients
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} {...stat} icon={stat.icon} />
                    ))}
                </div>

                {/* Search */}
                <div className="bg-white rounded-lg shadow-sm mb-6 p-4 md:p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patients by name, phone, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm md:text-base"
                        />
                    </div>
                </div>

                {/* Patients */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 md:p-6 border-b border-gray-200">
                        <h2 className="text-base md:text-lg font-semibold text-gray-900">
                            Patients ({filteredUsers.length})
                        </h2>
                        <p className="text-xs md:text-sm text-gray-600">
                            Click "Send Result" to upload and send results
                        </p>
                    </div>

                    {/* Table (desktop) */}
                    {filteredUsers.length > 0 ? (
                        <>
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Patient
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Contact
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredUsers.map((user) => (
                                            <tr
                                                key={user._id || user.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-blue-600 font-semibold">
                                                            {user.name?.charAt(0) || user.email?.charAt(0) || "P"}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.name || "No Name"}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Patient
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {user.phone || "No phone"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => handleSendResult(user)}
                                                        className="inline-flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-white bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        <Send className="h-3 w-3 mr-1" />
                                                        Send Result
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Cards (mobile) */}
                            <div className="md:hidden p-4 space-y-4">
                                {filteredUsers.map((user) => (
                                    <div
                                        key={user._id || user.id}
                                        className="border rounded-lg p-4 shadow-sm bg-white"
                                    >
                                        <div className="flex items-center mb-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">
                                                    {user.name?.charAt(0) || user.email?.charAt(0) || "P"}
                                                </span>
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {user.name || "No Name"}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.email}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Role: Patient
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-sm">
                                            <span className="font-medium">Phone:</span>{" "}
                                            {user.phone || "No phone"}
                                        </p>

                                        <button
                                            onClick={() => handleSendResult(user)}
                                            className="mt-3 w-full flex items-center justify-center px-3 py-2 rounded-md text-sm transition-colors duration-200 text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Send className="h-3 w-3 mr-1" />
                                            Send Result
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No patients found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultManagement;