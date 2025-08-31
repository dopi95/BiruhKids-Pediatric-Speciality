import React, { useState } from "react";
import { Plus, UserCog } from "lucide-react";
import StatsCard from "../../../components/StatsCard";
import AdminTable from "./AdminTable";
import AddAdminModal from "./AddAdminModal";

export default function AdminManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    permissions: {
      dashboard: true,
      userManagement: false,
      resultManagement: false,
      videoManagement: false,
      testimonialManagement: false,
      subscriberManagement: false,
      adminManagement: false,
    },
  });

  const stats = [
    { label: "Total Admins", value: "8", change: "+2 this month", color: "blue" },
    { label: "Super Admins", value: "2", change: "Unchanged", color: "purple" },
    { label: "Regular Admins", value: "6", change: "+2 new", color: "green" },
  ];

  const admins = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@clinic.com",
      role: "Super Admin",
      permissions: ["All Permissions"],
      lastLogin: "2025-01-10 14:30",
      status: "Active",
      createdAt: "2024-08-15",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@clinic.com",
      role: "Super Admin",
      permissions: ["All Permissions"],
      lastLogin: "2025-01-10 09:15",
      status: "Active",
      createdAt: "2024-08-15",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@clinic.com",
      role: "Admin",
      permissions: ["Dashboard", "User Management", "Result Management"],
      lastLogin: "2025-01-09 16:45",
      status: "Active",
      createdAt: "2024-12-01",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add new admin:", formData);
    setShowAddForm(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "admin",
      permissions: {
        dashboard: true,
        userManagement: false,
        resultManagement: false,
        videoManagement: false,
        testimonialManagement: false,
        subscriberManagement: false,
        adminManagement: false,
      },
    });
  };

  const handleDeleteAdmin = (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      console.log("Delete admin:", adminId);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
              <p className="text-gray-600">Manage administrator accounts and permissions</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Admin
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <StatsCard key={i} {...stat} icon={UserCog} />
            ))}
          </div>

          {/* Modal */}
          {showAddForm && (
            <AddAdminModal
              formData={formData}
              onClose={() => setShowAddForm(false)}
              onSubmit={handleSubmit}
              onChange={handleInputChange}
              onPermissionChange={handlePermissionChange}
            />
          )}

          {/* Table */}
          <AdminTable admins={admins} onDelete={handleDeleteAdmin} />
        </div>
      </div>
    </div>
  );
}
