import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, FileText, User, Download, Eye, StickyNote, X } from "lucide-react";
import resultService from "../services/resultService.js";

const UserDashboard = ({ lang = "En" }) => {
  const [showAllResults, setShowAllResults] = useState(false);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch results from backend
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await resultService.getPatientResults();
        setResults(response.results || []);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleMarkAsRead = async (resultId) => {
    try {
      await resultService.markResultAsRead(resultId);
      setResults(prev => prev.map(result => 
        result._id === resultId ? { ...result, isRead: true } : result
      ));
    } catch (error) {
      console.error("Error marking result as read:", error);
    }
  };

  const handleDownloadFile = async (filename, originalName) => {
    try {
      await resultService.downloadResultFile(filename, originalName);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleViewFile = async (filename) => {
    try {
      await resultService.viewResultFile(filename);
    } catch (error) {
      console.error("Error viewing file:", error);
    }
  };

  const displayedResults = showAllResults ? results : results.slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getFileIcon = (mimetype) => {
    if (mimetype?.includes('pdf')) return <FileText className="h-4 w-4 text-red-600" />;
    if (mimetype?.includes('image')) return <FileText className="h-4 w-4 text-green-600" />;
    return <FileText className="h-4 w-4 text-blue-600" />;
  };

  const t = {
    En: {
      totalResults: "Total Results",
      recentResults: "Recent Test Results",
      viewAll: "View All",
      showLess: "Show Less",
      quickActions: "Quick Actions",
      viewResults: "View Results",
      updateProfile: "Update Profile",
    },
    Am: {
      totalResults: "ጠቅላላ ውጤቶች",
      recentResults: "የቅርብ የሙከራ ውጤቶች",
      viewAll: "ሁሉንም አሳይ",
      showLess: "በትንሽ አሳይ",
      quickActions: "ፈጣን እርምጃዎች",
      viewResults: "ውጤቶችን አሳይ",
      updateProfile: "መገለጫ አሻሽል",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Total Results Card */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{t[lang].totalResults}</p>
                <p className="text-3xl font-bold text-gray-900">{results.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Results */}
        <div className="grid grid-cols-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{t[lang].recentResults}</h2>
              <button
                onClick={() => setShowAllResults(!showAllResults)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {showAllResults ? t[lang].showLess : t[lang].viewAll}
              </button>
            </div>
            <div className="p-6 space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading results...</p>
                </div>
              ) : displayedResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No results available</p>
                </div>
              ) : (
                displayedResults.map((result) => (
                  <div key={result._id} className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${!result.isRead ? 'bg-blue-50 border-blue-200' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-600">{result.doctorName}</p>
                        {!result.isRead && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(result.testDate)}
                      </div>
                    </div>

                    {/* Files */}
                    <div className="space-y-2 mb-2">
                      {result.resultFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between border p-2 rounded-md hover:bg-gray-50">
                          <div className="flex items-center space-x-2">
                            {getFileIcon(file.mimetype)}
                            <span className="text-sm text-gray-700">{file.originalName}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              className="p-1 text-blue-600 hover:text-blue-700"
                              onClick={() => {
                                handleViewFile(file.filename);
                                !result.isRead && handleMarkAsRead(result._id);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              className="p-1 text-blue-600 hover:text-blue-700"
                              onClick={() => handleDownloadFile(file.filename, file.originalName)}
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Notes */}
                    {result.additionalNotes && openNoteId !== result._id && (
                      <button
                        onClick={() => setOpenNoteId(result._id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                      >
                        <StickyNote className="h-4 w-4 mr-1" />
                        Additional Notes
                      </button>
                    )}

                    {openNoteId === result._id && (
                      <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3 relative">
                        <button
                          onClick={() => setOpenNoteId(null)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <p className="text-sm text-gray-700">{result.additionalNotes}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t[lang].quickActions}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowAllResults(true)}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
              disabled={loading}
            >
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t[lang].viewResults}</p>
            </button>
            <Link
              to="/profile"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
            >
              <User className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">{t[lang].updateProfile}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
