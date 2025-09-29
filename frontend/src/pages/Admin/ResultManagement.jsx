import { useState, useEffect } from "react";
import { Search, FileText, Send, History, X, Trash2, Calendar, Eye } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import StatsCard from "../../components/StatsCard";
import ConfirmationModal from "../../components/ConfirmationModal";
import userService from "../../services/userService";
import resultService from "../../services/resultService";
import { toast } from "react-toastify";

const ResultManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [regularUsers, setRegularUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({ totalResults: 0, totalUsers: 0 });
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientResults, setPatientResults] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, result: null });
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch users and stats on component mount and when page is focused
    useEffect(() => {
        fetchUsers();
        fetchStats();
        
        // Add event listener for page focus to refresh data
        const handleFocus = () => {
            fetchUsers();
            fetchStats();
        };
        
        window.addEventListener('focus', handleFocus);
        
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);
    
    // Refresh data when navigating to this page
    useEffect(() => {
        if (location.pathname === '/admin/results') {
            fetchUsers();
            fetchStats();
        }
    }, [location.pathname]);

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

    const fetchUsers = async (retryCount = 0) => {
        try {
            setLoading(true);
            setError(null);
            
            // Add timeout to prevent hanging requests
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout')), 10000)
            );
            
            const response = await Promise.race([
                userService.getPatients(), // Use getPatients instead of getUsers
                timeoutPromise
            ]);
            
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
            
            // Since getPatients already returns only regular users, no need to filter
            setRegularUsers(usersData);
            setFilteredUsers(usersData);
        } catch (err) {
            console.error("Error fetching patients:", err);
            
            // Retry once if first attempt fails
            if (retryCount === 0) {
                setTimeout(() => fetchUsers(1), 1000);
                return;
            }
            
            setError("Failed to fetch patients. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await resultService.getResultStats();
            setStats(response.stats);
        } catch (err) {
            console.error("Error fetching stats:", err);
        }
    };

    const statsCards = [
        {
            label: "Total Results Submitted",
            value: stats.totalResults.toString(),
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

    const handleViewHistory = async (user) => {
        setSelectedPatient(user);
        setShowHistoryModal(true);
        setHistoryLoading(true);
        try {
            const response = await resultService.getPatientResultsByEmail(user.email);
            setPatientResults(response.results || []);
        } catch (err) {
            console.error("Error fetching patient results:", err);
            setPatientResults([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleDeleteResult = async (result) => {
        setDeleteModal({ isOpen: true, result });
    };

    const confirmDeleteResult = async () => {
        try {
            await resultService.deleteResult(deleteModal.result._id);
            // Refresh the results after deletion
            handleViewHistory(selectedPatient);
            // Refresh stats
            fetchStats();
            toast.success("Result deleted successfully!");
        } catch (err) {
            console.error("Error deleting result:", err);
            const errorMessage = 'Failed to delete result. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="flex-1 pt-14 xl:pt-0 p-4 flex items-center justify-center">
                <div className="text-gray-500">Loading patients...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 pt-14 xl:pt-0 p-4 flex items-center justify-center">
                <div className="text-red-500">{error}</div>
                <div className="ml-4 space-x-2">
                    <button 
                        onClick={() => fetchUsers()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 pt-14 xl:pt-0">
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
                    <button
                        onClick={() => {
                            fetchUsers();
                            fetchStats();
                        }}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                    {statsCards.map((stat, i) => (
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
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleSendResult(user)}
                                                            className="inline-flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-white bg-blue-600 hover:bg-blue-700"
                                                        >
                                                            <Send className="h-3 w-3 mr-1" />
                                                            Send Result
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewHistory(user)}
                                                            className="inline-flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-gray-700 bg-gray-100 hover:bg-gray-200"
                                                        >
                                                            <History className="h-3 w-3 mr-1" />
                                                            History
                                                        </button>
                                                    </div>
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

                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => handleSendResult(user)}
                                                className="flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm transition-colors duration-200 text-white bg-blue-600 hover:bg-blue-700"
                                            >
                                                <Send className="h-3 w-3 mr-1" />
                                                Send Result
                                            </button>
                                            <button
                                                onClick={() => handleViewHistory(user)}
                                                className="flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm transition-colors duration-200 text-gray-700 bg-gray-100 hover:bg-gray-200"
                                            >
                                                <History className="h-3 w-3 mr-1" />
                                                History
                                            </button>
                                        </div>
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

            {/* History Modal */}
            {showHistoryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Results History - {selectedPatient?.name || selectedPatient?.email}
                            </h2>
                            <button
                                onClick={() => setShowHistoryModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                            {historyLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="text-gray-500">Loading results...</div>
                                </div>
                            ) : patientResults.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No results found for this patient
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {patientResults.map((result) => (
                                        <div key={result._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">
                                                        {formatDate(result.testDate)}
                                                    </span>
                                                    <span className="text-sm text-gray-500">by {result.doctorName}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteResult(result)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                    title="Delete result"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <h4 className="font-medium text-gray-900">Files:</h4>
                                                {result.resultFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                        <div className="flex items-center space-x-2">
                                                            <FileText className="h-4 w-4 text-blue-600" />
                                                            <span className="text-sm text-gray-700">{file.originalName}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                                                                const publicId = file.cloudinaryPublicId || file.filename;
                                                                const fileUrl = `${baseUrl}/results/file/${encodeURIComponent(publicId)}?token=${localStorage.getItem('token')}`;
                                                                window.open(fileUrl, '_blank');
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800 p-1"
                                                            title="View file"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {result.additionalNotes && (
                                                <div className="mt-3">
                                                    <h4 className="font-medium text-gray-900 mb-1">Notes:</h4>
                                                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                                        {result.additionalNotes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, result: null })}
                onConfirm={confirmDeleteResult}
                title="Delete Result"
                message={`Are you sure you want to delete this result:`}
                confirmText="Delete"
                requireTextConfirmation={true}
                confirmationText={deleteModal.result ? `${deleteModal.result.doctorName} - ${new Date(deleteModal.result.testDate).toLocaleDateString()}` : ""}
                isLoading={false}
            />
        </div>
    );
};

export default ResultManagement;