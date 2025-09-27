import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import DepartmentModal from "./DepartmentModal";
import ServiceModal from "./ServiceModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import DepartmentCard from "../../../components/DepartmentCard";
import departmentService from "../../../services/departmentService";

export default function DepartmentServiceManagement() {
    const [departments, setDepartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    
    // Modals
    const [deptModal, setDeptModal] = useState({ isOpen: false, editing: null });
    const [serviceModal, setServiceModal] = useState({ isOpen: false, editing: null, deptId: null });
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, item: null });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await departmentService.getDepartments();
            setDepartments(response.data || []);
        } catch (error) {
            console.error("Error fetching departments:", error);
            toast.error("Failed to load departments");
        } finally {
            setLoading(false);
        }
    };

    const handleAddDepartment = () => {
        setDeptModal({ isOpen: true, editing: null });
    };

    const handleEditDepartment = (dept) => {
        setDeptModal({ isOpen: true, editing: dept });
    };

    const handleDeleteDepartment = (dept) => {
        setDeleteModal({ isOpen: true, type: 'department', item: dept });
    };

    const handleAddService = (deptId) => {
        setServiceModal({ isOpen: true, editing: null, deptId });
    };

    const handleEditService = (service, deptId) => {
        setServiceModal({ isOpen: true, editing: service, deptId });
    };

    const handleDeleteService = (service) => {
        setDeleteModal({ isOpen: true, type: 'service', item: service });
    };

    const saveDepartment = async (deptData) => {
        try {
            if (deptModal.editing) {
                await departmentService.updateDepartment(deptModal.editing._id, deptData);
                toast.success("Department updated successfully!");
            } else {
                await departmentService.createDepartment(deptData);
                toast.success("Department created successfully!");
            }
            fetchDepartments();
        } catch (error) {
            console.error("Error saving department:", error);
            toast.error("Failed to save department");
        }
        setDeptModal({ isOpen: false, editing: null });
    };

    const saveService = async (serviceData) => {
        const { deptId } = serviceModal;
        try {
            if (serviceModal.editing) {
                await departmentService.updateService(deptId, serviceModal.editing._id, serviceData);
                toast.success("Service updated successfully!");
            } else {
                await departmentService.addService(deptId, serviceData);
                toast.success("Service added successfully!");
            }
            fetchDepartments();
        } catch (error) {
            console.error("Error saving service:", error);
            toast.error("Failed to save service");
        }
        setServiceModal({ isOpen: false, editing: null, deptId: null });
    };

    const confirmDelete = async () => {
        const { type, item } = deleteModal;
        try {
            if (type === 'department') {
                await departmentService.deleteDepartment(item._id);
                toast.success("Department deleted successfully!");
            } else if (type === 'service') {
                const dept = departments.find(d => d.services.some(s => s._id === item._id));
                if (dept) {
                    await departmentService.deleteService(dept._id, item._id);
                    toast.success("Service deleted successfully!");
                }
            }
            fetchDepartments();
        } catch (error) {
            console.error("Error deleting:", error);
            toast.error(`Failed to delete ${type}`);
        }
        setDeleteModal({ isOpen: false, type: null, item: null });
    };

    const filteredDepartments = departments.filter(dept =>
        (dept.title_en || dept.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dept.services || []).some(service => 
            (service.name_en || service.name || "").toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const totalServices = departments.reduce((sum, dept) => sum + dept.services.length, 0);

    if (loading) {
        return (
            <div className="bg-gray-50 mx-5 flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 mx-5">
            {/* Header */}
            <div className="bg-white shadow-sm border-b px-6 py-4 flex flex-col gap-4 sm:flex-row justify-between sm:items-center mt-14 xl:mt-0">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                        Department & Service Management
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Manage departments and their services
                    </p>
                </div>
                <button
                    onClick={handleAddDepartment}
                    className="w-full sm:max-w-[250px] bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
                >
                    <Plus className="h-4 w-4 mr-2" /> Add Department
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-6 md:my-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">Total Departments</h3>
                    <p className="text-3xl font-bold text-blue-600">{departments.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">Total Services</h3>
                    <p className="text-3xl font-bold text-green-600">{totalServices}</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 md:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900">All Departments & Services</h2>
                <div className="flex items-center border rounded-lg overflow-hidden w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search departments or services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 outline-none w-full sm:w-64 md:w-80"
                    />
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                </div>
            </div>

            {/* Departments List */}
            <div className="space-y-4 md:space-y-6 pb-6">
                {filteredDepartments.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <p className="text-gray-500 mb-4">No departments found</p>
                        <button
                            onClick={handleAddDepartment}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                            Create First Department
                        </button>
                    </div>
                ) : (
                    filteredDepartments.map((dept) => (
                        <DepartmentCard
                            key={dept._id}
                            department={dept}
                            onEditDepartment={handleEditDepartment}
                            onDeleteDepartment={handleDeleteDepartment}
                            onAddService={handleAddService}
                            onEditService={handleEditService}
                            onDeleteService={handleDeleteService}
                        />
                    ))
                )}
            </div>

            {/* Modals */}
            <DepartmentModal
                isOpen={deptModal.isOpen}
                onClose={() => setDeptModal({ isOpen: false, editing: null })}
                onSave={saveDepartment}
                department={deptModal.editing}
            />

            <ServiceModal
                isOpen={serviceModal.isOpen}
                onClose={() => setServiceModal({ isOpen: false, editing: null, deptId: null })}
                onSave={saveService}
                service={serviceModal.editing}
            />

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, type: null, item: null })}
                onConfirm={confirmDelete}
                title={`Delete ${deleteModal.type === 'department' ? 'Department' : 'Service'}`}
                message={`Are you sure you want to delete this ${deleteModal.type}?`}
                confirmText="Delete"
                requireTextConfirmation={true}
                confirmationText={deleteModal.item?.title_en || deleteModal.item?.title || deleteModal.item?.name_en || deleteModal.item?.name || ""}
            />
        </div>
    );
}