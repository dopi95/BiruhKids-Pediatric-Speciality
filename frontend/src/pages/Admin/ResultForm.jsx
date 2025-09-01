import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, ArrowLeft, Send, Mail } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

const ResultForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    testDate: todayDate,
    resultFile: null,
    notes: '',
    priority: 'Normal',
    notifyByEmail: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Prefill from query (phone and id for update)
  useEffect(() => {
    const phone = searchParams.get('phone');
    const id = searchParams.get('id');

    if (phone) {
      setFormData(prev => ({ ...prev, phoneNumber: phone }));
    }

    if (id) {
      setIsUpdateMode(true);
      // Fetch existing result for update
      fetch(`/api/results/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            patientName: data.patientName || '',
            phoneNumber: data.phoneNumber || '',
            email: data.email || '',
            testDate: data.testDate || todayDate,
            resultFile: null, // user can re-upload if needed
            notes: data.notes || '',
            priority: data.priority || 'Normal',
            notifyByEmail: data.notifyByEmail || false,
          });
        })
        .catch(err => console.error("Error fetching result:", err));
    }
  }, [searchParams]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resultFile: file }));
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = [];
    if (!formData.patientName.trim()) validationErrors.push('Patient name is required');
    if (!formData.phoneNumber.trim()) validationErrors.push('Phone number is required');
    if (!formData.testDate) validationErrors.push('Test date is required');
    if (!isUpdateMode && !formData.resultFile) validationErrors.push('Result file is required');
    if (!formData.email.trim()) validationErrors.push('Email is required');

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    // Example: send to backend
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    });

    const id = searchParams.get('id');
    const url = isUpdateMode ? `/api/results/${id}` : "/api/results";
    const method = isUpdateMode ? "PUT" : "POST";

    fetch(url, {
      method,
      body: payload,
    })
      .then(res => res.json())
      .then(data => {
        console.log("Result submitted:", data);
        setIsSubmitted(true);
        setTimeout(() => {
          navigate('/admin/results');
        }, 3000);
      })
      .catch(err => {
        console.error("Error submitting result:", err);
      });
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen bg-gray-50 ">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
            <CheckCircle className="h-14 w-14 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {isUpdateMode ? "Result Updated Successfully!" : "Result Sent Successfully!"}
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              {isUpdateMode
                ? "The test result has been updated successfully."
                : "The test result has been uploaded and sent to the patient."}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left space-y-2">
              <p><strong>Patient:</strong> {formData.patientName}</p>
              <p><strong>Phone:</strong> {formData.phoneNumber}</p>
              <p><strong>Date:</strong> {formData.testDate}</p>
              <p><strong>Email:</strong> {formData.email}</p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Redirecting to Result Management...
            </p>
            <button
              onClick={() => navigate('/admin/results')}
              className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
            >
              Return to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm border-b mt-14 md:mt-0">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => navigate('/admin/results')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {isUpdateMode ? "Update Test Result" : "Upload Test Result"}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {isUpdateMode ? "Edit and save the test result" : "Send test results to patient"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="max-w-full sm:max-w-4xl mx-auto">
            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="mb-6 sm:mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2 sm:mr-3" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Patient Information</h2>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* Patient Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                      placeholder="Enter patient name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                      placeholder="+251 11 123 4567"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 text-sm sm:text-base"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      id="notifyByEmail"
                      name="notifyByEmail"
                      checked={formData.notifyByEmail}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="notifyByEmail" className="ml-2  text-sm text-gray-700 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-blue-500" /> Notify Patient by Email
                    </label>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="Date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="Date"
                    name="Date"
                    value={formData.testDate}
                    readOnly
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 text-sm sm:text-base"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label htmlFor="resultFile" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Result File {isUpdateMode ? "(leave empty to keep existing)" : "*"}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-500 transition-colors duration-200">
                    <input
                      type="file"
                      id="resultFile"
                      name="resultFile"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      {...(!isUpdateMode && { required: true })}
                    />
                    <label htmlFor="resultFile" className="cursor-pointer">
                      <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm sm:text-lg font-medium text-gray-900 mb-2">
                        {formData.resultFile ? formData.resultFile.name : 'Click to upload file'}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Supported formats: PDF, JPG, PNG, DOC, DOCX (Max: 10MB)
                      </p>
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none text-sm sm:text-base"
                    placeholder="Enter any additional notes..."
                  ></textarea>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate('/admin/results')}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isUpdateMode ? "Save Changes" : "Send Result to Patient"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultForm;
