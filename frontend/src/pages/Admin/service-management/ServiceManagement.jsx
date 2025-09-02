import { useState } from "react";
import ServiceModal from "./ServiceModal";
import ServiceCard from "../../../components/ServiceCard";
import { Plus, AlertTriangle, Settings, Search } from "lucide-react";
import StatsCard from "../../../components/StatsCard";

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

    const handleSubmit = (e, modalForm) => {
        e.preventDefault();
        const newService = {
            id: editingService ? editingService.id : Date.now(),
            title_en: modalForm.title_en,
            description_en: modalForm.description_en,
            features_en: modalForm.features_en,
            title_am: modalForm.title_am,
            description_am: modalForm.description_am,
            features_am: modalForm.features_am,
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

    const stats = [
        {
            label: "Total Services",
            value: Services.length,
            change: "0%",
            color: "blue",
        },
    ];

    return (
        <div className="bg-gray-50">
            {/* Main Content */}
            <div className="flex-1">
                <div className="bg-white shadow-sm border-b px-6 py-4 flex flex-col gap-4 sm:flex-row justify-between sm:items-center mt-14 md:mt-0">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                            Service Management
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Adding and Deleting Services
                        </p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="w-full sm:max-w-[250px] bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Add Service
                    </button>
                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} {...stat} icon={Settings} />
                    ))}
                </div>
                {/* Search Bar */}
                <div className="bg-white p-3 sm:p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                        <span className="text-2xl">👨‍⚕️ </span>
                        All Services
                    </h2>

                    {/* Search Input */}
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 py-2 outline-none w-60"
                        />
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                    </div>
                </div>

                {/* Services List */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
                    {filteredServices.map((service) => (
                        <ServiceCard
                            key={service.id}
                            icon={service.icon}
                            title={service.title_en}
                            description={service.description_en}
                            features={service.features_en}
                            showActions={true} // enable edit/delete buttons
                            onEdit={() => openModal(service)}
                            onDelete={() => confirmDelete(service)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                step={formData.step}
                setStep={(step) => setFormData({ ...formData, step })}
                editingService={editingService}
            />
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
