import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Menu, X, ChevronRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState("En"); // current language, default English

    function toggleLang() {
        setLang((prevLang) => (prevLang === "En" ? "Am" : "En"));
    }

    function handleCloseMenu() {
        setIsOpen(false);
    }

    // 🔹 ADD: Translation dictionary
    const translations = {
        En: {
            home: "Home",
            about: "About",
            services: "Services",
            contact: "Contact",
            videos: "Videos",
            book: "Book Appointment",
            login: "Login",
            register: "Register",
            signin: "Sign In",
            signup: "Sign Up",
        },
        Am: {
            home: "መነሻ",
            about: "ስለ እኛ",
            services: "አገልግሎቶች",
            contact: "አግኙን",
            videos: "ቪዲዮዎች",
            book: "ቀጠሮ ያስይዙ",
            login: "ግባ",
            register: "ይመዝገቡ",
            signin: "ግባ",
            signup: "መዝግብ",
        },
    };

    // Animation variants
    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.1 },
        },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <nav className="w-full h-[8vh] md:h-[10vh] sticky top-0 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src={Logo}
                        alt="Logo"
                        className=" w-22 h-12 animate-logo-text-flip"
                        style={{ transformOrigin: "center" }} // keeps it centered inside header
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="hover:text-orange-500 transition">
                        {translations[lang].home}
                    </Link>
                    <Link to="/about" className="hover:text-orange-500 transition">
                        {translations[lang].about}
                    </Link>
                    <Link to="/services" className="hover:text-orange-500 transition">
                        {translations[lang].services}
                    </Link>
                    <Link to="/contact" className="hover:text-orange-500 transition">
                        {translations[lang].contact}
                    </Link>
                    <Link to="/videos" className="hover:text-orange-500 transition">
                        {translations[lang].videos}
                    </Link>
                </div>

                {/* Desktop Right Side */}
                <div className="hidden md:flex space-x-4 items-center md:gap-4">
                    <Link
                        to="/appointment"
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md 
                           hover:bg-orange-600 hover:scale-105 hover:shadow-lg 
                           transition-transform duration-300 ease-in-out"
                    >
                        {translations[lang].book}
                    </Link>
                    <Link
                        to="/login"
                        className="relative text-blue-500 font-semibold flex items-center 
                           hover:text-blue-600 transition group"
                    >
                        {translations[lang].login}{" "}
                        <ChevronRight className="inline ml-0 transform transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link
                        to="/register"
                        className="relative text-blue-500 font-semibold hover:text-blue-600 transition group"
                    >
                        {translations[lang].register}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <section className="flex items-center">
                        <Globe className="w-5 h-5 cursor-pointer" onClick={toggleLang} />
                        <button className="px-1 cursor-pointer" onClick={toggleLang}>
                            {lang === "En" ? "አማ" : "En"}
                        </button>
                    </section>
                </div>

                {/* Mobile Right Side (Lang + Hamburger) */}
                <div className="md:hidden flex items-center gap-3">
                    <section className="flex items-center">
                        <Globe className="w-5 h-5 cursor-pointer" onClick={toggleLang} />
                        <button className="px-2 cursor-pointer" onClick={toggleLang}>
                            {lang === "En" ? "አማ" : "En"}
                        </button>
                    </section>

                    {/* Hamburger */}
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu with Animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className="md:hidden absolute top-full left-0 w-full flex flex-col items-center bg-white px-4 pt-2 pb-4 space-y-4 shadow-md border-t"
                    >
                        {[
                            { to: "/", label: translations[lang].home },
                            { to: "/about", label: translations[lang].about },
                            { to: "/services", label: translations[lang].services },
                            { to: "/contact", label: translations[lang].contact },
                            { to: "/videos", label: translations[lang].videos },
                        ].map((link, idx) => (
                            <motion.div key={idx} variants={linkVariants}>
                                <Link
                                    to={link.to}
                                    onClick={handleCloseMenu}
                                    className="block hover:text-orange-500 transition"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div variants={linkVariants}>
                            <Link
                                to="/appointment"
                                onClick={handleCloseMenu}
                                className="block bg-orange-500 text-white px-4 py-2 rounded-lg text-center mt-2 hover:bg-orange-600 transition"
                            >
                                {translations[lang].book}
                            </Link>
                        </motion.div>

                        <hr className="my-4 border border-gray-300 w-full" />

                        <motion.div variants={linkVariants}>
                            <Link
                                to="/login"
                                onClick={handleCloseMenu}
                                className="block text-blue-500 font-semibold hover:text-blue-600 transition"
                            >
                                {translations[lang].signin} <ChevronRight className="inline" />
                            </Link>
                        </motion.div>

                        <motion.div variants={linkVariants}>
                            <Link
                                to="/register"
                                onClick={handleCloseMenu}
                                className="block text-blue-500 font-semibold hover:text-blue-600 transition"
                            >
                                {translations[lang].signup}
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Header;
