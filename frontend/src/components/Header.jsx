import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Menu, X, ChevronRight, Globe, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getUserDisplayName } from "../utils/authHelpers";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language: lang, changeLanguage } = useLanguage();

  function toggleLang() {
    changeLanguage(lang === "En" ? "Am" : "En");
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  // 🔹 Translation dictionary
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
      dashboard: "Dashboard",
      logout: "Logout",
      welcome: "Welcome",
    },
    Am: {
      home: "ዋና ገጽ",
      about: "ስለ እኛ",
      services: "አገልግሎቶች",
      contact: "አግኙን",
      videos: "ቪዲዮዎች",
      book: "ቀጠሮ ያስይዙ",
      login: "ይግቡ",
      register: "ይመዝገቡ",
      signin: "ይግቡ",
      signup: "ይመዝገቡ",
      dashboard: "ዳሽቦርድ",
      logout: "ውጣ",
      welcome: "እንኳን ደህና መጡ",
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
    <nav className="w-full h-16 sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-20 h-8 lg:w-24 lg:h-10 animate-logo-text-flip"
            style={{ transformOrigin: "center" }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex space-x-6 items-center">
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
        <div className="hidden xl:flex items-center gap-4">
          <Link
            to="/appointment"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>{translations[lang].book}</span>
          </Link>

          {user ? (
            // Authenticated user menu
            <>
              <Link
                to={user.role === "user" ? "/user-dashboard" : "/admin"}
                className="relative text-blue-500 font-semibold flex items-center hover:text-blue-600 transition group whitespace-nowrap"
              >
                <User className="w-4 h-4 mr-1" />
                {translations[lang].dashboard}
                <ChevronRight className="inline ml-0 transform transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <button
                onClick={logout}
                className="relative text-red-500 font-semibold flex items-center hover:text-red-600 transition group whitespace-nowrap"
              >
                <LogOut className="w-4 h-4 mr-1" />
                {translations[lang].logout}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Link
                to={user.role === "user" ? "/profile" : "/admin/profile"}
                className="relative text-gray-600 font-medium flex items-center hover:text-gray-800 transition group whitespace-nowrap"
              >
                <User className="w-4 h-4 mr-1" />
                {getUserDisplayName(user)}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          ) : (
            // Guest user menu
            <>
              <Link
                to="/login"
                className="relative text-blue-500 font-semibold flex items-center hover:text-blue-600 transition group whitespace-nowrap"
              >
                {translations[lang].login}{" "}
                <ChevronRight className="inline ml-0 transform transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/register"
                className="relative text-blue-500 font-semibold hover:text-blue-600 transition group whitespace-nowrap"
              >
                {translations[lang].register}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}

          <section className="flex items-center ml-2">
            <Globe className="w-5 h-5 cursor-pointer" onClick={toggleLang} />
            <button className="px-1 cursor-pointer" onClick={toggleLang}>
              {lang === "En" ? "አማ" : "En"}
            </button>
          </section>
        </div>

        {/* Mobile/Tablet Right Side */}
        <div className="xl:hidden flex items-center gap-3">
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
            className="xl:hidden absolute top-full left-0 w-full flex flex-col items-center bg-white px-4 pt-2 pb-4 space-y-4 shadow-md border-t"
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
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>{translations[lang].book}</span>
              </Link>
            </motion.div>

            <hr className="my-4 border border-gray-300 w-full" />

            {user ? (
              // Authenticated mobile menu
              <>
                <motion.div variants={linkVariants}>
                  <Link
                    to={user.role === "user" ? "/profile" : "/admin/profile"}
                    onClick={handleCloseMenu}
                    className=" text-gray-600 font-medium hover:text-gray-800 transition flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {getUserDisplayName(user)}
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <Link
                    to={user.role === "user" ? "/user-dashboard" : "/admin"}
                    onClick={handleCloseMenu}
                    className=" text-blue-500 font-semibold hover:text-blue-600 transition flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {translations[lang].dashboard}{" "}
                    <ChevronRight className="inline ml-1" />
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <button
                    onClick={() => {
                      logout();
                      handleCloseMenu();
                    }}
                    className=" text-red-500 font-semibold hover:text-red-600 transition flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {translations[lang].logout}
                  </button>
                </motion.div>
              </>
            ) : (
              // Guest mobile menu
              <>
                <motion.div variants={linkVariants}>
                  <Link
                    to="/login"
                    onClick={handleCloseMenu}
                    className="block text-blue-500 font-semibold hover:text-blue-600 transition"
                  >
                    {translations[lang].signin}{" "}
                    <ChevronRight className="inline" />
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
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;
