import React, { useState } from "react";
import {
    Star,
    Send,
    CheckCircle,
    Heart,
    Image as ImageIcon,
    X,
} from "lucide-react";

export default function TestimonialForm({ onClose, lang = "En" }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        treatment: "",
        rating: 0,
        title: "",
        testimony: "",
        allowPublic: false,
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const t = {
        En: {
            title: "Share Your Story",
            thankYou: "Thank You!",
            submitted: "Your testimony has been submitted successfully.",
            name: "Full Name *",
            email: "Email Address *",
            phone: "Phone Number",
            treatment: "Treatment/Service *",
            selectTreatment: "Select treatment",
            rating: "Overall Rating *",
            testimonyTitle: "Testimony Title *",
            experience: "Your Experience *",
            upload: "Upload an Image (optional)",
            chooseFile: "Choose File",
            allow: "I allow this testimony to be published publicly",
            submit: "Submit Testimony",
        },
        Am: {
            title: "ታሪክዎን ያካፍሉ",
            thankYou: "አመሰግናለሁ!",
            submitted: "መልእክትዎ በተሳካ ሁኔታ ተልኳል።",
            name: "ሙሉ ስም *",
            email: "ኢሜይል አድራሻ *",
            phone: "ስልክ ቁጥር",
            treatment: "ሕክምና/አገልግሎት *",
            selectTreatment: "ሕክምና ይምረጡ",
            rating: "አጠቃላይ እውቅና *",
            testimonyTitle: "የመልእክት ርዕስ *",
            experience: "ተሞክሮዎ *",
            upload: "ምስል ይስቀሉ (አማራጭ)",
            chooseFile: "ፋይል ይምረጡ",
            allow: "ይህን መልእክት በበለጠ ለማሳየት እፈቅዳለሁ",
            submit: "መልእክት ያስገቡ",
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Testimony submitted:", formData);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                treatment: "",
                rating: 0,
                title: "",
                testimony: "",
                allowPublic: false,
                image: null,
            });
            setPreview(null);
            if (onClose) onClose();
        }, 3000);
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            const file = files[0];
            setFormData({ ...formData, image: file });
            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[95vh] p-6 sm:p-8">
                {/* close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <Heart className="h-7 w-7 text-orange-500 mr-2" />
                    {t[lang].title}
                </h2>

                {isSubmitted ? (
                    <div className="text-center py-12">
                        <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            {t[lang].thankYou}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {t[lang].submitted}
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* name & email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {t[lang].name}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {t[lang].email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* phone & treatment */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {t[lang].phone}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="treatment"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    {t[lang].treatment}
                                </label>
                                <select
                                    id="treatment"
                                    name="treatment"
                                    value={formData.treatment}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">
                                        {t[lang].selectTreatment}
                                    </option>
                                    <option value="cardiology">Cardiology</option>
                                    <option value="emergency">Emergency Care</option>
                                    <option value="general">General Medicine</option>
                                    <option value="neurology">Neurology</option>
                                    <option value="orthopedics">Orthopedics</option>
                                    <option value="pediatrics">Pediatrics</option>
                                    <option value="surgery">Surgery</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t[lang].rating}
                            </label>
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        className={`text-xl ${
                                            star <= formData.rating
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        } hover:text-yellow-400`}
                                    >
                                        <Star className="h-6 w-6 fill-current" />
                                    </button>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                    {formData.rating} / 5
                                </span>
                            </div>
                        </div>

                        {/* title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                {t[lang].testimonyTitle}
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* testimony */}
                        <div>
                            <label
                                htmlFor="testimony"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                {t[lang].experience}
                            </label>
                            <textarea
                                id="testimony"
                                name="testimony"
                                value={formData.testimony}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                            ></textarea>
                        </div>

                        {/* image upload */}
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700 mb-1 items-center"
                            >
                                <ImageIcon className="h-4 w-4 mr-1 text-blue-500" />
                                {t[lang].upload}
                            </label>

                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                            />

                            <label
                                htmlFor="image"
                                className="inline-block cursor-pointer bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                {t[lang].chooseFile}
                            </label>

                            {formData.image && (
                                <span className="ml-3 text-sm text-gray-600">
                                    {formData.image.name}
                                </span>
                            )}

                            {preview && (
                                <div className="mt-2">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>

                        {/* public checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="allowPublic"
                                name="allowPublic"
                                checked={formData.allowPublic}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="allowPublic"
                                className="ml-2 text-sm text-gray-700"
                            >
                                {t[lang].allow}
                            </label>
                        </div>

                        {/* submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center font-semibold transition"
                        >
                            <Send className="h-5 w-5 mr-2" />
                            {t[lang].submit}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
