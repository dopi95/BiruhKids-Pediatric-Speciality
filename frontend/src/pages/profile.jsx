import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Key,
  User,
  Calendar,
} from "lucide-react";
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+251 11 123 4567",
    address: "Bole Road, Addis Ababa, Ethiopia",
    dateOfBirth: "1990-05-15",
    gender: "male",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+251 11 987 6543",
    occupation: "Software Engineer",
    insuranceProvider: "Ethiopian Insurance Corporation",
    policyNumber: "EIC123456789",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for profile update logic
    console.log("Profile updated:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "+251 11 123 4567",
      address: "Bole Road, Addis Ababa, Ethiopia",
      dateOfBirth: "1990-05-15",
      gender: "male",
      emergencyContact: "Jane Doe",
      emergencyPhone: "+251 11 987 6543",
      occupation: "Software Engineer",
      insuranceProvider: "Ethiopian Insurance Corporation",
      policyNumber: "EIC123456789",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Profile Settings
                </h1>
                <p className="text-gray-600">
                  Manage your account information and preferences
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/change-password"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Link>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-sm rounded-lg">
            {/* Personal Information */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                      isEditing
                        ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50"
                    } transition-colors duration-200`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                      isEditing
                        ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50"
                    } transition-colors duration-200`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                        isEditing
                          ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          : "bg-gray-50"
                      } transition-colors duration-200`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                        isEditing
                          ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          : "bg-gray-50"
                      } transition-colors duration-200`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                        isEditing
                          ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          : "bg-gray-50"
                      } transition-colors duration-200`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                      isEditing
                        ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50"
                    } transition-colors duration-200`}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${
                        isEditing
                          ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          : "bg-gray-50"
                      } transition-colors duration-200`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="occupation"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                      isEditing
                        ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50"
                    } transition-colors duration-200`}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Emergency Contact
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="emergencyContact"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                      isEditing
                        ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50"
                    } transition-colors duration-200`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="emergencyPhone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                      isEditing
                        ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50"
                    } transition-colors duration-200`}
                  />
                </div>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Insurance Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="insuranceProvider"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    id="insuranceProvider"
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                      isEditing
                        ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50"
                    } transition-colors duration-200`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="policyNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Policy Number
                  </label>
                  <input
                    type="text"
                    id="policyNumber"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                      isEditing
                        ? "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50"
                    } transition-colors duration-200`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="mt-8 bg-white shadow-sm rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Account Actions
              </h2>

              <div className="space-y-4">
                <Link
                  to="/change-password"
                  className="block w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                >
                  Change Password
                </Link>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <button
                    type="button"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;
