import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  Clock,
  User,
  Bell,
  Download,
  Eye,
} from "lucide-react";
import Profile from "./profile";
// User Dashboard Component
const UserDashboard = () => {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2025-01-15",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Medicine",
      date: "2025-01-22",
      time: "2:00 PM",
      type: "Consultation",
      status: "Pending",
    },
  ];

  const recentResults = [
    {
      id: 1,
      test: "Blood Test - Complete Blood Count",
      date: "2025-01-08",
      doctor: "Dr. Sarah Johnson",
      status: "Available",
      priority: "Normal",
    },
    {
      id: 2,
      test: "Chest X-Ray",
      date: "2025-01-05",
      doctor: "Dr. Michael Chen",
      status: "Available",
      priority: "Normal",
    },
    {
      id: 3,
      test: "ECG Report",
      date: "2025-01-03",
      doctor: "Dr. Sarah Johnson",
      status: "Available",
      priority: "Attention Required",
    },
  ];

  const healthMetrics = [
    {
      label: "Total Appointments",
      value: "24",
      change: "+2 this month",
      color: "blue",
    },
    {
      label: "Pending Results",
      value: "0",
      change: "All reviewed",
      color: "green",
    },
    {
      label: "Next Appointment",
      value: "6 days",
      change: "Jan 15, 2025",
      color: "orange",
    },
    {
      label: "Health Score",
      value: "92%",
      change: "+5% improved",
      color: "purple",
    },
  ];

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
              {/* Profile section - clickable for navigation */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{metric.change}</p>
                </div>
                <div
                  className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}
                >
                  {metric.label.includes("Appointments") && (
                    <Calendar className={`h-6 w-6 text-${metric.color}-600`} />
                  )}
                  {metric.label.includes("Results") && (
                    <FileText className={`h-6 w-6 text-${metric.color}-600`} />
                  )}
                  {metric.label.includes("Next") && (
                    <Clock className={`h-6 w-6 text-${metric.color}-600`} />
                  )}
                  {metric.label.includes("Score") && (
                    <User className={`h-6 w-6 text-${metric.color}-600`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Upcoming Appointments
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {appointment.doctor}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {appointment.specialty}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {appointment.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Book New Appointment
              </button>
            </div>
          </div>

          {/* Recent Results */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Test Results
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentResults.map((result) => (
                  <div
                    key={result.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {result.test}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Dr. {result.doctor}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.priority === "Normal"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {result.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {result.date}
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
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Need to upload documents?
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Upload Medical Records
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">
                Book Appointment
              </p>
            </button>
            <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
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
