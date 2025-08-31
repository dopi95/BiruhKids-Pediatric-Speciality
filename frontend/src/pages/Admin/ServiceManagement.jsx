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
            title_en: "Cardiology",
            description_en:
                "Comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases.",
            features_en: [
                "ECG & Stress Testing",
                "Echocardiography",
                "Cardiac Catheterization",
                "Heart Disease Prevention",
            ],
            title_am: "",
            description_am: "",
            features_am: [],
        },
        {
            id: 2,
            title_en: "Emergency Care",
            description_en:
                "24/7 emergency services with rapid response team and state-of-the-art emergency equipment.",
            features_en: [
                "24/7 Availability",
                "Trauma Care",
                "Critical Care",
                "Emergency Surgery",
            ],
            title_am: "",
            description_am: "",
            features_am: [],
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [editingService, setEditingService] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        step: 1,
        title_en: "",
        description_en: "",
        features_en: [],
        title_am: "",
        description_am: "",
        features_am: [],
    });

    const openModal = (service = null) => {
        if (service) {
            setFormData({ ...service, step: 1 });
        } else {
            setFormData({
                step: 1,
                title_en: "",
                description_en: "",
                features_en: [],
                title_am: "",
                description_am: "",
                features_am: [],
            });
        }
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newService = {
            id: editingService ? editingService.id : Date.now(),
            title_en: formData.title_en,
            description_en: formData.description_en,
            features_en: formData.features_en,
            title_am: formData.title_am,
            description_am: formData.description_am,
            features_am: formData.features_am,
        };

        if (editingService) {
            setServices(
                Services.map((s) =>
                    s.id === editingService.id ? newService : s
                )
            );
        } else {
            setServices([newService, ...Services]);
        }

        setIsModalOpen(false);
        setEditingService(null);
        setFormData({
            step: 1,
            title_en: "",
            description_en: "",
            features_en: [],
            title_am: "",
            description_am: "",
            features_am: [],
        });
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
        s.title_en.toLowerCase().includes(searchQuery.toLowerCase())
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
                                    Title (EN)
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    Description (EN)
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    Features (EN)
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
                                        {s.title_en}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        {s.description_en}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        {s.features_en.join(", ")}
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
                            className="grid grid-cols-1 gap-4"
                            onSubmit={handleSubmit}
                        >
                            {/* Step 1: English */}
                            {formData.step === 1 && (
                                <>
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium">
                                            Title (English) *
                                        </label>
                                        <input
                                            type="text"
                                            name="title_en"
                                            value={formData.title_en}
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium">
                                            Description (English) *
                                        </label>
                                        <textarea
                                            name="description_en"
                                            value={formData.description_en}
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium">
                                            Features (English, comma separated)
                                            *
                                        </label>
                                        <input
                                            type="text"
                                            name="features_en"
                                            value={formData.features_en.join(
                                                ", "
                                            )}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    features_en: e.target.value
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
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    step: 2,
                                                })
                                            }
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Step 2: Amharic */}
                            {formData.step === 2 && (
                                <>
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium">
                                            ርዕስ *
                                        </label>
                                        <input
                                            type="text"
                                            name="title_am"
                                            value={formData.title_am}
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium">
                                            መግለጫ *
                                        </label>
                                        <textarea
                                            name="description_am"
                                            value={formData.description_am}
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-sm font-medium">
                                            ባህሪያት (በኮማ የተከፋፈሉ) *
                                        </label>
                                        <input
                                            type="text"
                                            name="features_am"
                                            value={formData.features_am.join(
                                                ", "
                                            )}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    features_am: e.target.value
                                                        .split(",")
                                                        .map((f) => f.trim()),
                                                })
                                            }
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    <div className="flex justify-between gap-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    step: 1,
                                                })
                                            }
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        >
                                            ተመለስ
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            አስቀምጥ
                                        </button>
                                    </div>
                                </>
                            )}
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
                                {serviceToDelete.title_en}
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
