import React, { useState, useEffect } from "react";
import { User, Calendar, CheckCircle } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { doctorAPI } from "../services/doctorApi.js";
import { SEOHead } from '../components/SEO';
import { useSEO } from '../hooks/useSEO';
import { trackPageView, trackAppointmentBooking } from '../utils/analytics';

// Appointment service
const appointmentService = {
  createAppointment: async (appointmentData) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });
    return response.json();
  },
};

const translations = {
  En: {
    title: "Book Appointment",
    subtitle:
      "Schedule your visit with our expert medical team. We're here to provide you with the best healthcare experience.",
    steps: ["Personal Info", "Appointment", "Review"],
    personalInfo: "Personal Information",
    appointmentDetails: "Appointment Details",
    review: "Review",
    placeholders: {
      firstName: "Enter your first name",
      lastName: "Enter your last name",
      email: "Enter your email",
      phone: "Enter your phone number",
      age: "Enter your age",
      gender: "Select gender",
      doctor: "Preferred Doctor",
      date: "Preferred Date",
      time: "Preferred Time",
    },
    genderOptions: { Male: "Male", Female: "Female" },
    buttons: {
      next: "Next",
      previous: "Previous",
      confirm: "Confirm Appointment",
      bookAnother: "Book Another Appointment",
    },
    errors: {
      required: "Please fill",
      email: "Email must be a valid Gmail address",
    },
    reviewLabels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      age: "Age",
      gender: "Gender",
      doctor: "Doctor",
      date: "Preferred Date",
      time: "Preferred Time",
    },
    confirmedTitle: "Appointment Noted!",
    confirmedMessage:
      "Thank you for booking. We'll notify you by email if your requested time is available. Please check your inbox for updates. If you do not receive an email after submitting the appointment, please call +251963555552 / +251939602927 to confirm.",
  },
  Am: {
    title: "ቀጠሮ ይያዙ",
    subtitle:
      "ልምድ ካለው የሕክምና ቡድናችን ጋር ቀጠሮዎን ይያዙ። ምርጥ የጤና አገልግሎት እንዲያገኙ እኛ እንዘጋጃለን።",
    steps: ["የግል መረጃ", "ቀጠሮ", "እይታ"],
    personalInfo: "የግል መረጃ",
    appointmentDetails: "የቀጠሮ ዝርዝር",
    review: "እይታ",
    placeholders: {
      firstName: "ስምዎን ያስገቡ",
      lastName: "የአባት ስምዎን ያስገቡ",
      email: "ኢሜይልዎን ያስገቡ",
      phone: "ስልክ ቁጥርዎን ያስገቡ",
      age: "ዕድሜዎን ያስገቡ",
      gender: "ጾታ ይምረጡ",
      doctor: "የሚመርጡት ሐኪም",
      date: "የሚመርጡት ቀን",
      time: "የሚመርጡት ሰዓት",
    },
    genderOptions: { Male: "ወንድ", Female: "ሴት" },
    buttons: {
      next: "ቀጣይ",
      previous: "ወደ ኋላ",
      confirm: "ቀጠሮ ያረጋግጡ",
      bookAnother: "ሌላ ቀጠሮ ይያዙ",
    },
    errors: {
      required: "እባክዎን ይሙሉ",
      email: "ኢሜይል የትክክለኛ ጂሜል መሆን አለበት",
    },
    reviewLabels: {
      name: "ስም",
      email: "ኢሜይል",
      phone: "ስልክ",
      age: "ዕድሜ",
      gender: "ጾታ",
      doctor: "ሐኪም",
      date: "ቀን",
      time: "ሰዓት",
    },
    confirmedTitle: "ቀጠሮ ተመዝግቧል!",
    confirmedMessage:
      "ስለ መግዛትዎ እናመሰግናለን። የተመዘገበው ሰዓት ነጻ ከሆነ በኢሜይል እናሳውቅዎታለን። እባክዎን የኢሜይል ሳጥንዎን ያረጋግጡ። ቀጠሮ ካስገቡ በኋላ ኢሜይል ካላገኙ እባክዎን +251963555552 / +251939602927 ደውለው ያረጋግጡ።"
  },
};

