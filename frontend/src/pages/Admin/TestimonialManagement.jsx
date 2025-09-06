import { useState, useEffect } from "react";
import { MessageSquare, Filter, Check, X, Trash2, Star, Users } from "lucide-react";
import StatsCard from "../../components/Testimonistatscard";

const TestimonialManagement = () => {
    const [filterStatus, setFilterStatus] = useState("all");
    const [testimonials, setTestimonials] = useState([]);
    const [stats, setStats] = useState([
        { label: "Total Testimonials", value: "0", color: "blue" },
        { label: "Approved", value: "0", color: "green" },
        { label: "Pending Review", value: "0", color: "orange" },
        { label: "Rejected", value: "0", color: "red" },
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch testimonials and stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch testimonials
                const testimonialsResponse = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/testimonials?status=${filterStatus === "all" ? "" : filterStatus}`
                );
                
                if (!testimonialsResponse.ok) {
                    throw new Error("Failed to fetch testimonials");
                }
                
                const testimonialsData = await testimonialsResponse.json();
                
                if (testimonialsData.success) {
                    setTestimonials(testimonialsData.data);
                } else {
                    throw new Error(testimonialsData.message || "Failed to fetch testimonials");
                }
                
                // Fetch stats
                const statsResponse = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/testimonials/stats`
                );
                
                if (!statsResponse.ok) {
                    throw new Error("Failed to fetch stats");
                }
                
                const statsData = await statsResponse.json();
                
                if (statsData.success) {
                    setStats([
                        { label: "Total Testimonials", value: statsData.data.total.toString(), color: "blue", icon: MessageSquare },
                        { label: "Approved", value: statsData.data.approved.toString(), color: "green", icon: MessageSquare },
                        { label: "Pending Review", value: statsData.data.pending.toString(), color: "orange", icon: MessageSquare },
                        { label: "Rejected", value: statsData.data.rejected.toString(), color: "red", icon: MessageSquare },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [filterStatus]);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/testimonials/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "approved" }),
                }
            );
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to approve testimonial");
            }
            
            // Update the local state
            setTestimonials(prev => 
                prev.map(item => 
                    item._id === id 
                        ? { ...item, status: "approved", reviewedAt: new Date().toISOString() }
                        : item
                )
            );
            
            // Refresh stats
            const statsResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/testimonials/stats`
            );
            
            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                
                if (statsData.success) {
                    setStats([
                        { label: "Total Testimonials", value: statsData.data.total.toString(), color: "blue", icon: MessageSquare },
                        { label: "Approved", value: statsData.data.approved.toString(), color: "green", icon: MessageSquare },
                        { label: "Pending Review", value: statsData.data.pending.toString(), color: "orange", icon: MessageSquare },
                        { label: "Rejected", value: statsData.data.rejected.toString(), color: "red", icon: MessageSquare },
                    ]);
                }
            }
        } catch (error) {
            console.error("Error approving testimonial:", error);
            alert(error.message || "Failed to approve testimonial");
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/testimonials/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "rejected" }),
                }
            );
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to reject testimonial");
            }
            
            // Update the local state
            setTestimonials(prev => 
                prev.map(item => 
                    item._id === id 
                        ? { ...item, status: "rejected", reviewedAt: new Date().toISOString() }
                        : item
                )
            );
            
            // Refresh stats
            const statsResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/testimonials/stats`
            );
            
            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                
                if (statsData.success) {
                    setStats([
                        { label: "Total Testimonials", value: statsData.data.total.toString(), color: "blue", icon: MessageSquare },
                        { label: "Approved", value: statsData.data.approved.toString(), color: "green", icon: MessageSquare },
                        { label: "Pending Review", value: statsData.data.pending.toString(), color: "orange", icon: MessageSquare },
                        { label: "Rejected", value: statsData.data.rejected.toString(), color: "red", icon: MessageSquare },
                    ]);
                }
            }
        } catch (error) {
            console.error("Error rejecting testimonial:", error);
            alert(error.message || "Failed to reject testimonial");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this testimonial? This action cannot be undone.")) {
            return;
        }
        
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/testimonials/${id}`,
                {
                    method: "DELETE",
                }
            );
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Failed to delete testimonial");
            }
            
            // Remove from local state
            setTestimonials(prev => prev.filter(item => item._id !== id));
            
            // Refresh stats
            const statsResponse = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/testimonials/stats`
            );
            
            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                
                if (statsData.success) {
                    setStats([
                        { label: "Total Testimonials", value: statsData.data.total.toString(), color: "blue", icon: MessageSquare },
                        { label: "Approved", value: statsData.data.approved.toString(), color: "green", icon: MessageSquare },
                        { label: "Pending Review", value: statsData.data.pending.toString(), color: "orange", icon: MessageSquare },
                        { label: "Rejected", value: statsData.data.rejected.toString(), color: "red", icon: MessageSquare },
                    ]);
                }
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert(error.message || "Failed to delete testimonial");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-orange-100 text-orange-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Function to render user avatar in admin management
    const renderUserAvatar = (testimonial) => {
        if (testimonial.image) {
            return (
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mr-4 border border-gray-200">
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/testimonials/${testimonial.image}`}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = "none";
                            const defaultAvatar = e.target.parentNode.querySelector('.default-avatar');
                            if (defaultAvatar) {
                                defaultAvatar.style.display = "flex";
                            }
                        }}
                    />
                    <div className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center hidden default-avatar">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                </div>
            );
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-xl font-bold text-gray-900 mb-2 flex items-center mt-14 md:mt-0">
                        <MessageSquare className="h-8 w-8 mr-2 text-blue-600" />
                        Testimonial Management
                    </h1>
                    <p className="text-gray-600">
                        Manage and review patient testimonials submitted through your website.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard
                            key={index}
                            label={stat.label}
                            value={stat.value}
                            color={stat.color}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                {/* Filter */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            All Testimonials
                        </h2>
                        <div className="flex items-center space-x-2">
                            <Filter className="h-5 w-5 text-gray-500" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Testimonials List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading testimonials...</p>
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="p-12 text-center">
                            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">
                                {filterStatus === "all" 
                                    ? "No testimonials found." 
                                    : `No ${filterStatus} testimonials found.`
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial._id} className="p-6 hover:bg-gray-50">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center">
                                                    {renderUserAvatar(testimonial)}
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {testimonial.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            By {testimonial.name} ({testimonial.email})
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                        testimonial.status
                                                    )}`}
                                                >
                                                    {testimonial.status}
                                                </span>
                                            </div>

                                            <div className="flex items-center mb-3">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-4 w-4 text-yellow-400 fill-current"
                                                    />
                                                ))}
                                                <span className="ml-2 text-sm text-gray-600">
                                                    {testimonial.rating}/5
                                                </span>
                                            </div>

                                            <p className="text-gray-700 mb-4 italic">
                                                "{testimonial.testimony}"
                                            </p>

                                            <div className="text-sm text-gray-600">
                                                <p>Treatment: {testimonial.treatment}</p>
                                                <p>
                                                    Submitted:{" "}
                                                    {new Date(testimonial.createdAt).toLocaleDateString()}
                                                </p>
                                                {testimonial.reviewedAt && (
                                                    <p>
                                                        Reviewed:{" "}
                                                        {new Date(testimonial.reviewedAt).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex space-x-2 mt-4 md:mt-0 md:ml-4">
                                            {testimonial.status !== "approved" && (
                                                <button
                                                    onClick={() => handleApprove(testimonial._id)}
                                                    className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                                                >
                                                    <Check className="h-4 w-4 mr-1" />
                                                    Approve
                                                </button>
                                            )}
                                            {testimonial.status !== "rejected" && (
                                                <button
                                                    onClick={() => handleReject(testimonial._id)}
                                                    className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                                                >
                                                    <X className="h-4 w-4 mr-1" />
                                                    Reject
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(testimonial._id)}
                                                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialManagement;