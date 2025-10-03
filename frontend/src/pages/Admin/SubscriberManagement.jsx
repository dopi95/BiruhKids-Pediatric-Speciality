import { useState, useEffect } from "react";
import { Mail, Send, Search, Filter, Calendar, Trash2, RefreshCw } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import ConfirmationModal from "../../components/ConfirmationModal";
import { toast } from "react-toastify";
import apiService from "../../services/api";

const SubscriberManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubscribers, setSelectedSubscribers] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [stats, setStats] = useState([
        { label: "Total Subscribers", value: "0", color: "blue" },
        { label: "Active Subscribers", value: "0", color: "green" },
        { label: "Unsubscribed", value: "0", color: "red" },
    ]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterSource, setFilterSource] = useState("all");

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, subscriber: null, isBulk: false });

    useEffect(() => {
        fetchSubscribers();
        fetchStats();
        
        // Poll for updates every 30 seconds
        const interval = setInterval(() => {
            fetchSubscribers(false);
            fetchStats();
            setLastUpdate(Date.now());
        }, 30000);
        
        return () => clearInterval(interval);
    }, []);

    const fetchSubscribers = async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true);
            const data = await apiService.request('/subscribers');
            
            if (data.success) {
                setSubscribers(data.data.subscribers);
            } else {
                toast.error("Failed to fetch subscribers");
            }
        } catch (error) {
            console.error("Error fetching subscribers:", error);
            toast.error("Network error. Please try again.");
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await apiService.request('/subscribers/stats');
            
            if (data.success) {
                setStats([
                    { 
                        label: "Total Subscribers", 
                        value: data.data.total.toString(), 
                        color: "blue" 
                    },
                    { 
                        label: "Active Subscribers", 
                        value: data.data.active.toString(), 
                        color: "green" 
                    },
                    { 
                        label: "Unsubscribed", 
                        value: data.data.unsubscribed.toString(), 
                        color: "red" 
                    },
                ]);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };



    const filteredSubscribers = subscribers.filter((subscriber) => {
        const matchesSearch = subscriber.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        
        const matchesStatus = filterStatus === "all" || 
                             (filterStatus === "active" && subscriber.status === "active") ||
                             (filterStatus === "unsubscribed" && subscriber.status === "unsubscribed");
        
        const matchesSource = filterSource === "all" ||
                             (filterSource === "newsletter" && subscriber.source === "newsletter") ||
                             (filterSource === "signup" && subscriber.source === "signup");
        
        return matchesSearch && matchesStatus && matchesSource;
    });

    const handleSelectAll = () => {
        if (selectedSubscribers.length === filteredSubscribers.length) {
            setSelectedSubscribers([]);
        } else {
            setSelectedSubscribers(filteredSubscribers.map((sub) => sub._id));
        }
    };

    const handleSelectSubscriber = (subscriberId) => {
        setSelectedSubscribers((prev) =>
            prev.includes(subscriberId)
                ? prev.filter((id) => id !== subscriberId)
                : [...prev, subscriberId]
        );
    };



    const handleDeleteSubscriber = async () => {
        try {
            const data = await apiService.request(`/subscribers/${deleteModal.subscriber._id}`, {
                method: "DELETE",
            });

            if (data.success) {
                toast.success("Subscriber deleted successfully");
                setSubscribers(subscribers.filter(sub => sub._id !== deleteModal.subscriber._id));
                setSelectedSubscribers(selectedSubscribers.filter(id => id !== deleteModal.subscriber._id));
                fetchStats();
            } else {
                toast.error(data.message || "Failed to delete subscriber");
            }
        } catch (error) {
            console.error("Error deleting subscriber:", error);
            toast.error("Network error. Please try again.");
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedSubscribers.length === 0) {
            toast.warning("Please select at least one subscriber to delete");
            return;
        }
        
        setDeleteModal({ isOpen: true, subscriber: null, isBulk: true });
    };

    const handleBulkDelete = async () => {
        try {
            const data = await apiService.request('/subscribers/bulk-delete', {
                method: "DELETE",
                body: JSON.stringify({ subscriberIds: selectedSubscribers }),
            });

            if (data.success) {
                toast.success(`${selectedSubscribers.length} subscribers deleted successfully`);
                setSubscribers(subscribers.filter(sub => !selectedSubscribers.includes(sub._id)));
                setSelectedSubscribers([]);
                fetchStats();
            } else {
                toast.info("Bulk delete not supported, deleting individually...");
                
                let successCount = 0;
                for (const id of selectedSubscribers) {
                    try {
                        const individualData = await apiService.request(`/subscribers/${id}`, {
                            method: "DELETE",
                        });
                        
                        if (individualData.success) {
                            successCount++;
                        }
                    } catch (error) {
                        console.error(`Error deleting subscriber ${id}:`, error);
                    }
                }
                
                toast.success(`${successCount} of ${selectedSubscribers.length} subscribers deleted successfully`);
                
                fetchSubscribers();
                fetchStats();
                setSelectedSubscribers([]);
            }
        } catch (error) {
            console.error("Error deleting subscribers:", error);
            toast.error("Network error. Please try again.");
        }
    };

    if (loading) {
        return <div className="flex-1 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="bg-white border-b shadow-sm mt-14 xl:mt-0">
                <div className="px-6 py-4 flex flex-col gap-4 sm:flex-row items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            Subscriber Management
                        </h1>
                        <p className="text-gray-600 text:sm sm:text-base">
                            Manage newsletter subscribers and email campaigns
                        </p>
                    </div>


                </div>
            </div>

            <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} {...stat} icon={Mail} />
                    ))}
                </div>



                {/* Search and Filters */}
                <div className="mb-6 bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search by email..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <Filter className="w-4 h-4 text-gray-600" />
                                <select 
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active Only</option>
                                    <option value="unsubscribed">
                                        Unsubscribed
                                    </option>
                                </select>
                                <select 
                                    value={filterSource}
                                    onChange={(e) => setFilterSource(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="all">All Sources</option>
                                    <option value="newsletter">Newsletter</option>
                                    <option value="signup">User Signup</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subscribers Table */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Subscribers ({filteredSubscribers.length})
                                </h2>
                                <span className="text-xs text-gray-500">
                                    Auto-updates every 30s
                                </span>
                            </div>
                            <div className="text-sm text-gray-600">
                                {selectedSubscribers.length > 0 && (
                                    <span>
                                        {selectedSubscribers.length} selected
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Source
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Subscribed
                                    </th>
                                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSubscribers.length > 0 ? (
                                    filteredSubscribers.map((subscriber) => (
                                        <tr
                                            key={subscriber._id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-100 rounded-full">
                                                        <Mail className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {subscriber.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        subscriber.source === 'newsletter'
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-purple-100 text-purple-800"
                                                    }`}
                                                >
                                                    {subscriber.source === 'newsletter' ? 'Newsletter' : 'User Signup'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        subscriber.status ===
                                                        "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {subscriber.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => setDeleteModal({ isOpen: true, subscriber, isBulk: false })}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                                    title="Delete subscriber"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                            No subscribers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, subscriber: null, isBulk: false })}
                onConfirm={deleteModal.isBulk ? handleBulkDelete : handleDeleteSubscriber}
                title={deleteModal.isBulk ? "Delete Subscribers" : "Delete Subscriber"}
                message={deleteModal.isBulk 
                    ? `Are you sure you want to delete ${selectedSubscribers.length} subscribers?`
                    : "Are you sure you want to delete this subscriber:"
                }
                confirmText={deleteModal.isBulk ? "Delete All" : "Delete"}
                requireTextConfirmation={!deleteModal.isBulk}
                confirmationText={deleteModal.subscriber?.email || ""}
            />
        </div>
    );
};

export default SubscriberManagement;