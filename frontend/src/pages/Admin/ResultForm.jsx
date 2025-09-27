import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, ArrowLeft, Send, X } from "lucide-react";
import resultService from "../../services/resultService.js";
import { toast } from "react-toastify";

const ResultForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef(null);

    const todayDate = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        patientName: "",
        doctorName: "",
        phoneNumber: "",
        email: "",
        testDate: todayDate,
        resultFiles: [], // ✅ multiple files
        notifyByEmail: false,
        additionalNotes: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Prefill from query params + patient passed via state
    useEffect(() => {
        const patientName = searchParams.get("patientName") || "";
        const patient = location.state?.patient || null;

        setFormData((prev) => ({
            ...prev,
            patientName: patient?.name || patientName,
            email: patient?.email || prev.email,
            phoneNumber: patient?.phone || prev.phoneNumber,
        }));
    }, [searchParams, location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        // Prevent non-numeric input for phone number
        if (name === "phoneNumber" && /[^0-9]/.test(value)) return;

        if (name === "resultFiles" && files) {
            // ✅ Append new files to existing files
            setFormData((prev) => ({
                ...prev,
                resultFiles: [...prev.resultFiles, ...Array.from(files)],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]:
                    type === "checkbox"
                        ? checked
                        : files
                        ? Array.from(files)
                        : value,
            }));
        }
    };

    const removeFile = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            resultFiles: prev.resultFiles.filter((_, index) => index !== indexToRemove),
        }));
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.patientName)
            newErrors.patientName = "Patient name is required";
        if (!formData.doctorName)
            newErrors.doctorName = "Doctor name is required";
        if (!formData.phoneNumber)
            newErrors.phoneNumber = "Phone number is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.testDate) newErrors.testDate = "Test date is required";
        if (!formData.resultFiles.length)
            newErrors.resultFiles = "At least one result file is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                await resultService.createResult(formData);
                
                const successMsg = `Result(s) sent to ${formData.patientName} successfully! Email notification sent.`;
                setSuccessMessage(successMsg);
                toast.success(successMsg);
                setSubmitted(true);

                // Reset form fields
                setFormData({
                    patientName: "",
                    doctorName: "",
                    phoneNumber: "",
                    email: "",
                    testDate: todayDate,
                    resultFiles: [],
                    notifyByEmail: false,
                    additionalNotes: "",
                });

                // Clear file input manually
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

                // Hide success after 3s
                setTimeout(() => {
                    setSubmitted(false);
                    setSuccessMessage("");
                }, 3000);
            } catch (error) {
                console.error("Error sending result:", error);
                const errorMessage = error.response?.data?.message || "Failed to send result";
                setErrors({ submit: errorMessage });
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 pt-14 xl:pt-0">
            {/* Main content */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                    Upload Patient Result
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow rounded-xl p-4 sm:p-6 lg:p-8 space-y-6"
                >
                    {/* Patient Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Patient Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Patient Name
                            </label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base ${
                                    errors.patientName
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.patientName && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.patientName}
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base ${
                                    errors.phoneNumber
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Doctor Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Doctor Name
                            </label>
                            <input
                                type="text"
                                name="doctorName"
                                value={formData.doctorName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base ${
                                    errors.doctorName
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.doctorName && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.doctorName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="md:w-1/2">
                        <label className="block text-sm font-medium mb-2">
                            Test Date
                        </label>
                        <input
                            type="date"
                            name="testDate"
                            value={formData.testDate}
                            readOnly
                            className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base bg-gray-100 text-gray-600 ${
                                errors.testDate
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    {/* Result Files */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Upload Result Files
                        </label>
                        <input
                            type="file"
                            name="resultFiles"
                            ref={fileInputRef}
                            onChange={handleChange}
                            multiple // ✅ allow multiple files
                            className={`w-full text-sm sm:text-base ${
                                errors.resultFiles ? "border-red-500" : ""
                            }`}
                        />
                        {errors.resultFiles && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.resultFiles}
                            </p>
                        )}

                        {/* Preview selected files */}
                        {formData.resultFiles.length > 0 && (
                            <div className="mt-2 space-y-2">
                                {formData.resultFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                        <span className="text-sm text-gray-700">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(idx)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            title="Remove file"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>



                    {/* Additional Notes */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-3 py-2 border rounded-lg text-sm sm:text-base border-gray-300"
                        />
                    </div>

                    {/* Success message */}
                    {submitted && (
                        <div className="flex items-center justify-center mb-4 text-green-600 font-medium bg-green-50 border border-green-200 rounded-lg p-3">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {successMessage}
                        </div>
                    )}

                    {/* Error message */}
                    {errors.submit && (
                        <div className="mb-4 text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg p-3">
                            {errors.submit}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
                        >
                            <Send className="w-5 h-5 mr-2" />
                            {loading ? "Sending..." : "Send Result to Patient"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
                        >
                            <X className="w-5 h-5 mr-2" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResultForm;
