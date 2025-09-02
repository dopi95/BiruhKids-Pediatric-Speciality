import { useState } from "react";
import { MessageSquare, Filter, Check, X, Trash2, Star } from "lucide-react";
import StatsCard from "../../components/StatsCard";

const TestimonialManagement = () => {
    const [filterStatus, setFilterStatus] = useState("all");

    const stats = [
        { label: "Total Testimonials", value: "389", color: "blue" },
        { label: "Approved", value: "342", color: "green" },
        { label: "Pending Review", value: "23", color: "orange" },
        { label: "Rejected", value: "24", color: "red" },
    ];

    const testimonials = [
        {
            id: 1,
            name: "John Smith",
            email: "john.smith@email.com",
            phone: "+251 11 123 4567",
            title: "Excellent Cardiac Care",
            content:
                "The cardiac team at HealthCare Clinic saved my life. Their expertise and compassionate care made all the difference during my treatment. I highly recommend their services.",
            rating: 5,
            treatment: "Cardiology",
            status: "approved",
            submittedAt: "2025-01-08",
            reviewedAt: "2025-01-09",
            allowPublic: true,
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.j@email.com",
            phone: "+251 11 234 5678",
            title: "Great Experience with Surgery",
            content:
                "From consultation to recovery, the surgical team was amazing. They explained everything clearly and made me feel comfortable throughout the entire process.",
            rating: 5,
            treatment: "Surgery",
            status: "pending",
            submittedAt: "2025-01-10",
            reviewedAt: null,
            allowPublic: true,
        },
        {
            id: 3,
            name: "Michael Brown",
            email: "michael.brown@email.com",
            phone: "+251 11 345 6789",
            title: "Outstanding Emergency Service",
            content:
                "When I had an emergency, the staff responded quickly and professionally. The quality of care was exceptional and I felt safe throughout my stay.",
            rating: 5,
            treatment: "Emergency Care",
            status: "approved",
            submittedAt: "2025-01-06",
            reviewedAt: "2025-01-07",
            allowPublic: true,
        },
        {
            id: 4,
            name: "Emily Davis",
            email: "emily.davis@email.com",
            phone: "+251 11 456 7890",
            title: "Disappointing Experience",
            content:
                "This testimonial contained inappropriate content that violated our community guidelines.",
            rating: 2,
            treatment: "General Medicine",
            status: "rejected",
            submittedAt: "2025-01-05",
            reviewedAt: "2025-01-06",
            allowPublic: false,
        },
        {
            id: 5,
            name: "David Wilson",
            email: "david.wilson@email.com",
            phone: "+251 11 567 8901",
            title: "Professional Staff and Clean Facilities",
            content:
                "I was impressed by the professionalism of the staff and the cleanliness of the facilities. The doctors were knowledgeable and took time to answer all my questions.",
            rating: 4,
            treatment: "General Medicine",
            status: "pending",
            submittedAt: "2025-01-09",
            reviewedAt: null,
            allowPublic: true,
        },
    ];

    const filteredTestimonials = testimonials.filter(
        (testimonial) =>
            filterStatus === "all" || testimonial.status === filterStatus
    );

    const handleApprove = (id) => console.log("Approve testimonial:", id);
    const handleReject = (id) => console.log("Reject testimonial:", id);
    const handleDelete = (id) => {
        if (
            window.confirm("Are you sure you want to delete this testimonial?")
        ) {
            console.log("Delete testimonial:", id);
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

    return (
        <div className="bg-gray-50 overflow-x-hidden min-h-screen">
            {/* Header */}
            <div className="bg-white border-b shadow-sm mt-14 sm:mt-0">
                <div className="px-4 sm:px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Testimonial Management
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Review and manage patient testimonials
                    </p>
                </div>
            </div>

            <div className="px-4 sm:px-6 py-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {stats.map((stat, i) => (
                        <StatsCard
                            key={i}
                            {...stat}
                            icon={MessageSquare}
                            className="w-full"
                        />
                    ))}
                </div>

                {/* Filter */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 sm:p-6 flex items-center space-x-2 sm:space-x-4 flex-wrap">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-10/12 sm:w-auto"
                        >
                            <option value="all">All Testimonials</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending Review</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-6">
                    {filteredTestimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white border-l-4 rounded-lg shadow-sm border-l-blue-500 max-w-full break-words"
                        >
                            <div className="p-4 sm:p-6 space-y-4">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0 flex-wrap">
                                    <div className="flex items-center space-x-4 flex-wrap">
                                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full flex-shrink-0">
                                            <span className="font-semibold text-blue-600">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 truncate">
                                                {testimonial.email}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate">
                                                {testimonial.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 flex-wrap">
                                        <span
                                            className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(
                                                testimonial.status
                                            )}`}
                                        >
                                            {testimonial.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                testimonial.status.slice(1)}
                                        </span>
                                        <div className="flex items-center flex-wrap">
                                            {[...Array(testimonial.rating)].map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="w-4 h-4 text-yellow-400 fill-current"
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Title & Content */}
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">
                                        {testimonial.title}
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        {testimonial.content}
                                    </p>
                                </div>

                                {/* Meta info */}
                                <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 space-y-2 sm:space-y-0 flex-wrap">
                                    <div className="flex items-center space-x-2 flex-wrap">
                                        <span className="px-2 py-1 text-blue-600 bg-blue-100 rounded-full truncate">
                                            {testimonial.treatment}
                                        </span>
                                        <span>
                                            Submitted: {testimonial.submittedAt}
                                        </span>
                                        {testimonial.reviewedAt && (
                                            <span>
                                                Reviewed:{" "}
                                                {testimonial.reviewedAt}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {testimonial.allowPublic ? (
                                            <span className="text-xs text-green-600">
                                                ✓ Allow Public
                                            </span>
                                        ) : (
                                            <span className="text-xs text-red-600">
                                                ✗ Private
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                                    {testimonial.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleApprove(
                                                        testimonial.id
                                                    )
                                                }
                                                className="flex items-center px-3 py-2 text-green-700 bg-green-100 rounded-lg hover:bg-green-200"
                                            >
                                                <Check className="w-4 h-4 mr-1" />{" "}
                                                Approve
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleReject(testimonial.id)
                                                }
                                                className="flex items-center px-3 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
                                            >
                                                <X className="w-4 h-4 mr-1" />{" "}
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {testimonial.status === "approved" && (
                                        <button
                                            onClick={() =>
                                                handleDelete(testimonial.id)
                                            }
                                            className="flex items-center px-3 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />{" "}
                                            Remove
                                        </button>
                                    )}

                                    {testimonial.status === "rejected" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleApprove(
                                                        testimonial.id
                                                    )
                                                }
                                                className="flex items-center px-3 py-2 text-green-700 bg-green-100 rounded-lg hover:bg-green-200"
                                            >
                                                <Check className="w-4 h-4 mr-1" />{" "}
                                                Approve
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(testimonial.id)
                                                }
                                                className="flex items-center px-3 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />{" "}
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredTestimonials.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full">
                                <MessageSquare className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                No testimonials found
                            </h3>
                            <p className="text-gray-600">
                                No testimonials match your current filter
                                selection.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialManagement;
