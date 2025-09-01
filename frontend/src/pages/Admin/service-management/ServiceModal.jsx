import React, { useState, useEffect } from "react";
import { X, Edit, Trash2, AlertTriangle } from "lucide-react";

export default function ServiceModal({
    isOpen,
    onClose,
    onSubmit,
    formData,
    editingService,
}) {
    const [step, setStep] = useState(formData.step || 1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [localForm, setLocalForm] = useState({ ...formData });
    const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);
    const [editingFeatureField, setEditingFeatureField] = useState(null);

    useEffect(() => {
        setLocalForm({ ...formData });
        setStep(formData.step || 1);
    }, [formData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalForm({ ...localForm, [name]: value });
    };

    const handleAddFeature = (field) => {
        const input = localForm[field + "_input"];
        if (!input || !input.trim()) return;
        setLocalForm({
            ...localForm,
            [field]: [...localForm[field], input.trim()],
            [field + "_input"]: "",
        });
    };

    const handleRemoveFeature = (field, index) => {
        const newArr = [...localForm[field]];
        newArr.splice(index, 1);
        setLocalForm({ ...localForm, [field]: newArr });
    };

    const handleEditFeature = (field, index) => {
        setEditingFeatureIndex(index);
        setEditingFeatureField(field);
        setLocalForm({
            ...localForm,
            [field + "_input"]: localForm[field][index],
        });
    };

    const handleSaveFeatureEdit = () => {
        if (editingFeatureIndex === null || !editingFeatureField) return;
        const newArr = [...localForm[editingFeatureField]];
        newArr[editingFeatureIndex] =
            localForm[editingFeatureField + "_input"].trim();
        setLocalForm({
            ...localForm,
            [editingFeatureField]: newArr,
            [editingFeatureField + "_input"]: "",
        });
        setEditingFeatureIndex(null);
        setEditingFeatureField(null);
    };

    const confirmClose = () => {
        if (JSON.stringify(localForm) !== JSON.stringify(formData)) {
            setShowConfirm(true);
        } else {
            onClose();
        }
    };

    const handleCancelClose = () => {
        setShowConfirm(false);
    };

    const handleConfirmClose = () => {
        setShowConfirm(false);
        onClose();
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        onSubmit(e, localForm);
    };

    const renderFeatures = (field) => (
        <div className="flex flex-col space-y-2">
            {localForm[field].map((f, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                    <span className="flex-1">{f}</span>
                    <button
                        type="button"
                        onClick={() => handleEditFeature(field, idx)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Edit />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRemoveFeature(field, idx)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 />
                    </button>
                </div>
            ))}
            <div className="flex gap-2 mt-1">
                <input
                    type="text"
                    value={localForm[field + "_input"] || ""}
                    onChange={(e) =>
                        setLocalForm({
                            ...localForm,
                            [field + "_input"]: e.target.value,
                        })
                    }
                    placeholder="Add feature..."
                    className="flex-1 border p-2 rounded"
                />
                {editingFeatureIndex !== null &&
                editingFeatureField === field ? (
                    <button
                        type="button"
                        onClick={handleSaveFeatureEdit}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => handleAddFeature(field)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Modal Overlay */}
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl shadow-lg relative">
                    {/* Close button top-right */}
                    <button
                        onClick={confirmClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <h3 className="text-xl font-semibold mb-4">
                        {editingService ? "Edit Service" : "Add New Service"}
                    </h3>

                    <form
                        className="grid grid-cols-1 gap-4"
                        onSubmit={handleSubmitForm}
                    >
                        {/* Step 1: English */}
                        {step === 1 && (
                            <>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">
                                        Title (English) *
                                    </label>
                                    <input
                                        type="text"
                                        name="title_en"
                                        value={localForm.title_en}
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
                                        value={localForm.description_en}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">
                                        Features (English) *
                                    </label>
                                    {renderFeatures("features_en")}
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={confirmClose}
                                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 2: Amharic */}
                        {step === 2 && (
                            <>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-sm font-medium">
                                        ርዕስ *
                                    </label>
                                    <input
                                        type="text"
                                        name="title_am"
                                        value={localForm.title_am}
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
                                        value={localForm.description_am}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">
                                        ባህሪያት *
                                    </label>
                                    {renderFeatures("features_am")}
                                </div>

                                <div className="flex justify-between gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
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

            {/* Unsaved Changes Confirmation */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-center">
                        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            Unsaved Changes
                        </h3>
                        <p className="text-gray-600 mb-6">
                            You have unsaved changes. Are you sure you want to
                            discard them?
                        </p>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={handleCancelClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                No
                            </button>
                            <button
                                onClick={handleConfirmClose}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Yes, Discard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
