import React, { useState } from "react";
import {
  MessageSquare,
  Filter,
  Eye,
  Check,
  X,
  Trash2,
  Star,
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";

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

  const filteredTestimonials = testimonials.filter((testimonial) => {
    return filterStatus === "all" || testimonial.status === filterStatus;
  });

  const handleApprove = (testimonialId) => {
    console.log("Approve testimonial:", testimonialId);
    // Placeholder for approve logic
  };

  const handleReject = (testimonialId) => {
    console.log("Reject testimonial:", testimonialId);
    // Placeholder for reject logic
  };

  const handleDelete = (testimonialId) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      console.log("Delete testimonial:", testimonialId);
      // Placeholder for delete logic
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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Testimonial Management
                </h1>
                <p className="text-gray-600">
                  Review and manage patient testimonials
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-sm transition transform hover:scale-15 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                  >
                    <MessageSquare
                      className={`h-6 w-6 text-${stat.color}-600`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="mb-6 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Testimonials</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border-l-4 rounded-lg shadow-sm border-l-blue-500"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                        <span className="font-semibold text-blue-600">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <div className="text-sm text-gray-600">
                          <p>{testimonial.email}</p>
                          <p>{testimonial.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          testimonial.status
                        )}`}
                      >
                        {testimonial.status.charAt(0).toUpperCase() +
                          testimonial.status.slice(1)}
                      </span>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-2 text-lg font-medium text-gray-900">
                      {testimonial.title}
                    </h4>
                    <p className="leading-relaxed text-gray-700">
                      {testimonial.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="px-2 py-1 text-blue-600 bg-blue-100 rounded-full">
                        {testimonial.treatment}
                      </span>
                      <span>Submitted: {testimonial.submittedAt}</span>
                      {testimonial.reviewedAt && (
                        <span>Reviewed: {testimonial.reviewedAt}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {testimonial.allowPublic ? (
                        <span className="text-xs text-green-600">
                          ✓ Allow Public
                        </span>
                      ) : (
                        <span className="text-xs text-red-600">✗ Private</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                      <Eye className="w-4 h-4 mr-1" />
                      View Full Details
                    </button>

                    <div className="flex space-x-2">
                      {testimonial.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(testimonial.id)}
                            className="flex items-center px-3 py-2 text-green-700 transition-colors duration-200 bg-green-100 rounded-lg hover:bg-green-200"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(testimonial.id)}
                            className="flex items-center px-3 py-2 text-red-700 transition-colors duration-200 bg-red-100 rounded-lg hover:bg-red-200"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                        </>
                      )}

                      {testimonial.status === "approved" && (
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="flex items-center px-3 py-2 text-red-700 transition-colors duration-200 bg-red-100 rounded-lg hover:bg-red-200"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </button>
                      )}

                      {testimonial.status === "rejected" && (
                        <>
                          <button
                            onClick={() => handleApprove(testimonial.id)}
                            className="flex items-center px-3 py-2 text-green-700 transition-colors duration-200 bg-green-100 rounded-lg hover:bg-green-200"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial.id)}
                            className="flex items-center px-3 py-2 text-red-700 transition-colors duration-200 bg-red-100 rounded-lg hover:bg-red-200"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="py-20 text-center">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full">
                <MessageSquare className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                No testimonials found
              </h3>
              <p className="text-gray-600">
                No testimonials match your current filter selection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialManagement;
