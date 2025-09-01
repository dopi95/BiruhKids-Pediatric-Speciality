import React, { useState } from "react";
import { Play, Plus, Trash2, Edit, Youtube, Music2, X } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";

const AdminVideos = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("youtube");
  const [editVideo, setEditVideo] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const platforms = [
    { id: "youtube", name: "YouTube" },
    { id: "tiktok", name: "TikTok" },
  ];

  const [youtubeVideos, setYoutubeVideos] = useState([
    {
      id: 1,
      title: "Biruh Kids - YouTube Video",
      description: "Educational video from Biruh Kids on YouTube.",
      url: "https://www.youtube.com/embed/lz5jpt_k7nA?autoplay=0&mute=0",
      titleAm: "ብሩህ ልጆች - የዩቱብ ቪዲዮ",
      descriptionAm: "ከብሩህ ልጆች በዩቱብ ላይ የትምህርት ቪዲዮ።",
    },
  ]);

  const [tiktokVideos, setTiktokVideos] = useState([
    {
      id: 1,
      url: "https://www.tiktok.com/@biruhkids/video/7402191353947393286",
    },
  ]);

  const currentVideos =
    selectedPlatform === "youtube" ? youtubeVideos : tiktokVideos;

  // Handle Save Changes
  const handleSave = (updatedVideo) => {
    if (selectedPlatform === "youtube") {
      setYoutubeVideos((prev) =>
        prev.map((v) => (v.id === updatedVideo.id ? updatedVideo : v))
      );
    } else {
      setTiktokVideos((prev) =>
        prev.map((v) => (v.id === updatedVideo.id ? updatedVideo : v))
      );
    }
    setEditVideo(null);
  };

  // Handle Delete
  const confirmDelete = (videoId) => {
    if (selectedPlatform === "youtube") {
      setYoutubeVideos((prev) => prev.filter((v) => v.id !== videoId));
    } else {
      setTiktokVideos((prev) => prev.filter((v) => v.id !== videoId));
    }
    setShowDeleteConfirm(null);
  };

  // Stats
  const totalVideos = youtubeVideos.length + tiktokVideos.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between mt-14 md:mt-0">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Video Management
              </h1>
              <p className="text-gray-600">
                Manage educational videos and health content
              </p>
            </div>
            <a
              href="/admin/videos/form"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Video
            </a>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Play className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Videos</p>
                <p className="text-xl font-bold text-gray-900">{totalVideos}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Youtube className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">YouTube Videos</p>
                <p className="text-xl font-bold text-gray-900">
                  {youtubeVideos.length}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Music2 className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">TikTok Videos</p>
                <p className="text-xl font-bold text-gray-900">
                  {tiktokVideos.length}
                </p>
              </div>
            </div>
          </div>

          {/* Platform Switch */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6 flex items-center space-x-4">
            <span className="font-semibold text-gray-700">Platform:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
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
                      key={video.id}
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
                              onClick={() => setEditVideo(video)}
                              className="p-1 text-green-600 hover:text-green-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(video.id)}
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
                            data-video-id="7402191353947393286"
                            style={{ maxWidth: "605px", minWidth: "325px" }}
                          >
                            <section> </section>
                          </blockquote>
                          <script
                            async
                            src="https://www.tiktok.com/embed.js"
                          ></script>

                          <div className="flex justify-end space-x-2 mt-3">
                            <button
                              onClick={() => setEditVideo(video)}
                              className="p-1 text-green-600 hover:text-green-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(video.id)}
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
                  <a
                    href="/admin/videos/form"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Video
                  </a>
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
                <h2 className="text-xl font-bold mb-4">Edit YouTube Video</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full mb-3 px-4 py-2 border rounded-lg"
                  placeholder="Title"
                  value={editVideo.title}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, title: e.target.value })
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input
                  type="url"
                  className="w-full mb-3 px-4 py-2 border rounded-lg"
                  placeholder="Video URL"
                  value={editVideo.url}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, url: e.target.value })
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full mb-3 px-4 py-2 border rounded-lg"
                  placeholder="Description"
                  value={editVideo.description}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, description: e.target.value })
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">Title (Amharic)</label>
                <input
                  type="text"
                  className="w-full mb-3 px-4 py-2 border rounded-lg"
                  placeholder="Title (Amharic)"
                  value={editVideo.titleAm}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, titleAm: e.target.value })
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Amharic)</label>
                <textarea
                  className="w-full mb-3 px-4 py-2 border rounded-lg"
                  placeholder="Description (Amharic)"
                  value={editVideo.descriptionAm}
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
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Edit TikTok Video</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input
                  type="url"
                  className="w-full mb-3 px-4 py-2 border rounded-lg"
                  placeholder="Video URL"
                  value={editVideo.url}
                  onChange={(e) =>
                    setEditVideo({ ...editVideo, url: e.target.value })
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
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Save Changes
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
              This action cannot be undone. The video will be permanently
              removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