const AppointmentPage = ({ lang = "En" }) => {
  const t = translations[lang];
  const currentLang = lang === 'Am' ? 'am' : 'en';
  
  useSEO('appointments', {}, currentLang);
  
  useEffect(() => {
    trackPageView(window.location.href, document.title);
  }, []);

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Fetch doctors from database
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const response = await doctorAPI.getDoctors('', 1, 100); // Get all doctors
        const doctorNames = response.data.map(doctor => 
          lang === "Am" ? (doctor.nameAmh || doctor.name) : doctor.name
        );
        setDoctors(doctorNames);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Fallback to hardcoded doctors if API fails
        setDoctors(lang === "Am" 
          ? ["ዶ/ር ፋሲል መንበረ", "ዶ/ር ክንዱ"] 
          : ["Dr. Fasil Menbere", "Dr. Kindu"]
        );
      } finally {
        setLoadingDoctors(false);
      }
    };
    
    fetchDoctors();
  }, [lang]);
  
  const times = lang === "Am" 
    ? ["3:00 ጥዋት", "4:00 ጥዋት", "5:00 ጥዋት", "7:00 ከሰዓት", "8:00 ከሰዓት", "9:00 ከሰዓት"] 
    : ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 AM", "02:00 AM", "03:00 AM"];

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
      ["firstName", "lastName", "email", "phone", "age", "gender"].forEach(
        (field) => {
          if (!formData[field])
            stepErrors[field] = `${t.errors.required} ${t.placeholders[field]}`;
        }
      );
      if (formData.email && !formData.email.includes("@gmail.com")) {
        stepErrors.email = t.errors.email;
      }
    }
    if (step === 2) {
      ["doctor", "date", "time"].forEach((field) => {
        if (!formData[field])
          stepErrors[field] = `${t.errors.required} ${t.placeholders[field]}`;
      });
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  // Add this function to handle form submission
  const prepareAppointmentData = () => {
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    return {
      ...formData,
      appointmentDate: formData.date, // preferred date
      appointmentTime: formData.time, // preferred time
      createdAt: currentDate, // current date when appointment was made
      // To keep the original date field for backward compatibility
      date: formData.date,
    };
  };

  const confirmAppointment = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      try {
        const appointmentData = prepareAppointmentData();
        const result = await appointmentService.createAppointment(
          appointmentData
        );

        if (result.success) {
          setConfirmed(true);
          trackAppointmentBooking(formData.doctor, formData.date, currentLang);
        } else {
          alert("Failed to book appointment. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting appointment:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
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
            {value || label}
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `cursor-pointer select-none relative p-3 ${
                    active ? "bg-[#007799] text-white" : "text-gray-800"
                  }`
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
    <>
      <SEOHead 
        title={currentLang === 'am' ? 'የህፃናት ቀጠሮ በመስመር ላይ ያስይዙ | ብሩህኪድስ ክሊኒክ አዲስ አበባ' : 'Book Pediatric Appointment Online | BiruhKids Clinic Addis Ababa'}
        description={currentLang === 'am' ? 'በብሩህኪድስ የህፃናት ክሊኒክ የልጅዎን ቀጠሮ በመስመር ላይ ያስይዙ። በአዲስ አበባ፣ ኢትዮጵያ ካሉ የባለሙያ የህፃናት ዶክተሮች ጋር ቀላል የመስመር ላይ ቀጠሮ።' : 'Book your child\'s appointment online at BiruhKids Pediatric Clinic. Easy online scheduling with expert pediatricians in Addis Ababa, Ethiopia.'}
        keywords={currentLang === 'am' ? 'ቀጠሮ ማስያዝ, የመስመር ላይ ቀጠሮ, የህፃናት ቀጠሮ, ብሩህኪድስ ቀጠሮ, አዲስ አበባ የህፃናት ቀጠሮ' : 'book appointment, online appointment, pediatric appointment, BiruhKids booking, Addis Ababa pediatric appointment'}
        lang={currentLang}
      />
      <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Intro Section */}
      <div className="bg-blue-500 text-white text-center py-12 w-full">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto px-4">
          {t.subtitle}
        </p>
      </div>

      {/* Steps + Form */}
      <div className="flex flex-col items-center py-10 px-4 flex-grow w-full">
        {/* Progress Steps */}
        <div className="flex items-center mb-10 space-x-2 sm:space-x-4 flex-wrap justify-center">
          {t.steps.map((label, index) => {
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
                    className={`w-10 sm:w-16 h-1 ${
                      step > current ? "bg-[#007799]" : "bg-gray-300"
                    }`}
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
                  <SectionHeader
                    icon={<User className="w-6 h-6 text-[#007799]" />}
                    title={t.personalInfo}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      "firstName",
                      "lastName",
                      "email",
                      "phone",
                      "age",
                      "gender",
                    ].map((field) => (
                      <div key={field}>
                        <label className="block mb-1 font-medium">
                          {t.placeholders[field]} *
                        </label>
                        {field !== "gender" ? (
                          <input
                            name={field}
                            type={
                              field === "age"
                                ? "number"
                                : field === "email"
                                ? "email"
                                : "text"
                            }
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={t.placeholders[field]}
                            className={`w-full border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-[#007799] focus:outline-none transition ${
                              errors[field]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                        ) : (
                          <select
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className={`w-full border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-[#007799] focus:outline-none transition ${
                              errors[field]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">{t.placeholders.gender}</option>
                            <option value="Male">{t.genderOptions.Male}</option>
                            <option value="Female">
                              {t.genderOptions.Female}
                            </option>
                          </select>
                        )}
                        {errors[field] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={nextStep}
                    className="mt-6 w-full sm:w-auto bg-[#007799] text-white px-6 py-3 rounded-xl text-lg shadow hover:shadow-lg transition"
                  >
                    {t.buttons.next}
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <SectionHeader
                    icon={<Calendar className="w-6 h-6 text-[#007799]" />}
                    title={t.appointmentDetails}
                  />
                  <div className="grid gap-6">
                    <CustomDropdown
                      label={t.placeholders.doctor}
                      options={loadingDoctors ? ['Loading doctors...'] : doctors}
                      value={formData.doctor}
                      setValue={(val) => {
                        if (!loadingDoctors && val !== 'Loading doctors...') {
                          setFormData({ ...formData, doctor: val });
                        }
                      }}
                      error={errors.doctor}
                    />
                    <div>
                      <label className="block mb-1 font-medium">
                        {t.placeholders.date} *
                      </label>
                      <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-[#007799] focus:outline-none transition ${
                          errors.date ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>
                    <CustomDropdown
                      label={t.placeholders.time}
                      options={times}
                      value={formData.time}
                      setValue={(val) =>
                        setFormData({ ...formData, time: val })
                      }
                      error={errors.time}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4 sm:gap-0">
                    <button
                      onClick={prevStep}
                      className="bg-gray-400 text-white px-6 py-3 rounded-xl text-lg w-full sm:w-auto shadow hover:shadow-lg transition"
                    >
                      {t.buttons.previous}
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-[#007799] text-white px-6 py-3 rounded-xl text-lg w-full sm:w-auto shadow hover:shadow-lg transition"
                    >
                      {t.buttons.next}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="relative">
                  <SectionHeader
                    icon={<CheckCircle className="w-6 h-6 text-[#007799]" />}
                    title={t.review}
                  />
                  <ul className="space-y-3 text-gray-700 text-lg mt-6">
                    <li>
                      <strong>{t.reviewLabels.name}:</strong>{" "}
                      {formData.firstName} {formData.lastName}
                    </li>
                    <li>
                      <strong>{t.reviewLabels.email}:</strong> {formData.email}
                    </li>
                    <li>
                      <strong>{t.reviewLabels.phone}:</strong> {formData.phone}
                    </li>
                    <li>
                      <strong>{t.reviewLabels.age}:</strong> {formData.age}
                    </li>
                    <li>
                      <strong>{t.reviewLabels.gender}:</strong>{" "}
                      {formData.gender}
                    </li>
                    <li>
                      <strong>{t.reviewLabels.doctor}:</strong>{" "}
                      {formData.doctor}
                    </li>
                    <li>
                      <strong>{t.reviewLabels.date}:</strong> {formData.date}
                    </li>
                    <li>
                      <strong>{t.reviewLabels.time}:</strong> {formData.time}
                    </li>
                  </ul>
                  <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4 sm:gap-0">
                    <button
                      onClick={prevStep}
                      className="bg-gray-400 text-white px-6 py-3 rounded-xl text-lg w-full sm:w-auto shadow hover:shadow-lg transition"
                    >
                      {t.buttons.previous}
                    </button>
                    <button
                      onClick={confirmAppointment}
                      disabled={isSubmitting}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg w-full sm:w-auto shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : t.buttons.confirm}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 flex flex-col items-center relative">
              <CheckCircle className="w-16 h-16 text-green-600 mb-4 animate-pulse" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t.confirmedTitle}
              </h2>
              <p className="mb-8 text-lg sm:text-xl">{t.confirmedMessage}</p>

              <button
                onClick={resetForm}
                className="bg-[#007799] text-white px-8 py-3 rounded-xl text-lg shadow hover:shadow-lg transition"
              >
                {t.buttons.bookAnother}
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default AppointmentPage;