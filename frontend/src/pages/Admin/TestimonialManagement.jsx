import { useState, useEffect } from "react";
import { MessageSquare, Filter, Check, X, Trash2, Star, Users } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";
import { getTestimonials, approveTestimonial, rejectTestimonial, deleteTestimonial } from "../../services/testimonialService";

const TestimonialManagement = () => {
    const [filterStatus, setFilterStatus] = useState("all");
    const [testimonials, setTestimonials] = useState([]);
    const [stats, setStats] = useState([
        { label: "Total Testimonials", value: "0", color: "blue" },
        { label: "Approved", value: "0", color: "green" },
        { label: "Pending Review", value: "0", color: "orange" },
        { label: "Rejected", value: "0", color: "red" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, testimonial: null });


    // Load testimonials from API
    useEffect(() => {
        const loadTestimonials = async () => {
            setIsLoading(true);
            try {
                const response = await getTestimonials(filterStatus);
                setTestimonials(response.data);
                updateStats(response.data);
            } catch (error) {
                console.error("Error loading testimonials:", error);
                setTestimonials(sampleTestimonials);
                updateStats(sampleTestimonials);
            } finally {
                setIsLoading(false);
            }
        };

        loadTestimonials();
    }, [filterStatus]);

    // Update stats based on testimonials
    const updateStats = (testimonialsData) => {
        const total = testimonialsData.length;
        const approved = testimonialsData.filter(t => t.status === "approved").length;
        const pending = testimonialsData.filter(t => t.status === "pending").length;
        const rejected = testimonialsData.filter(t => t.status === "rejected").length;

        setStats([
            { label: "Total Testimonials", value: total.toString(), color: "blue" },
            { label: "Approved", value: approved.toString(), color: "green" },
            { label: "Pending Review", value: pending.toString(), color: "orange" },
            { label: "Rejected", value: rejected.toString(), color: "red" },
        ]);
    };

    // Filter testimonials based on status
    const filteredTestimonials = filterStatus === "all" 
        ? testimonials 
        : testimonials.filter(t => t.status === filterStatus);

    const handleApprove = async (id) => {
        try {
            await approveTestimonial(id);
            const response = await getTestimonials(filterStatus);
            setTestimonials(response.data);
            updateStats(response.data);
        } catch (error) {
            console.error("Error approving testimonial:", error);
            setError("Failed to approve testimonial. Please try again.");
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectTestimonial(id);
            const response = await getTestimonials(filterStatus);
            setTestimonials(response.data);
            updateStats(response.data);
        } catch (error) {
            console.error("Error rejecting testimonial:", error);
            setError("Failed to reject testimonial. Please try again.");
        }
    };

    const handleDelete = async (testimonial) => {
        setDeleteModal({ isOpen: true, testimonial });
    };

    const confirmDelete = async () => {
        try {
            await deleteTestimonial(deleteModal.testimonial._id);
            const response = await getTestimonials(filterStatus);
            setTestimonials(response.data);
            updateStats(response.data);
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            setError("Failed to delete testimonial. Please try again.");
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
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mr-4 border border-gray-200">
        <img
          src={
            testimonial.image.includes('cloudinary.com') 
              ? testimonial.image 
              : testimonial.image.includes('biruh-kids/') 
                ? `https://res.cloudinary.com/door11ovj/image/upload/${testimonial.image}` 
                : `http://localhost:5000/uploads/testimonials/${testimonial.image}`
          }
          alt={testimonial.name}
          className="w-full h-full object-contain bg-gray-100"
          onError={(e) => {
            e.target.style.display = "none";
            const fallback = document.getElementById(`fallback-${testimonial._id}`);
            if (fallback) {
              fallback.style.display = "flex";
            }
          }}
        />
        <div id={`fallback-${testimonial._id}`} className="absolute inset-0 w-full h-full bg-blue-100 rounded-full items-center justify-center hidden">
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

    // Stats Card Component
    const StatsCard = ({ label, value, color, icon: Icon }) => {
        const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            orange: "bg-orange-100 text-orange-600",
            red: "bg-red-100 text-red-600"
        };

        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{label}</p>
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                    </div>
                </div>
            </div>
        );
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
                            icon={MessageSquare}
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
                    ) : filteredTestimonials.length === 0 ? (
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
                            {filteredTestimonials.map((testimonial) => (
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
                                                onClick={() => handleDelete(testimonial)}
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
            
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, testimonial: null })}
                onConfirm={confirmDelete}
                title="Delete Testimonial"
                message="Are you sure you want to delete this testimonial from:"
                confirmText="Delete"
                requireTextConfirmation={true}
                confirmationText={deleteModal.testimonial?.email || ""}
                isLoading={isLoading}
            />
        </div>
    );
};

export default TestimonialManagement;