import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Menu, X, ChevronRight, Globe } from "lucide-react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState("En"); // current language, default English

    function toggleLang() {
        setLang((prevLang) => (prevLang === "En" ? "Am" : "En"));
    }

    // Function to close menu after clicking a link
    function handleCloseMenu() {
        setIsOpen(false);
    }

    return (
        <nav className="w-full h-[8vh] md:h-[10vh] sticky top-0 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/">
                    <img
                        src={Logo}
                        alt="BruhKids Clinic Logo"
                        className="w-20 h-20"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="hover:text-orange-500 transition">
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="hover:text-orange-500 transition"
                    >
                        About
                    </Link>
                    <Link
                        to="/services"
                        className="hover:text-orange-500 transition"
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-orange-500 transition"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/videos"
                        className="hover:text-orange-500 transition"
                    >
                        Videos
                    </Link>
                </div>

                {/* Desktop Right Side */}
                <div className="hidden md:flex space-x-4 items-center">
                    <section className="flex items-center">
                        <Globe
                            className="w-5 h-5 cursor-pointer"
                            onClick={toggleLang}
                        />
                        <button
                            className="px-1 cursor-pointer"
                            onClick={toggleLang}
                        >
                            {lang === "En" ? "አማ" : "En"}
                        </button>
                    </section>
                    <Link
                        to="/appointment"
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                    >
                        Book Appointment
                    </Link>
                    <Link
                        to="/login"
                        className="text-blue-500 font-semibold hover:text-blue-600 transition"
                    >
                        Login <ChevronRight className="inline" />
                    </Link>
                    <Link
                        to="/register"
                        className="text-blue-500 font-semibold hover:text-blue-600 transition"
                    >
                        Register
                    </Link>
                </div>

                {/* Mobile Right Side (Lang + Hamburger) */}
                <div className="md:hidden flex items-center gap-3">
                    <section className="flex items-center">
                        <Globe
                            className="w-5 h-5 cursor-pointer"
                            onClick={toggleLang}
                        />
                        <button
                            className="px-2 cursor-pointer"
                            onClick={toggleLang}
                        >
                            {lang === "En" ? "አማ" : "En"}
                        </button>
                    </section>

                    {/* Hamburger */}
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full flex flex-col items-center bg-white px-4 pt-2 pb-4 space-y-4 shadow-md">
                    <Link
                        to="/"
                        onClick={handleCloseMenu}
                        className="block hover:text-orange-500 transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        onClick={handleCloseMenu}
                        className="block hover:text-orange-500 transition"
                    >
                        About
                    </Link>
                    <Link
                        to="/services"
                        onClick={handleCloseMenu}
                        className="block hover:text-orange-500 transition"
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        onClick={handleCloseMenu}
                        className="block hover:text-orange-500 transition"
                    >
                        Contact
                    </Link>
                    <Link
                        to="/videos"
                        onClick={handleCloseMenu}
                        className="block hover:text-orange-500 transition"
                    >
                        Videos
                    </Link>

                    <Link
                        to="/appointment"
                        onClick={handleCloseMenu}
                        className="block bg-orange-500 text-white px-4 py-2 rounded-lg text-center mt-2 hover:bg-orange-600 transition"
                    >
                        Book Appointment
                    </Link>
                    <hr className="my-4 border border-gray-300 w-full" />
                    <Link
                        to="/login"
                        onClick={handleCloseMenu}
                        className="block text-blue-500 font-semibold hover:text-blue-600 transition"
                    >
                        Sign In <ChevronRight className="inline" />
                    </Link>
                    <Link
                        to="/register"
                        onClick={handleCloseMenu}
                        className="block text-blue-500 font-semibold hover:text-blue-600 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Header;
