import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  User,
  Bell,
  Download,
  Eye,
  StickyNote,
  X,
} from "lucide-react";

const UserDashboard = () => {
  const [showAllResults, setShowAllResults] = useState(false);
  const [openNoteId, setOpenNoteId] = useState(null);

  const recentResults = [
    {
      id: 1,
      fileName: "blood_test_results.pdf",
      date: "2025-01-08",
      doctor: "Dr. Sarah Johnson",
      note: "Your hemoglobin levels are slightly below normal. Please eat iron-rich foods and repeat the test in 2 months.",
    },
    {
      id: 2,
      fileName: "chest_xray_report.pdf",
      date: "2025-01-05",
      doctor: "Dr. Michael Chen",
    },
    {
      id: 3,
      fileName: "ecg_report.pdf",
      date: "2025-01-03",
      doctor: "Dr. Sarah Johnson",
      note: "The ECG indicates some irregular heartbeats. Schedule a follow-up appointment next week.",
    },
    {
      id: 4,
      fileName: "ultrasound_report.pdf",
      date: "2024-12-28",
      doctor: "Dr. Emily Carter",
    },
    {
      id: 5,
      fileName: "liver_function_test.pdf",
      date: "2024-12-20",
      doctor: "Dr. Michael Chen",
    },
    {
      id: 6,
      fileName: "mri_scan.pdf",
      date: "2024-12-10",
      doctor: "Dr. Sarah Johnson",
    },
  ];

  const displayedResults = showAllResults
    ? recentResults
    : recentResults.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, John!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your health dashboard overview
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <Link
                to="/profile"
                className="flex items-center space-x-3 cursor-pointer"
              >
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-600">Patient</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Total Results Card */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Results
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {recentResults.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1">
          {/* Recent Results */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Test Results
                </h2>
                <button
                  onClick={() => setShowAllResults(!showAllResults)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {showAllResults ? "Show Less" : "View All"}
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {displayedResults.map((result) => (
                  <div
                    key={result.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {result.fileName}
                        </h3>
                        <p className="text-sm text-gray-600">{result.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {result.date}
                      </div>
                      <div className="flex space-x-3 items-center">
                        <button className="p-1 text-blue-600 hover:text-blue-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-blue-600 hover:text-blue-700">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
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
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowAllResults(true)}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
            >
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">View Results</p>
            </button>
            <Link
              to="/profile"
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
            >
              <User className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">
                Update Profile
              </p>
            </Link>
            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <Bell className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Notifications</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
