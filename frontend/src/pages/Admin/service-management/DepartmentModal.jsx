import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function DepartmentModal({ isOpen, onClose, onSave, department }) {
    const [formData, setFormData] = useState({
        title_en: "",
        title_am: "",
        description_en: "",
        description_am: ""
    });

    useEffect(() => {
        if (department) {
            setFormData({
                title_en: department.title_en || department.title || "",
                title_am: department.title_am || "",
                description_en: department.description_en || department.description || "",
                description_am: department.description_am || ""
            });
        } else {
            setFormData({
                title_en: "",
                title_am: "",
                description_en: "",
                description_am: ""
            });
        }
    }, [department, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title_en.trim() || !formData.title_am.trim()) return;
        onSave(formData);
        setFormData({ title_en: "", title_am: "", description_en: "", description_am: "" });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-5 w-5" />
                </button>

                <h3 className="text-xl font-semibold mb-4">
                    {department ? "Edit Department" : "Add New Department"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Department Title (English) *
                            </label>
                            <input
                                type="text"
                                name="title_en"
                                value={formData.title_en}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Cardiology, Neurology"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Department Title (Amharic) *
                            </label>
                            <input
                                type="text"
                                name="title_am"
                                value={formData.title_am}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., የልብ ሕክምና, የነርቭ ሕክምና"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (English)
                            </label>
                            <textarea
                                name="description_en"
                                value={formData.description_en}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Brief description of the department"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (Amharic)
                            </label>
                            <textarea
                                name="description_am"
                                value={formData.description_am}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="የክፍሉ አጭር መግለጫ"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {department ? "Update" : "Add"} Department
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}