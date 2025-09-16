import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, FileText, User, Download, Eye, StickyNote, X } from "lucide-react";

const UserDashboard = ({ lang = "En" }) => {
  const [showAllResults, setShowAllResults] = useState(false);
  const [openNoteId, setOpenNoteId] = useState(null);

  // Updated recentResults with multiple files per result
  const recentResults = [
    {
      id: 1,
      files: [
        { name: "blood_test_results.pdf", type: "pdf" },
        { name: "blood_report_image.png", type: "image" },
      ],
      date: "2025-01-08",
      doctor: "Dr. Sarah Johnson",
      note: "Your hemoglobin levels are slightly below normal. Please eat iron-rich foods and repeat the test in 2 months.",
    },

    {
      id: 2,
      files: [
        { name: "chest_xray_report.pdf", type: "pdf" },
      ],
      date: "2025-01-05",
      doctor: "Dr. Michael Chen",
    },
    {
      id: 3,
      files: [
        { name: "ecg_report.pdf", type: "pdf" },
        { name: "ecg_summary.docx", type: "docx" },
        { name: "heart_image.png", type: "image" },
      ],
      date: "2025-01-03",
      doctor: "Dr. Sarah Johnson",
      note: "The ECG indicates some irregular heartbeats. Schedule a follow-up appointment next week.",
    },
    {
      id: 4,
      files: [
        { name: "blood_test_results.pdf", type: "pdf" },
      ],
      date: "2025-01-08",
      doctor: "Dr. Sarah Johnson",
    },
  ];

  const displayedResults = showAllResults ? recentResults : recentResults.slice(0, 3);

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
                <p className="text-3xl font-bold text-gray-900">{recentResults.length}</p>
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
              {displayedResults.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-gray-600">{result.doctor}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {result.date}
                    </div>
                  </div>

                  {/* Files */}
                  <div className="space-y-2 mb-2">
                    {result.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between border p-2 rounded-md hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          {file.type === "pdf" && <FileText className="h-4 w-4 text-red-600" />}
                          {file.type === "image" && <img src="/sample-image.png" alt="" className="h-4 w-4 object-cover" />}
                          {file.type === "docx" && <FileText className="h-4 w-4 text-blue-600" />}
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-700">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-blue-600 hover:text-blue-700">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Notes */}
                  {result.note && openNoteId !== result.id && (
                    <button
                      onClick={() => setOpenNoteId(result.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <StickyNote className="h-4 w-4 mr-1" />
                      Additional Notes
                    </button>
                  )}

                  {openNoteId === result.id && (
                    <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3 relative">
                      <button
                        onClick={() => setOpenNoteId(null)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-sm text-gray-700">{result.note}</p>
                    </div>
                  )}
                </div>
              ))}
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
