import React from "react";
import {
  Users,
  FileText,
  Play,
  MessageSquare,
  Mail,
  UserCheck,
  Calendar,
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";


const AdminDashboard = () => {
  const stats = [
    {
      icon: Users,
      label: "Registered Users",
      value: "2,547",
      change: "+12% this month",
      color: "blue",
    },
    {
      icon: UserCheck,
      label: "Active Doctors",
      value: "45",
      change: "+3 new doctors",
      color: "green",
    },
    {
      icon: FileText,
      label: "Results Submitted",
      value: "1,284",
      change: "+18% this month",
      color: "orange",
    },
    {
      icon: MessageSquare,
      label: "Testimonials",
      value: "389",
      change: "23 pending review",
      color: "purple",
    },
    {
      icon: Mail,
      label: "Newsletter Subscribers",
      value: "8,923",
      change: "+156 this week",
      color: "pink",
    },
    {
      icon: Calendar,
      label: "Appointments Today",
      value: "67",
      change: "12 confirmed",
      color: "indigo",
    },
  ];

  const quickActions = [
    {
      title: "Add New User",
      description: "Register a new patient",
      link: "/admin/users",
      icon: Users,
      color: "blue",
    },
    {
      title: "Upload Results",
      description: "Send test results to patients",
      link: "/admin/results",
      icon: FileText,
      color: "green",
    },
    {
      title: "Add Video",
      description: "Upload educational content",
      link: "/admin/videos/form",
      icon: Play,
      color: "red",
    },
    {
      title: "Review Testimonials",
      description: "Moderate patient feedback",
      link: "/admin/testimonials",
      icon: MessageSquare,
      color: "yellow",
    },
    {
      title: "Send Newsletter",
      description: "Email subscribers",
      link: "/admin/subscribers",
      icon: Mail,
      color: "purple",
    },
    {
      title: "Manage Admins",
      description: "Add or remove admin access",
      link: "/admin/admins",
      icon: UserCheck,
      color: "pink",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mt-14">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's what's happening at the clinic.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Dr. Admin</p>
                <p className="text-xs text-gray-600">Super Administrator</p>
              </div>
              <img
                src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="Admin"
                className="h-10 w-10 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.link}
                className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`w-8 h-8 bg-${action.color}-100 rounded-lg flex items-center justify-center mr-3`}
                  >
                    <action.icon
                      className={`h-4 w-4 text-${action.color}-600`}
                    />
                  </div>
                  <h3 className="font-medium text-gray-900">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
