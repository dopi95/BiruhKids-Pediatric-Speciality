// components/AdminVideos.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Plus, Trash2, Edit, Youtube, Music2, X, RefreshCw } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import { 
  getAllVideos, 
  deleteVideo,
  updateVideo 
} from "../../services/videoApi";
import { toast } from "react-toastify";

const AdminVideos = () => {
    const navigate = useNavigate();
    const [selectedPlatform, setSelectedPlatform] = useState("youtube");
    const [editVideo, setEditVideo] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [youtubeVideos, setYoutubeVideos] = useState([]);
    const [tiktokVideos, setTiktokVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const platforms = [
        { id: "youtube", name: "YouTube" },
        { id: "tiktok", name: "TikTok" },
    ];

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const response = await getAllVideos();
            
            if (response.data && response.data.success) {
                const videos = response.data.data;
                setYoutubeVideos(videos.filter(video => video.platform === "youtube"));
                setTiktokVideos(videos.filter(video => video.platform === "tiktok"));
                setError(null);
            } else {
                setError("Failed to fetch videos: Invalid response format");
                toast.error("Failed to fetch videos: Invalid response format");
            }
        } catch (err) {
            setError("Failed to fetch videos. Please check your connection.");
            toast.error("Failed to fetch videos. Please check your connection.");
            console.error("Error fetching videos:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchVideos();
    };

    const currentVideos = selectedPlatform === "youtube" ? youtubeVideos : tiktokVideos;

    // Handle Save Changes
    const handleSave = async (updatedVideo) => {
        try {
            setSaveLoading(true);
            const response = await updateVideo(updatedVideo._id, updatedVideo);
            
            if (response.data && response.data.success) {
                toast.success("Video updated successfully!", { autoClose: 2000 });
                setEditVideo(null);
                
                // Update the specific video in the state
                if (selectedPlatform === "youtube") {
                    setYoutubeVideos((prev) =>
                        prev.map((v) => (v._id === updatedVideo._id ? response.data.data : v))
                    );
                } else {
                    setTiktokVideos((prev) =>
                        prev.map((v) => (v._id === updatedVideo._id ? response.data.data : v))
                    );
                }
            } else {
                toast.error("Failed to update video", { autoClose: 3000 });
                setError("Failed to update video");
            }
        } catch (err) {
            toast.error("Failed to update video. Please try again.", { autoClose: 3000 });
            setError("Failed to update video. Please try again.");
            console.error("Error updating video:", err);
        } finally {
            setSaveLoading(false);
        }
    };

    // Handle Delete
    const confirmDelete = async (videoId) => {
        try {
            setDeleteLoading(true);
            const response = await deleteVideo(videoId);
            
            if (response.data && response.data.success) {
                toast.success("Video deleted successfully!", { autoClose: 2000 });
                setShowDeleteConfirm(null);
                
                if (selectedPlatform === "youtube") {
                    setYoutubeVideos((prev) => prev.filter((v) => v._id !== videoId));
                } else {
                    setTiktokVideos((prev) => prev.filter((v) => v._id !== videoId));
                }
            } else {
                toast.error("Failed to delete video", { autoClose: 3000 });
                setError("Failed to delete video");
            }
        } catch (err) {
            toast.error("Failed to delete video. Please try again.", { autoClose: 3000 });
            setError("Failed to delete video. Please try again.");
            console.error("Error deleting video:", err);
        } finally {
            setDeleteLoading(false);
        }
    };

    // Stats
    const totalVideos = youtubeVideos.length + tiktokVideos.length;
    const stats = [
        {
            label: "Total Videos",
            value: totalVideos,
            color: "blue",
            icon: Play,
        },
        {
            label: "YouTube Videos",
            value: youtubeVideos.length,
            color: "red",
            icon: Youtube,
        },
        {
            label: "TikTok Videos",
            value: tiktokVideos.length,
            color: "pink",
            icon: Music2,
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex-1">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between mt-14 xl:mt-0">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                Video Management
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Manage educational videos and health content
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => navigate("/admin/videos/form")}
                                className="w-full sm:max-w-[250px] bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Video
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                            <button 
                                className="ml-4 text-red-800 font-bold"
                                onClick={() => setError(null)}
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
                        {stats.map((stat, i) => (
                            <StatsCard key={i} {...stat} icon={stat.icon} />
                        ))}
                    </div>

                    {/* Platform Switch */}
                    <div className="bg-white rounded-lg shadow-sm mb-6 p-6 flex items-center space-x-4">
                        <span className="font-semibold text-gray-700">
                            Platform:
                        </span>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            {platforms.map((platform) => (
                                <button
                                    key={platform.id}
                                    onClick={() =>
                                        setSelectedPlatform(platform.id)
                                    }
                                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                                        selectedPlatform === platform.id
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-600 hover:text-blue-600"
                                    }`}
                                >
                                    {platform.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Videos Grid */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {selectedPlatform.charAt(0).toUpperCase() +
                                    selectedPlatform.slice(1)}{" "}
                                Videos ({currentVideos.length})
                            </h2>
                        </div>
                        <div className="p-6">
                            {currentVideos.length > 0 ? (
                                <div
                                    className={`grid gap-6 ${
                                        selectedPlatform === "youtube"
                                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                    }`}
                                >
                                    {currentVideos.map((video) => (
                                        <div
                                            key={video._id}
                                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                                        >
                                            {selectedPlatform === "youtube" && (
                                                <div className="p-4">
                                                    <div className="aspect-video mb-3">
                                                        <iframe
                                                            className="w-full h-full rounded-md"
                                                            src={video.url}
                                                            title={video.title}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                                                        {video.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                                                        {video.description}
                                                    </p>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                setEditVideo(
                                                                    {...video}
                                                                )
                                                            }
                                                            className="p-1 text-green-600 hover:text-green-700"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setShowDeleteConfirm(
                                                                    video._id
                                                                )
                                                            }
                                                            className="p-1 text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedPlatform === "tiktok" && (
                                                <div className="p-3">
                                                    <blockquote
                                                        className="tiktok-embed"
                                                        cite={video.url}
                                                        data-video-id={video.videoId}
                                                        style={{
                                                            maxWidth: "605px",
                                                            minWidth: "325px",
                                                        }}
                                                    >
                                                        <section> </section>
                                                    </blockquote>
                                                    <script
                                                        async
                                                        src="https://www.tiktok.com/embed.js"
                                                    ></script>

                                                    <div className="flex justify-end space-x-2 mt-3">
                                                        <button
                                                            onClick={() =>
                                                                setEditVideo(
                                                                    {...video}
                                                                )
                                                            }
                                                            className="p-1 text-green-600 hover:text-green-700"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setShowDeleteConfirm(
                                                                    video._id
                                                                )
                                                            }
                                                            className="p-1 text-red-600 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Play className="h-12 w-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        No videos found
                                    </h3>
                                    <p className="text-gray-600 mb-8">
                                        Start by adding your first video.
                                    </p>
                                    <button
                                        onClick={() => navigate("/admin/videos/form")}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add First Video
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                        <button
                            onClick={() => setEditVideo(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {selectedPlatform === "youtube" ? (
                            <>
                                <h2 className="text-xl font-bold mb-4">
                                    Edit YouTube Video
                                </h2>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full mb-3 px-4 py-2 border rounded-lg"
                                    placeholder="Title"
                                    value={editVideo.title || ''}
                                    onChange={(e) =>
                                        setEditVideo({
                                            ...editVideo,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Video URL
                                </label>
                                <input
                                    type="url"
                                    className="w-full mb-3 px-4 py-2 border rounded-lg"
                                    placeholder="Video URL"
                                    value={editVideo.url || ''}
                                    onChange={(e) =>
                                        setEditVideo({
                                            ...editVideo,
                                            url: e.target.value,
                                        })
                                    }
                                />
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="w-full mb-3 px-4 py-2 border rounded-lg"
                                    placeholder="Description"
                                    value={editVideo.description || ''}
                                    onChange={(e) =>
                                        setEditVideo({
                                            ...editVideo,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title (Amharic)
                                </label>
                                <input
                                    type="text"
                                    className="w-full mb-3 px-4 py-2 border rounded-lg"
                                    placeholder="Title (Amharic)"
                                    value={editVideo.titleAm || ''}
                                    onChange={(e) =>
                                        setEditVideo({
                                            ...editVideo,
                                            titleAm: e.target.value,
                                        })
                                    }
                                />
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description (Amharic)
                                </label>
                                <textarea
                                    className="w-full mb-3 px-4 py-2 border rounded-lg"
                                    placeholder="Description (Amharic)"
                                    value={editVideo.descriptionAm || ''}
                                    onChange={(e) =>
                                        setEditVideo({
                                            ...editVideo,
                                            descriptionAm: e.target.value,
                                        })
                                    }
                                />
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setEditVideo(null)}
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleSave(editVideo)}
                                        disabled={saveLoading}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center"
                                    >
                                        {saveLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold mb-4">
                                    Edit TikTok Video
                                </h2>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Video URL
                                </label>
                                <input
                                    type="url"
                                    className="w-full mb-3 px-4 py-2 border rounded-lg"
                                    placeholder="Video URL"
                                    value={editVideo.url || ''}
                                    onChange={(e) =>
                                        setEditVideo({
                                            ...editVideo,
                                            url: e.target.value,
                                        })
                                    }
                                />
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setEditVideo(null)}
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleSave(editVideo)}
                                        disabled={saveLoading}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center"
                                    >
                                        {saveLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">
                            Are you sure?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            This action cannot be undone. The video will be
                            permanently removed.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 border rounded-lg"
                                disabled={deleteLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => confirmDelete(showDeleteConfirm)}
                                disabled={deleteLoading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50 flex items-center"
                            >
                                {deleteLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVideos;