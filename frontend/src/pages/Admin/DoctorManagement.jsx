import React, { useState } from "react";
import {
    Plus,
    Edit,
    Trash2,
    AlertTriangle,
    Upload,
    Search,
    Stethoscope,
} from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import StatsCard from "../../components/StatsCard";

export default function DoctorManagement() {
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            name: "Dr. Biruh",
            nameAmh: "",
            field: "Pediatrics",
            fieldAmh: "",
            experience: "10 years",
            experienceAmh: "",
            photo: null,
        },
        {
            id: 2,
            name: "Dr. Dagi",
            nameAmh: "",
            field: "Operation",
            fieldAmh: "",
            experience: "15 years",
            experienceAmh: "",
            photo: null,
        },
    ]);

    const stats = [
        {
            label: "Total Doctors",
            value: doctors.length,
            color: "blue",
            icon: Stethoscope,
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);
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

    const openModal = (doctor = null) => {
        if (doctor) {
            setEditingDoctor(doctor);
            setFormData({ ...doctor });
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
        if (name === "photo") setFormData({ ...formData, photo: files[0] });
        else setFormData({ ...formData, [name]: value });

        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateStep1 = () => {
        const { name, field, experience } = formData;
        const newErrors = {};
        if (!name) newErrors.name = "This field is required";
        if (!field) newErrors.field = "This field is required";
        if (!experience) newErrors.experience = "This field is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const { nameAmh, fieldAmh, experienceAmh } = formData;
        const newErrors = {};
        if (!nameAmh) newErrors.nameAmh = "This field is required";
        if (!fieldAmh) newErrors.fieldAmh = "This field is required";
        if (!experienceAmh) newErrors.experienceAmh = "This field is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1()) setStep(2);
    };

    const handleBack = () => setStep(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        if (editingDoctor) {
            setDoctors(
                doctors.map((doc) =>
                    doc.id === editingDoctor.id
                        ? { ...formData, id: doc.id }
                        : doc
                )
            );
        } else {
            setDoctors([{ ...formData, id: Date.now() }, ...doctors]);
        }
        setIsModalOpen(false);
    };

    const confirmDelete = (doctor) => {
        setDoctorToDelete(doctor);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        setDoctors(doctors.filter((doc) => doc.id !== doctorToDelete.id));
        setDoctorToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const inputClass = (field) =>
        `w-full border p-2 rounded ${errors[field] ? "border-red-500" : ""}`;

    const filteredDoctors = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 p-4 sm:p-6 bg-gray-50 ml-0 md:ml-30 mt-14 md:mt-0">
                <div className="bg-white shadow-sm border-b">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Doctor Management
                            </h1>
                            <p>Adding and Deleting Doctor's</p>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add Doctor
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8 mx-2">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} {...stat} icon={stat.icon} />
                    ))}
                </div>

                {/* Doctors Table */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                            <span className="text-2xl">👨‍⚕️ </span>
                            All Doctors
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

                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[500px] w-full text-sm sm:text-base">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Doctor
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Field
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Experience
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDoctors.map((doc) => (
                                    <tr
                                        key={doc.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-semibold text-sm sm:text-base">
                                                        {doc.name.charAt(4)}
                                                    </span>
                                                </div>
                                                <div className="ml-3 sm:ml-4">
                                                    <div className="text-sm sm:text-base font-medium text-gray-900">
                                                        {doc.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                                            {doc.field}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-gray-900">
                                            {doc.experience}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                                            <button
                                                onClick={() => openModal(doc)}
                                                className="text-green-600 hover:text-green-900 p-1 sm:p-2"
                                            >
                                                <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    confirmDelete(doc)
                                                }
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

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                            <h3 className="text-xl font-semibold mb-4">
                                {editingDoctor
                                    ? "Edit Doctor"
                                    : "Add New Doctor"}{" "}
                                - Step {step}
                            </h3>

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {step === 1 && (
                                    <>
                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter full name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={inputClass("name")}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">
                                                Field *
                                            </label>
                                            <input
                                                type="text"
                                                name="field"
                                                placeholder="Enter field"
                                                value={formData.field}
                                                onChange={handleChange}
                                                className={inputClass("field")}
                                            />
                                            {errors.field && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.field}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">
                                                Experience *
                                            </label>
                                            <input
                                                type="text"
                                                name="experience"
                                                placeholder="Years of experience"
                                                value={formData.experience}
                                                onChange={handleChange}
                                                className={inputClass(
                                                    "experience"
                                                )}
                                            />
                                            {errors.experience && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.experience}
                                                </p>
                                            )}
                                        </div>

                                        <div className="col-span-1 sm:col-span-2 flex flex-col space-y-2">
                                            <label className="text-sm font-medium">
                                                Photo
                                            </label>
                                            <label className="flex items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
                                                <Upload className="w-6 h-6 text-gray-500 mr-2" />
                                                <span className="text-gray-500">
                                                    {formData.photo
                                                        ? formData.photo.name
                                                        : "Upload Doctor Photo"}
                                                </span>
                                                <input
                                                    type="file"
                                                    name="photo"
                                                    accept="image/*"
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-2">
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
                                                onClick={handleNext}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </>
                                )}

                                {step === 2 && (
                                    <>
                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">
                                                ሙሉ ስም *
                                            </label>
                                            <input
                                                type="text"
                                                name="nameAmh"
                                                placeholder="የሙሉ ስም ያስገቡ"
                                                value={formData.nameAmh}
                                                onChange={handleChange}
                                                className={inputClass(
                                                    "nameAmh"
                                                )}
                                            />
                                            {errors.nameAmh && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.nameAmh}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">
                                                ሙያ *
                                            </label>
                                            <input
                                                type="text"
                                                name="fieldAmh"
                                                placeholder="የምርምር መስክ ያስገቡ"
                                                value={formData.fieldAmh}
                                                onChange={handleChange}
                                                className={inputClass(
                                                    "fieldAmh"
                                                )}
                                            />
                                            {errors.fieldAmh && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.fieldAmh}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-1">
                                            <label className="text-sm font-medium">
                                                የስራ ልምድ *
                                            </label>
                                            <input
                                                type="text"
                                                name="experienceAmh"
                                                placeholder="የስራ ልምድ"
                                                value={formData.experienceAmh}
                                                onChange={handleChange}
                                                className={inputClass(
                                                    "experienceAmh"
                                                )}
                                            />
                                            {errors.experienceAmh && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.experienceAmh}
                                                </p>
                                            )}
                                        </div>

                                        <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                            >
                                                Back
                                            </button>
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
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
                {isDeleteModalOpen && doctorToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full text-center shadow-lg">
                            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                Are you sure?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Do you really want to delete{" "}
                                <span className="font-semibold">
                                    {doctorToDelete.name}
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
        </div>
    );
}
