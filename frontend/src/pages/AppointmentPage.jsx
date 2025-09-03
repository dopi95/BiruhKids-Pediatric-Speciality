// src/pages/AppointmentPage.jsx
import React, { useState } from "react";
import { User, Calendar, CheckCircle } from "lucide-react";
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from "lucide-react";

const AppointmentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    doctor: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown"];
  const times = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "phone") {
      value = value.replace(/\D/g, ""); // only numbers
    }
    setFormData({ ...formData, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateStep = () => {
    let stepErrors = {};
    if (step === 1) {
      ["firstName", "lastName", "email", "phone", "age", "gender"].forEach(field => {
        if (!formData[field]) stepErrors[field] = `Please fill ${field.replace(/([A-Z])/g, ' $1')}`;
      });
      if (formData.email && !formData.email.includes("@gmail.com")) {
        stepErrors.email = "Email must be a valid Gmail address";
      }
    }
    if (step === 2) {
      ["doctor", "date", "time"].forEach(field => {
        if (!formData[field]) stepErrors[field] = `Please fill ${field.replace(/([A-Z])/g, ' $1')}`;
      });
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };
  const prevStep = () => setStep(prev => prev - 1);
  const confirmAppointment = () => {
    if (validateStep()) setConfirmed(true);
  };
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      doctor: "",
      date: "",
      time: "",
    });
    setErrors({});
    setStep(1);
    setConfirmed(false);
  };

  const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center mb-6 space-x-3 relative">
      {icon}
      <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
    </div>
  );

  const CustomDropdown = ({ label, options, value, setValue, error }) => (
    <div>
      <label className="block mb-1 font-medium">{label} *</label>
      <Listbox value={value} onChange={setValue}>
        <div className="relative">
          <Listbox.Button
            className={`w-full border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-[#007799] focus:outline-none text-left flex justify-between items-center ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            {value || `Select ${label}`}
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `cursor-pointer select-none relative p-3 ${active ? "bg-[#007799] text-white" : "text-gray-800"}`
                }
              >
                {({ selected }) => (
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {selected && <Check className="w-5 h-5" />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Intro Section */}
      <div className="bg-[#007799] text-white text-center py-12 w-full">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Book Appointment</h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
          Schedule your visit with our expert medical team. We're here to provide
          you with the best healthcare experience.
        </p>
      </div>

      {/* Steps + Form */}
      <div className="flex flex-col items-center py-10 px-4 flex-grow w-full">
        {/* Progress Steps */}
        <div className="flex items-center mb-10 space-x-2 sm:space-x-4 flex-wrap justify-center">
          {["Personal Info", "Appointment", "Review"].map((label, index) => {
            const current = index + 1;
            return (
              <div key={label} className="flex items-center">
                <div
                  className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    step >= current
                      ? "bg-[#007799] text-white shadow-md"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {current}
                </div>
                {current < 3 && (
                  <div
                    className={`w-10 sm:w-16 h-1 ${step > current ? "bg-[#007799]" : "bg-gray-300"}`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white text-black rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-3xl relative border border-gray-200">
          {!confirmed ? (
            <>
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <SectionHeader icon={<User className="w-6 h-6 text-[#007799]" />} title="Personal Information" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {["firstName", "lastName", "email", "phone", "age", "gender"].map((field) => (
                      <div key={field}>
                        <label className="block mb-1 font-medium">{field.replace(/([A-Z])/g, ' $1')} *</label>
                        {field !== "gender" ? (
                          <input
                            name={field}
                            type={
                              field === "age" ? "number" :
                              field === "email" ? "email" :
                              "text"
                            }
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={`Enter your ${field}`}
                            className={`w-full border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-[#007799] focus:outline-none transition ${
                              errors[field] ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        ) : (
                          <select
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className={`w-full border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-[#007799] focus:outline-none transition ${
                              errors[field] ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        )}
                        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={nextStep}
                    className="mt-6 w-full sm:w-auto bg-[#007799] text-white px-6 py-3 rounded-xl text-lg shadow hover:shadow-lg transition"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <SectionHeader icon={<Calendar className="w-6 h-6 text-[#007799]" />} title="Appointment Details" />
                  <div className="grid gap-6">
                    <CustomDropdown
                      label="Preferred Doctor"
                      options={doctors}
                      value={formData.doctor}
                      setValue={(val) => setFormData({ ...formData, doctor: val })}
                      error={errors.doctor}
                    />
                    <div>
                      <label className="block mb-1 font-medium">Preferred Date *</label>
                      <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-[#007799] focus:outline-none transition ${errors.date ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>
                    <CustomDropdown
                      label="Preferred Time"
                      options={times}
                      value={formData.time}
                      setValue={(val) => setFormData({ ...formData, time: val })}
                      error={errors.time}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4 sm:gap-0">
                    <button
                      onClick={prevStep}
                      className="bg-gray-400 text-white px-6 py-3 rounded-xl text-lg w-full sm:w-auto shadow hover:shadow-lg transition"
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-[#007799] text-white px-6 py-3 rounded-xl text-lg w-full sm:w-auto shadow hover:shadow-lg transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="relative">
                  <SectionHeader icon={<CheckCircle className="w-6 h-6 text-[#007799]" />} title="Review" />
                  <ul className="space-y-3 text-gray-700 text-lg mt-6">
                    <li><strong>Name:</strong> {formData.firstName} {formData.lastName}</li>
                    <li><strong>Email:</strong> {formData.email}</li>
                    <li><strong>Phone:</strong> {formData.phone}</li>
                    <li><strong>Age:</strong> {formData.age}</li>
                    <li><strong>Gender:</strong> {formData.gender}</li>
                    <li><strong>Doctor:</strong> {formData.doctor}</li>
                    <li><strong>Date:</strong> {formData.date}</li>
                    <li><strong>Time:</strong> {formData.time}</li>
                  </ul>
                  <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4 sm:gap-0">
                    <button
                      onClick={prevStep}
                      className="bg-gray-400 text-white px-6 py-3 rounded-xl text-lg w-full sm:w-auto shadow hover:shadow-lg transition"
                    >
                      Previous
                    </button>
                    <button
                      onClick={confirmAppointment}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg w-full sm:w-auto shadow hover:shadow-lg transition"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 flex flex-col items-center relative">
              <CheckCircle className="w-16 h-16 text-green-600 mb-4 animate-pulse" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Appointment Booked!</h2>
              <p className="mb-8 text-lg sm:text-xl">
                             Thank you for booking your appointment. Please note that your requested time
                             is subject to availability. We will notify you by email shortly to confirm
                             whether your appointment has been secured. Kindly check your inbox for
                             updates.
              </p>
              <button
                onClick={resetForm}
                className="bg-[#007799] text-white px-8 py-3 rounded-xl text-lg shadow hover:shadow-lg transition"
              >
                Book Another Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
