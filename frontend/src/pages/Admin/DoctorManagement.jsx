import { useState, useEffect } from "react";
import {
    Plus,
    Edit,
    Trash2,
    Upload,
    Search,
    Stethoscope,
    RefreshCw
} from "lucide-react";
import StatsCard from "../../components/StatsCard";
import ConfirmationModal from "../../components/ConfirmationModal";
import { doctorAPI } from "../../services/doctorApi";
import { toast } from "react-toastify";

export default function DoctorManagement() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiStatus, setApiStatus] = useState('checking');

    const [stats, setStats] = useState([
        {
            label: "Total Doctors",
            value: 0,
            color: "blue",
            icon: Stethoscope,
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, doctor: null });
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        nameAmh: "",
        field: "",
        fieldAmh: "",
        experience: "",
        experienceAmh: "",
        photo: null,
    });

    const [errors, setErrors] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    // Check backend connection and fetch doctors
    useEffect(() => {
        checkBackendConnection();
    }, []);

    const checkBackendConnection = async () => {
        try {
            setApiStatus('checking');
            setLoading(true);
            await doctorAPI.healthCheck();
            setApiStatus('connected');
            await fetchDoctors();
        } catch (err) {
            setApiStatus('error');
            setError('Cannot connect to backend server. Please make sure it\'s running on port 5000.');
            setLoading(false);
            console.error('Connection error:', err);
        }
    };

    // Fetch doctors from API
    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await doctorAPI.getDoctors(searchQuery);
            setDoctors(response.data);
            
            // Update stats
            setStats([{
                label: "Total Doctors",
                value: response.data.length,
                color: "blue",
                icon: Stethoscope,
            }]);
            setError(null);
        } catch (err) {
            setError("Failed to fetch doctors: " + err.message);
            console.error("Error fetching doctors:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch doctors when search query changes
    useEffect(() => {
        if (apiStatus === 'connected') {
            const timeoutId = setTimeout(() => {
                fetchDoctors();
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [searchQuery]);

    const openModal = (doctor = null) => {
        if (doctor) {
            setEditingDoctor(doctor);
            setFormData({ 
                name: doctor.name || "",
                nameAmh: doctor.nameAmh || "",
                field: doctor.field || "",
                fieldAmh: doctor.fieldAmh || "",
                experience: doctor.experience || "",
                experienceAmh: doctor.experienceAmh || "",
                photo: null,
            });
        } else {
            setEditingDoctor(null);
            setFormData({
                name: "",
                nameAmh: "",
                field: "",
                fieldAmh: "",
                experience: "",
                experienceAmh: "",
                photo: null,
            });
        }
        setErrors({});
        setStep(1);
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setFormData({ ...formData, photo: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateStep1 = () => {
        const { name, field, experience } = formData;
        const newErrors = {};
        if (!name.trim()) newErrors.name = "This field is required";
        if (!field.trim()) newErrors.field = "This field is required";
        if (!experience.trim()) newErrors.experience = "This field is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const { nameAmh, fieldAmh, experienceAmh } = formData;
        const newErrors = {};
        if (!nameAmh.trim()) newErrors.nameAmh = "This field is required";
        if (!fieldAmh.trim()) newErrors.fieldAmh = "This field is required";
        if (!experienceAmh.trim()) newErrors.experienceAmh = "This field is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1()) setStep(2);
    };

    const handleBack = () => setStep(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        try {
            setLoading(true);
            if (editingDoctor) {
                await doctorAPI.updateDoctor(editingDoctor._id, formData);
                toast.success("Doctor updated successfully!");
            } else {
                await doctorAPI.createDoctor(formData);
                toast.success("Doctor created successfully!");
            }
            
            await fetchDoctors();
            setIsModalOpen(false);
            setError(null);
        } catch (err) {
            const errorMessage = "Failed to save doctor: " + err.message;
            setError(errorMessage);
            toast.error(errorMessage);
            console.error("Error saving doctor:", err);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (doctor) => {
        setDeleteModal({ isOpen: true, doctor });
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await doctorAPI.deleteDoctor(deleteModal.doctor._id);
            await fetchDoctors();
            setError(null);
            toast.success("Doctor deleted successfully!");
        } catch (err) {
            const errorMessage = "Failed to delete doctor: " + err.message;
            setError(errorMessage);
            toast.error(errorMessage);
            console.error("Error deleting doctor:", err);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field) =>
        `w-full border p-2 rounded ${errors[field] ? "border-red-500" : "border-gray-300"}`;

    if (apiStatus === 'checking') {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-blue-500 text-lg flex items-center">
                    <RefreshCw className="animate-spin mr-2" />
                    Connecting to backend...
                </div>
            </div>
        );
    }

    if (apiStatus === 'error') {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-lg mb-4">{error}</div>
                    <button 
                        onClick={checkBackendConnection}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mx-auto"
                    >
                        <RefreshCw className="mr-2" />
                        Retry Connection
                    </button>
                    <div className="mt-4 text-sm text-gray-600">
                        Make sure your backend server is running with: 
                        <code className="block bg-gray-100 p-2 mt-1 rounded">npm run dev</code>
                        in your backend directory
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Main Content */}
            <div className="flex-1 bg-gray-50 ml-0 md:ml-30 mt-14 md:mt-0 p-4">
                {/* Header */}
                <div className="bg-white shadow-sm border-b rounded-lg p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-5 justify-between sm:items-center">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                Doctor Management
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Adding and Deleting Doctor's
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={fetchDoctors}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center"
                                disabled={loading}
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <button
                                onClick={() => openModal()}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                disabled={loading}
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add Doctor
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} {...stat} icon={stat.icon} />
                    ))}
                </div>

                {/* Doctors Table */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 lg:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            <span className="text-2xl">👨‍⚕️ </span>
                            All Doctors
                        </h2>

                        {/* Search Input */}
                        <div className="flex items-center border rounded-lg overflow-hidden w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-3 py-2 outline-none flex-1 min-w-0"
                                disabled={loading}
                            />
                            <Search className="h-5 w-5 text-gray-400 mx-2" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <RefreshCw className="animate-spin text-blue-500 h-8 w-8" />
                            </div>
                        ) : doctors.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No doctors found. Add your first doctor above.
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Doctor
                                        </th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Field
                                        </th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Experience
                                        </th>
                                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {doctors.map((doc) => (
                                        <tr key={doc._id} className="hover:bg-gray-50">
                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                                                        {doc.photo ? (
                                                            <>
                                                                <img 
                                                                    src={doc.photo}
                                                                    alt={doc.name}
                                                                    className="w-10 h-10 object-cover"
                                                                    onError={(e) => {
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-blue-100" style={{display: 'none'}}>
                                                                    <span className="text-blue-600 font-semibold text-sm">
                                                                        {doc.name.charAt(0)}
                                                                    </span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <span className="text-blue-600 font-semibold text-sm">
                                                                {doc.name.charAt(0)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {doc.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {doc.nameAmh}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="text-sm text-gray-900">{doc.field}</div>
                                                <div className="text-sm text-gray-500">{doc.fieldAmh}</div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="text-sm text-gray-900">{doc.experience}</div>
                                                <div className="text-sm text-gray-500">{doc.experienceAmh}</div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 text-sm font-medium flex space-x-2">
                                                <button
                                                    onClick={() => openModal(doc)}
                                                    className="text-green-600 hover:text-green-900 p-1"
                                                    disabled={loading}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete(doc)}
                                                    className="text-red-600 hover:text-red-900 p-1"
                                                    disabled={loading}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingDoctor ? "Edit Doctor" : "Add New Doctor"} - Step {step}
                            </h3>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {step === 1 && (
                                    <>
                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter full name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={inputClass("name")}
                                                disabled={loading}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">Field *</label>
                                            <input
                                                type="text"
                                                name="field"
                                                placeholder="Enter field"
                                                value={formData.field}
                                                onChange={handleChange}
                                                className={inputClass("field")}
                                                disabled={loading}
                                            />
                                            {errors.field && (
                                                <p className="text-red-500 text-sm">{errors.field}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">Experience *</label>
                                            <input
                                                type="text"
                                                name="experience"
                                                placeholder="Years of experience"
                                                value={formData.experience}
                                                onChange={handleChange}
                                                className={inputClass("experience")}
                                                disabled={loading}
                                            />
                                            {errors.experience && (
                                                <p className="text-red-500 text-sm">{errors.experience}</p>
                                            )}
                                        </div>

                                        <div className="col-span-1 sm:col-span-2 flex flex-col space-y-2">
                                            <label className="text-sm font-medium">Photo</label>
                                            <label className="flex items-center justify-center w-full h-28 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
                                                <Upload className="w-6 h-6 text-gray-500 mr-2" />
                                                <span className="text-gray-500">
                                                    {formData.photo ? formData.photo.name : "Upload Doctor Photo"}
                                                </span>
                                                <input
                                                    type="file"
                                                    name="photo"
                                                    accept="image/*"
                                                    onChange={handleChange}
                                                    className="hidden"
                                                    disabled={loading}
                                                />
                                            </label>
                                        </div>

                                        <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                                disabled={loading}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                                disabled={loading}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </>
                                )}

                                {step === 2 && (
                                    <>
                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">ሙሉ ስም *</label>
                                            <input
                                                type="text"
                                                name="nameAmh"
                                                placeholder="የሙሉ ስም ያስገቡ"
                                                value={formData.nameAmh}
                                                onChange={handleChange}
                                                className={inputClass("nameAmh")}
                                                disabled={loading}
                                            />
                                            {errors.nameAmh && (
                                                <p className="text-red-500 text-sm">{errors.nameAmh}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">ሙያ *</label>
                                            <input
                                                type="text"
                                                name="fieldAmh"
                                                placeholder="የምርምር መስክ ያስገቡ"
                                                value={formData.fieldAmh}
                                                onChange={handleChange}
                                                className={inputClass("fieldAmh")}
                                                disabled={loading}
                                            />
                                            {errors.fieldAmh && (
                                                <p className="text-red-500 text-sm">{errors.fieldAmh}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">የስራ ልምድ *</label>
                                            <input
                                                type="text"
                                                name="experienceAmh"
                                                placeholder="የስራ ልምድ"
                                                value={formData.experienceAmh}
                                                onChange={handleChange}
                                                className={inputClass("experienceAmh")}
                                                disabled={loading}
                                            />
                                            {errors.experienceAmh && (
                                                <p className="text-red-500 text-sm">{errors.experienceAmh}</p>
                                            )}
                                        </div>

                                        <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                                disabled={loading}
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                                disabled={loading}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                                disabled={loading}
                                            >
                                                {loading ? 'Saving...' : 'Save'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                )}

                <ConfirmationModal
                    isOpen={deleteModal.isOpen}
                    onClose={() => setDeleteModal({ isOpen: false, doctor: null })}
                    onConfirm={handleDelete}
                    title="Delete Doctor"
                    message="Are you sure you want to delete this doctor:"
                    confirmText="Delete"
                    requireTextConfirmation={true}
                    confirmationText={deleteModal.doctor?.name || ""}
                    isLoading={loading}
                />
            </div>
        </div>
    );
}