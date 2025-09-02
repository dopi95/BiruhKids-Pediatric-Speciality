import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import GoogleMap from "../components/GoogleMap";

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [buttonShake, setButtonShake] = useState(false);
    const [success, setSuccess] = useState(false);

    // Telegram bot config
    const botToken = "7622120987:AAECTaQR0ZoWfOAxLbW6SeKtWJjeiuf2Afk";
    const chatId = "2120123278";

    // validation
    const validate = () => {
        let newErrors = {};
        if (!form.name.trim()) newErrors.name = "Please fill your full name";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = "Please enter a valid email";
        if (!form.phone.trim())
            newErrors.phone = "Please enter a valid phone number";
        if (!form.message.trim())
            newErrors.message = "Please write your message";
        return newErrors;
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Only allow numbers for phone field
        if (name === "phone") {
            const numericValue = value.replace(/[^0-9]/g, ""); // remove non-digit
            setForm({ ...form, [name]: numericValue });
            setErrors({ ...errors, [name]: "" });
        } else {
            setForm({ ...form, [name]: value });
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setButtonShake(true);
            setTimeout(() => setButtonShake(false), 500);
            return;
        }

        const textMessage = `
*New Contact Form Submission*
-------------------------
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Subject: ${form.subject || "N/A"}
Message: ${form.message}
    `;

        try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: textMessage,
                    parse_mode: "Markdown",
                }),
            });

            setSuccess(true);
            setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
            setTimeout(() => setSuccess(false), 7000);
        } catch (err) {
            alert("Something went wrong sending message to Telegram.");
        }
    };

    return (
        <div className="flex flex-col">
            {/* Intro Section */}
            <section className="bg-[#007799] text-white text-center py-16 px-4">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="max-w-2xl mx-auto text-lg">
                    We're here to help you with all your healthcare needs. Get
                    in touch with us for appointments, questions, or support.
                </p>
            </section>

            {/* Contact + Get in Touch */}
            <section className="py-16 px-6 lg:px-20 grid lg:grid-cols-2 gap-12">
                {/* Left: Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 relative"
                >
                    <h2 className="text-2xl font-bold mb-4">
                        Send Us a Message
                    </h2>

                    {/* Success message inside form */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm md:text-base mb-4"
                            >
                                <CheckCircle
                                    className="text-green-600"
                                    size={20}
                                />
                                <span>Message Sent Successfully!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block mb-1 text-sm md:text-base">
                                Full Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg text-sm md:text-base ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs md:text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm md:text-base">
                                Email Address{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={form.email}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg text-sm md:text-base ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs md:text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        {/* Phone */}
                        <div>
                            <label className="block mb-1 text-sm md:text-base">
                                Phone Number{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={form.phone}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg text-sm md:text-base ${
                                    errors.phone
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs md:text-sm mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block mb-1 text-sm md:text-base">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Enter subject (optional)"
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block mb-1 text-sm md:text-base">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="message"
                            rows="4"
                            placeholder="Write your message"
                            value={form.message}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg text-sm md:text-base ${
                                errors.message
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        ></textarea>
                        {errors.message && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">
                                {errors.message}
                            </p>
                        )}
                    </div>

                    {/* Button with shake animation */}
                    <motion.button
                        type="submit"
                        className="bg-[#007799] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 w-full justify-center"
                        animate={
                            buttonShake ? { x: [-10, 10, -10, 10, 0] } : {}
                        }
                    >
                        <Send size={18} /> Send Message
                    </motion.button>
                </form>

                {/* Right: Get in Touch */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">
                        We're committed to providing you with the best
                        healthcare experience. Whether you have questions about
                        our services, need to schedule an appointment, or
                        require emergency assistance, we're here to help.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-4 text-sm md:text-base"
                    >
                        <div className="flex items-start gap-3">
                            <MapPin className="text-[#007799] mt-1" />
                            <div>
                                <h4 className="font-semibold">Our Location</h4>
                                <p>Torhayloch, 100 meters from augusta bridge</p>
                                <p>Addis Ababa, Ethiopia</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone className="text-[#007799] mt-1" />
                            <div>
                                <h4 className="font-semibold">Phone Numbers</h4>
                                <p>+251996505319</p>
                                <p>+251939602927</p>
                                <p>+251984650912</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Mail className="text-[#007799] mt-1" />
                            <div>
                                <h4 className="font-semibold">
                                    Email Addresses
                                </h4>
                                <p>biruhkidsclinic@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="text-[#007799] mt-1" />
                            <div>
                                <h4 className="font-semibold">Opening Hours</h4>
                                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                                <p>Sat - Sun: 9:00 AM - 4:00 PM</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Map Section */}
            <GoogleMap />
        </div>
    );
};

export default ContactPage;
