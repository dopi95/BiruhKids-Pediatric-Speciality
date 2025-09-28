import React, { useState, useEffect } from "react";
import { Plus, UserCog, Trash2 } from "lucide-react";
import StatsCard from "../../../components/StatsCard";
import AdminTable from "./AdminTable";
import AddAdminModal from "./AddAdminModal";
import DeleteAdminModal from "./DeleteAdminModal";
import userService from "../../../services/userService";
import { toast } from "react-toastify";

export default function AdminManagement() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [deletingAdmin, setDeletingAdmin] = useState(null);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
        permissions: {
            dashboard: true,
            userManagement: false,
            resultManagement: false,
            doctorManagement: false,
            serviceManagement: false,
            appointmentManagement: false,
            videoManagement: false,
            testimonialManagement: false,
            subscriberManagement: false,
            adminManagement: false,
        },
    });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const response = await userService.getAdmins();
            setAdmins(response.admins || []);
        } catch (error) {
            toast.error('Failed to fetch admins: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const totalAdmins = admins.length;
    const superAdmins = admins.filter(admin => admin.role === 'super_admin').length;
    const regularAdmins = admins.filter(admin => admin.role === 'admin').length;

    const stats = [
        {
            label: "Total Admins",
            value: totalAdmins.toString(),
            change: `${totalAdmins} total`,
            color: "blue",
        },
        {
            label: "Super Admins",
            value: superAdmins.toString(),
            change: `${superAdmins} active`,
            color: "purple",
        },
        {
            label: "Regular Admins",
            value: regularAdmins.toString(),
            change: `${regularAdmins} active`,
            color: "green",
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role') {
            if (value === 'super_admin') {
                // Auto-check all permissions for super admin
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                    permissions: {
                        dashboard: true,
                        userManagement: true,
                        resultManagement: true,
                        doctorManagement: true,
                        serviceManagement: true,
                        appointmentManagement: true,
                        videoManagement: true,
                        testimonialManagement: true,
                        subscriberManagement: true,
                        adminManagement: true,
                    },
                }));
            } else {
                // For admin role, ensure dashboard is always checked
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                    permissions: {
                        ...prev.permissions,
                        dashboard: true
                    }
                }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handlePermissionChange = (permission) => {
        // Prevent unchecking dashboard permission
        if (permission === 'dashboard') {
            return;
        }
        
        setFormData((prev) => {
            const newPermissions = {
                ...prev.permissions,
                [permission]: !prev.permissions[permission],
                dashboard: true // Always keep dashboard checked
            };
            
            // Check if all permissions are selected
            const allPermissionsSelected = Object.values(newPermissions).every(value => value === true);
            
            // Determine new role based on permissions
            let newRole = prev.role;
            if (allPermissionsSelected) {
                newRole = 'super_admin';
            } else if (prev.role === 'super_admin' && !newPermissions[permission]) {
                newRole = 'admin';
            }
            
            return {
                ...prev,
                role: newRole,
                permissions: newPermissions,
            };
        });
    };



    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "admin",
            permissions: {
                dashboard: true,
                userManagement: false,
                resultManagement: false,
                doctorManagement: false,
                serviceManagement: false,
                appointmentManagement: false,
                videoManagement: false,
                testimonialManagement: false,
                subscriberManagement: false,
                adminManagement: false,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name.trim()) {
            toast.error('Admin name is required');
            return;
        }
        
        if (!formData.email.trim()) {
            toast.error('Email address is required');
            return;
        }
        
        if (!editingAdmin && !formData.password.trim()) {
            toast.error('Password is required for new admin');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        
        // Validate role and permissions consistency
        const allPermissionsChecked = Object.values(formData.permissions).every(value => value === true);
        if (formData.role === 'admin' && allPermissionsChecked) {
            toast.error('Uncheck at least one box so the role can be admin otherwise the role will be super admin');
            return;
        }
        
        try {
            setSubmitting(true);
            if (editingAdmin) {
                await userService.updateAdmin(editingAdmin._id, formData);
                toast.success('Admin updated successfully!', { autoClose: 2000 });
                setShowEditForm(false);
                setEditingAdmin(null);
            } else {
                await userService.createAdmin(formData);
                toast.success('Admin created successfully!', { autoClose: 2000 });
                setShowAddForm(false);
            }
            resetForm();
            setTimeout(() => fetchAdmins(), 100);
        } catch (error) {
            console.error('Admin operation error:', error);
            if (error.response?.status === 400) {
                toast.error('Validation error: ' + (error.response?.data?.message || 'Invalid data provided'));
            } else if (error.response?.status === 401) {
                toast.error('Unauthorized: Please login again');
            } else if (error.response?.status === 403) {
                toast.error('Access denied: Insufficient permissions');
            } else if (error.response?.status === 409) {
                toast.error('Conflict: Admin with this email already exists');
            } else if (error.code === 'NETWORK_ERROR') {
                toast.error('Network error: Please check your connection');
            } else {
                toast.error('Operation failed: ' + (error.response?.data?.message || error.message));
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditAdmin = (admin) => {
        setEditingAdmin(admin);
        setFormData({
            name: admin.name,
            email: admin.email,
            password: "", // Don't populate password for editing
            role: admin.role,
            permissions: {
                ...admin.permissions,
                dashboard: true // Always ensure dashboard is checked
            },
        });
        setShowEditForm(true);
    };

    const handleDeleteAdmin = (admin) => {
        setDeletingAdmin(admin);
        setShowDeleteModal(true);
    };

    const confirmDeleteAdmin = async (adminId) => {
        try {
            await userService.deleteAdmin(adminId);
            toast.success('Admin deleted successfully!', { autoClose: 2000 });
            setShowDeleteModal(false);
            setDeletingAdmin(null);
            setTimeout(() => fetchAdmins(), 100);
        } catch (error) {
            console.error('Delete admin error:', error);
            if (error.response?.status === 403) {
                toast.error('Cannot delete admin: Insufficient permissions', { autoClose: 3000 });
            } else if (error.response?.status === 404) {
                toast.error('Admin not found or already deleted', { autoClose: 3000 });
            } else {
                toast.error('Failed to delete admin: ' + (error.response?.data?.message || error.message), { autoClose: 3000 });
            }
        }
    };

    const handleCloseModal = () => {
        setShowAddForm(false);
        setShowEditForm(false);
        setEditingAdmin(null);
        resetForm();
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeletingAdmin(null);
    };

    return (
        <div className="bg-gray-50">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-x-auto">
                <div className="bg-white shadow-sm border-b px-4 sm:px-6 py-4 flex flex-col gap-4 sm:flex-row justify-between sm:items-center mt-14 xl:mt-0 mb-6">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            Admin Management
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Manage administrator accounts and permissions
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full sm:max-w-[250px] bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex justify-center items-center"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Add Admin
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} {...stat} icon={UserCog} />
                    ))}
                </div>

                {/* Add Modal */}
                {showAddForm && (
                    <AddAdminModal
                        formData={formData}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmit}
                        onChange={handleInputChange}
                        onPermissionChange={handlePermissionChange}
                        isEditing={false}
                        submitting={submitting}
                    />
                )}

                {/* Edit Modal */}
                {showEditForm && (
                    <AddAdminModal
                        formData={formData}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmit}
                        onChange={handleInputChange}
                        onPermissionChange={handlePermissionChange}
                        isEditing={true}
                        title="Edit Admin"
                        submitting={submitting}
                    />
                )}

                {/* Delete Modal */}
                {showDeleteModal && deletingAdmin && (
                    <DeleteAdminModal
                        admin={deletingAdmin}
                        onClose={handleCloseDeleteModal}
                        onConfirm={confirmDeleteAdmin}
                    />
                )}

                {/* Admin Table */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-gray-500">Loading admins...</div>
                    </div>
                ) : admins.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <div className="text-gray-500 mb-4">No administrators found</div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Add First Admin
                        </button>
                    </div>
                ) : (
                    <AdminTable
                        admins={admins}
                        onEdit={handleEditAdmin}
                        onDelete={handleDeleteAdmin}
                    />
                )}
            </div>
        </div>
    );
}
