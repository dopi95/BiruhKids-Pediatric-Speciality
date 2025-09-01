import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminVideosForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    platform: 'youtube',
    title: '',
    description: '',
    url: '',
    titleAm: '',
    descriptionAm: ''
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/admin/videos');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    navigate('/admin/videos');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center space-x-4 mt-14 md:mt-0">
            <button
              onClick={() => navigate('/admin/videos')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Video</h1>
              <p className="text-gray-600">Fill video details based on platform</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Platform *</label>
                <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, platform: 'youtube' }))}
                    className={`px-4 py-2 rounded-md font-semibold ${formData.platform === 'youtube' ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-red-600'}`}
                  >
                    YouTube
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, platform: 'tiktok' }))}
                    className={`px-4 py-2 rounded-md font-semibold ${formData.platform === 'tiktok' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'}`}
                  >
                    TikTok
                  </button>
                </div>
              </div>

              {/* YouTube Form */}
              {formData.platform === 'youtube' && (
                <>
                  {step === 1 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Video URL *</label>
                        <input
                          type="url"
                          name="url"
                          value={formData.url}
                          onChange={handleChange}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full px-4 py-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg"
                          required
                        />
                      </div>

                      <div className="flex justify-end space-x-4 pt-6 border-t">
                        <button type="button" onClick={handleCancel} className="px-6 py-3 border rounded-lg">Cancel</button>
                        <button type="button" onClick={() => setStep(2)} className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center">
                          <Play className="h-4 w-4 mr-2" /> Next (Amharic)
                        </button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title (Amharic) *</label>
                        <input
                          type="text"
                          name="titleAm"
                          value={formData.titleAm}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Video URL *</label>
                        <input
                          type="url"
                          name="url"
                          value={formData.url}
                          readOnly
                          className="w-full px-4 py-3 border rounded-lg bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description (Amharic) *</label>
                        <textarea
                          name="descriptionAm"
                          value={formData.descriptionAm}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg"
                          required
                        />
                      </div>

                      <div className="flex justify-end space-x-4 pt-6 border-t">
                        <button type="button" onClick={handleCancel} className="px-6 py-3 border rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center">
                          <Play className="h-4 w-4 mr-2" /> Submit
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* TikTok Form */}
              {formData.platform === 'tiktok' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video URL *</label>
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://tiktok.com/@username/video/..."
                      className="w-full px-4 py-3 border rounded-lg"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button type="button" onClick={handleCancel} className="px-6 py-3 border rounded-lg">Cancel</button>
                    <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center">
                      <Play className="h-4 w-4 mr-2" /> Submit
                    </button>
                  </div>
                </>
              )}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVideosForm;
