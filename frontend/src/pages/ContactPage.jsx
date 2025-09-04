import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import GoogleMap from "../components/GoogleMap";
import OnlineConsultation from "../components/OnlineConsultation";

// ✅ Translations
const translations = {
  en: {
    contactTitle: "Contact Us",
    contactDesc:
      "We're here to help you with all your healthcare needs. Get in touch with us for appointments, questions, or support.",
    sendMessage: "Send Us a Message",
    success: "Message Sent Successfully!",
    name: "Full Name",
    namePlaceholder: "Enter your full name",
    email: "Email Address",
    emailPlaceholder: "Enter your email address",
    phone: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    subject: "Subject",
    subjectPlaceholder: "Enter subject (optional)",
    message: "Message",
    messagePlaceholder: "Write your message",
    sendBtn: "Send Message",
    getInTouch: "Get in Touch",
    getInTouchDesc:
      "We're committed to providing you with the best healthcare experience. Whether you have questions about our services, need to schedule an appointment, or require emergency assistance, we're here to help.",
    location: "Our Location",
    phoneNumbers: "Phone Numbers",
    emails: "Email Addresses",
    hours: "Opening Hours",
    hoursDetail1: "Mon - Fri: 8:00 AM - 6:00 PM",
    hoursDetail2: "Sat - Sun: 9:00 AM - 4:00 PM",
    errors: {
      name: "Please fill your full name",
      email: "Please enter a valid email",
      phone: "Please enter a valid phone number",
      message: "Please write your message",
    },
  },
  am: {
    contactTitle: "ያግኙን",
    contactDesc:
      "ለሁሉም የጤና ፍላጎቶችዎ እንዲረዱዎ እንገኛለን። ለቀጠሮዎች፣ ጥያቄዎች ወይም ድጋፍ እንዲያገኙ እባኮትን ያግኙን።",
    sendMessage: "መልእክት ይላኩልን",
    success: "መልእክትዎ በተሳካ ሁኔታ ተልኳል!",
    name: "ሙሉ ስም",
    namePlaceholder: "ሙሉ ስምዎን ያስገቡ",
    email: "ኢሜይል አድራሻ",
    emailPlaceholder: "ኢሜይል አድራሻዎን ያስገቡ",
    phone: "ስልክ ቁጥር",
    phonePlaceholder: "ስልክ ቁጥርዎን ያስገቡ",
    subject: "ርዕስ",
    subjectPlaceholder: "ርዕስ ያስገቡ (አማራጭ)",
    message: "መልእክት",
    messagePlaceholder: "መልእክትዎን ይጻፉ",
    sendBtn: "መልእክት ላክ",
    getInTouch: "ያግኙን",
    getInTouchDesc:
      "ከፍተኛ የጤና አገልግሎት ለመስጠት ቁርጠኞች ነን። ስለአገልግሎቶቻችን ጥያቄ ካለዎት፣ ቀጠሮ ለመያዝ ወይም አስቸኳይ እርዳታ ከፈለጉ እንዲረዱዎ እንገኛለን።",
    location: "አድራሻችን",
    phoneNumbers: "ስልክ ቁጥሮች",
    emails: "ኢሜይል አድራሻዎች",
    hours: "የመክፈቻ ሰዓቶች",
    hoursDetail1: "ሰኞ - አርብ፡ 2:00 - 12:00 ቀን",
    hoursDetail2: "ቅዳሜ - እሑድ፡ 3:00 - 10:00 ቀን",
    errors: {
      name: "እባክዎ ሙሉ ስምዎን ያስገቡ",
      email: "እባክዎ ትክክለኛ ኢሜይል ያስገቡ",
      phone: "እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ",
      message: "እባክዎ መልእክትዎን ይጻፉ",
    },
  },
};

const ContactPage = ({ lang = "en" }) => {
  const t = translations[lang.toLowerCase()] || translations.en;

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
  const botToken = "YOUR_BOT_TOKEN"; // ⚠️ replace with env variable
  const chatId = "YOUR_CHAT_ID";

  // validation
  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = t.errors.name;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = t.errors.email;
    if (!form.phone.trim()) newErrors.phone = t.errors.phone;
    if (!form.message.trim()) newErrors.message = t.errors.message;
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
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
        <h1 className="text-4xl font-bold mb-4">{t.contactTitle}</h1>
        <p className="max-w-2xl mx-auto text-lg">{t.contactDesc}</p>
      </section>

      {/* Contact + Get in Touch */}
      <section className="py-16 px-6 lg:px-20 grid lg:grid-cols-2 gap-12">
        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6 relative"
        >
          <h2 className="text-2xl font-bold mb-4">{t.sendMessage}</h2>

          {/* Success message inside form */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center gap-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm md:text-base mb-4"
              >
                <CheckCircle className="text-green-600" size={20} />
                <span>{t.success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-sm md:text-base">
                {t.name} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder={t.namePlaceholder}
                value={form.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg text-sm md:text-base ${
                  errors.name ? "border-red-500" : "border-gray-300"
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
                {t.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                value={form.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg text-sm md:text-base ${
                  errors.email ? "border-red-500" : "border-gray-300"
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
                {t.phone} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder={t.phonePlaceholder}
                value={form.phone}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg text-sm md:text-base ${
                  errors.phone ? "border-red-500" : "border-gray-300"
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
                {t.subject}
              </label>
              <input
                type="text"
                name="subject"
                placeholder={t.subjectPlaceholder}
                value={form.subject}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm md:text-base">
              {t.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows="4"
              placeholder={t.messagePlaceholder}
              value={form.message}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg text-sm md:text-base ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs md:text-sm mt-1">
                {errors.message}
              </p>
            )}
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            className="bg-[#007799] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 w-full justify-center"
            animate={buttonShake ? { x: [-10, 10, -10, 10, 0] } : {}}
          >
            <Send size={18} /> {t.sendBtn}
          </motion.button>
        </form>

        {/* Right: Get in Touch */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">{t.getInTouch}</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            {t.getInTouchDesc}
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
                <h4 className="font-semibold">{t.location}</h4>
                <p>Torhayloch, 100 meters from Augusta bridge</p>
                <p>Addis Ababa, Ethiopia</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-[#007799] mt-1" />
              <div>
                <h4 className="font-semibold">{t.phoneNumbers}</h4>
                <p>+251996505319</p>
                <p>+251939602927</p>
                <p>+251984650912</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-[#007799] mt-1" />
              <div>
                <h4 className="font-semibold">{t.emails}</h4>
                <p>biruhkidsclinic@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-[#007799] mt-1" />
              <div>
                <h4 className="font-semibold">{t.hours}</h4>
                <p>{t.hoursDetail1}</p>
                <p>{t.hoursDetail2}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <GoogleMap lang={lang === "En" ? "en" : "am"}/>
      {/* Online Consultation Section */}
      <OnlineConsultation lang={lang === "En" ? "en" : "am"}/>
    </div>
  );
};

export default ContactPage;
