import React, { useState } from "react";
import {
    Plus,
    Edit,
    Trash2,
    AlertTriangle,
    Search,
    Settings,
} from "lucide-react";

export default function ServiceManagement() {
    const [Services, setServices] = useState([
        {
            id: 1,
            title: "Cardiology",
            description:
                "Comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases.",
            features: [
                "ECG & Stress Testing",
                "Echocardiography",
                "Cardiac Catheterization",
                "Heart Disease Prevention",
            ],
        },
        {
            id: 2,
            title: "Emergency Care",
            description:
                "24/7 emergency services with rapid response team and state-of-the-art emergency equipment.",
            features: [
                "24/7 Availability",
                "Trauma Care",
                "Critical Care",
                "Emergency Surgery",
            ],
        },
        {
            id: 3,
            title: "General Medicine",
            description:
                "Primary healthcare services for patients of all ages with comprehensive health management.",
            features: [
                "Health Checkups",
                "Chronic Disease Management",
                "Vaccination",
                "Health Counseling",
            ],
        },
        {
            id: 4,
            title: "Neurology",
            description:
                "Specialized care for disorders of the nervous system, brain, and spinal cord.",
            features: [
                "Neurological Exams",
                "EEG Testing",
                "Stroke Care",
                "Epilepsy Treatment",
            ],
        },
        {
            id: 5,
            title: "Orthopedics",
            description:
                "Expert care for bone, joint, muscle, and ligament conditions and injuries.",
            features: [
                "Joint Replacement",
                "Sports Medicine",
                "Fracture Care",
                "Physical Therapy",
            ],
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        features: [],
    });

    const openModal = (service = null) => {
        if (service) setFormData({ ...service });
        else
            setFormData({
                title: "",
                description: "",
                features: [],
            });
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingService) {
            setServices(
                Services.map((s) =>
                    s.id === editingService.id ? { ...formData, id: s.id } : s
                )
            );
        } else {
            setServices([{ ...formData, id: Date.now() }, ...Services]);
        }
        setIsModalOpen(false);
    };

    const confirmDelete = (service) => {
        setServiceToDelete(service);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        setServices(Services.filter((s) => s.id !== serviceToDelete.id));
        setServiceToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const filteredServices = Services.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 sm:p-6 bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Service Management
                    </h1>
                    <p>Adding and Deleting Services</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                    <Plus className="h-4 w-4 mr-2" /> Add Service
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-gray-600 text-sm font-medium">
                            Total Services
                        </h2>
                        <p className="text-2xl font-bold">{Services.length}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-xl">
                        <Settings />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex gap-1 items-center">
                        <span className="text-2xl">
                            <Settings />{" "}
                        </span>
                        All Services
                    </h2>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 py-2 outline-none w-60"
                        />
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="min-w-[500px] w-full text-sm sm:text-base">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    No
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    Features
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredServices.map((s, index) => (
                                <tr key={s.id} className="hover:bg-gray-50">
                                    <td className="px-4 sm:px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        {s.title}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        {s.description}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        {s.features.join(", ")}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 flex space-x-2">
                                        <button
                                            onClick={() => openModal(s)}
                                            className="text-green-600 hover:text-green-900 p-1 sm:p-2"
                                        >
                                            <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(s)}
                                            className="text-red-600 hover:text-red-900 p-1 sm:p-2"
                                        >
                                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">
                            {editingService
                                ? "Edit Service"
                                : "Add New Service"}
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium">
                                    Features (comma separated) *
                                </label>
                                <input
                                    type="text"
                                    name="features"
                                    value={formData.features.join(", ")}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            features: e.target.value
                                                .split(",")
                                                .map((f) => f.trim()),
                                        })
                                    }
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && serviceToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full text-center shadow-lg">
                        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            Are you sure?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Do you really want to delete{" "}
                            <span className="font-semibold">
                                {serviceToDelete.title}
                            </span>
                            ?
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
