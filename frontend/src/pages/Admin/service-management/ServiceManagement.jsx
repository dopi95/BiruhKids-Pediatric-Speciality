import { useState, useEffect } from "react";
import ServiceModal from "./ServiceModal";
import ServiceCard from "../../../components/ServiceCard";
import { Plus, Settings, Search } from "lucide-react";
import StatsCard from "../../../components/StatsCard";
import ConfirmationModal from "../../../components/ConfirmationModal";
import serviceService from "../../../services/serviceService";

export default function ServiceManagement() {
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, service: null });
    const [editingService, setEditingService] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        step: 1,
        title_en: "",
        description_en: "",
        features_en: [],
        title_am: "",
        description_am: "",
        features_am: [],
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await serviceService.getServices();
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

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

    const handleSubmit = async (e, modalForm) => {
        e.preventDefault();
        
        try {
            if (editingService) {
                await serviceService.updateService(editingService._id, modalForm);
            } else {
                await serviceService.createService(modalForm);
            }
            
            // Refresh the services list
            fetchServices();
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
        } catch (error) {
            console.error("Error saving service:", error);
        }
    };

    const confirmDelete = (service) => {
        setDeleteModal({ isOpen: true, service });
    };

    const handleDelete = async () => {
        try {
            await serviceService.deleteService(deleteModal.service._id);
            // Refresh the services list
            fetchServices();
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const filteredServices = services.filter((s) =>
        s.title_en.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = [
        {
            label: "Total Services",
            value: services.length,
            change: "0%",
            color: "blue",
        },
    ];

    if (loading) {
        return <div className="p-8">Loading services...</div>;
    }

    return (
        <div className="bg-gray-50 mx-5">
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
                        <span className="text-2xl"></span>
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
                            key={service._id}
                            title={service.title_en}
                            description={service.description_en}
                            features={service.features_en}
                            showActions={true}
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
            
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, service: null })}
                onConfirm={handleDelete}
                title="Delete Service"
                message="Are you sure you want to delete this service:"
                confirmText="Delete"
                requireTextConfirmation={true}
                confirmationText={deleteModal.service?.title_en || ""}
                isLoading={loading}
            />
        </div>
    );
}