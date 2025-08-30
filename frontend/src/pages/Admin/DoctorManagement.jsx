import React, { useState } from "react";
import { Plus, Edit, Trash2, AlertTriangle, Upload } from "lucide-react";

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Biruh",
      field: "Pediatrics",
      experience: "10 years",
      email: "biruh@example.com",
      photo: null,
    },
    {
      id: 2,
      name: "Dr. Dagi",
      field: "Operation",
      experience: "15 years",
      email: "dagi@example.com",
      photo: null,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    field: "",
    experience: "",
    email: "",
    photo: null,
  });

  const openModal = (doctor = null) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData(doctor);
    } else {
      setEditingDoctor(null);
      setFormData({
        name: "",
        field: "",
        experience: "",
        email: "",
        photo: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") setFormData({ ...formData, photo: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDoctor) {
      setDoctors(
        doctors.map((doc) =>
          doc.id === editingDoctor.id ? { ...formData, id: doc.id } : doc
        )
      );
    } else {
      // Add new doctor at the top
      setDoctors([{ ...formData, id: Date.now() }, ...doctors]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (doctor) => {
    setDoctorToDelete(doctor);
    setIsDeleteModalOpen(true);
  };
  const handleDelete = () => {
    setDoctors(doctors.filter((doc) => doc.id !== doctorToDelete.id));
    setDoctorToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Doctor Management
              </h1>
              <p>Adding and Deleting Doctor's</p>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Admin
            </button>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Total Doctors</h2>
            <p className="text-2xl font-bold">{doctors.length}</p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-xl">
            👨‍⚕️
          </div>
        </div>
      </div>

      {/* Table Title */}
      <div className="flex items-center mb-4 gap-2">
        <span className="text-2xl">👨‍⚕️</span>
        <h3 className="text-xl font-semibold">All Doctors</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50 text-left">
              <th className="p-2 sm:p-3 border">Doctor</th>
              <th className="p-2 sm:p-3 border">Field</th>
              <th className="p-2 sm:p-3 border">Experience</th>
              <th className="p-2 sm:p-3 border">Email</th>
              <th className="p-2 sm:p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No doctors found.
                </td>
              </tr>
            )}
            {doctors.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="p-2 sm:p-3 border flex items-center space-x-2">
                  <span className="text-blue-600 text-lg">👨‍⚕️</span>
                  <span>{doc.name}</span>
                </td>
                <td className="p-2 sm:p-3 border">{doc.field}</td>
                <td className="p-2 sm:p-3 border">{doc.experience}</td>
                <td className="p-2 sm:p-3 border">{doc.email}</td>
                <td className="p-2 sm:p-3 border flex space-x-2">
                  <button
                    onClick={() => openModal(doc)}
                    className="text-green-600 hover:text-green-900 p-1 sm:p-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => confirmDelete(doc)}
                    className="text-red-600 hover:text-red-900 p-1 sm:p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-full sm:max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-semibold mb-4">
              {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Field *</label>
                <input
                  type="text"
                  name="field"
                  placeholder="Enter field"
                  value={formData.field}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Experience *</label>
                <input
                  type="text"
                  name="experience"
                  placeholder="Years of experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col space-y-2">
                <label className="text-sm font-medium">Photo</label>
                <label className="flex items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
                  <Upload className="w-6 h-6 text-gray-500 mr-2" />
                  <span className="text-gray-500">
                    {formData.photo
                      ? formData.photo.name
                      : "Upload Doctor Photo"}
                  </span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingDoctor ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && doctorToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full text-center shadow-lg">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              Do you really want to delete{" "}
              <span className="font-semibold">{doctorToDelete.name}</span>?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
