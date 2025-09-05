// components/AdminVideosForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { createVideo } from "../../services/videoApi";

const AdminVideosForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        platform: "youtube",
        title: "",
        description: "",
        url: "",
        titleAm: "",
        descriptionAm: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        navigate("/admin/videos");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            await createVideo(formData);
            navigate("/admin/videos");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create video");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-6">
                        <button 
                            onClick={handleCancel}
                            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
                        >
                            <ArrowLeft className="h-5 w-5 mr-1" />
                            Back
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Add New Video</h1>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Platform
                                </label>
                                <select
                                    name="platform"
                                    value={formData.platform}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="youtube">YouTube</option>
                                    <option value="tiktok">TikTok</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Video URL
                                </label>
                                <input
                                    type="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {formData.platform === "youtube" && (
                            <>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title (Amharic)
                                    </label>
                                    <input
                                        type="text"
                                        name="titleAm"
                                        value={formData.titleAm}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description (Amharic)
                                    </label>
                                    <textarea
                                        name="descriptionAm"
                                        value={formData.descriptionAm}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <Play className="h-4 w-4 mr-2" />
                                )}
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminVideosForm;