import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, ArrowLeft, Send, X } from "lucide-react";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Result sent to patient:", formData);

            setSuccessMessage(
                `Result(s) sent to ${formData.patientName} successfully!`
            );
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

            // ✅ Clear file input manually (after sending)
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // Hide success after 3s
            setTimeout(() => {
                setSubmitted(false);
                setSuccessMessage("");
            }, 3000);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Main content */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Upload Patient Result
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow rounded-xl p-4 sm:p-6 lg:p-8 space-y-4"
                >
                    {/* Patient Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Patient Name
                        </label>
                        <input
                            type="text"
                            name="patientName"
                            value=""
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
                        <label className="block text-sm font-medium mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value=""
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
                        <label className="block text-sm font-medium mb-1">
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

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Date
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
                        <label className="block text-sm font-medium mb-1">
                            Upload Result(s)
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
                            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                                {formData.resultFiles.map((file, idx) => (
                                    <li key={idx}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Doctor Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
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

                    {/* Additional Notes */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Additional Notes
                        </label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-3 py-2 border rounded-lg text-sm sm:text-base border-gray-300"
                        />
                    </div>

                    {/* ✅ Success message */}
                    {submitted && (
                        <div className="flex items-center justify-center mb-4 text-green-600 font-medium bg-green-50 border border-green-200 rounded-lg p-3">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {successMessage}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
                        >
                            <Send className="w-5 h-5 mr-2" />
                            Send Result to Patient
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
