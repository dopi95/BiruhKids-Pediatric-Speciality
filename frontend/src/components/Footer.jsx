import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Footer({ lang }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load subscription status from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("subscribedEmail");
    const savedStatus = localStorage.getItem("isSubscribed");
    
    if (savedEmail && savedStatus === "true") {
      setEmail(savedEmail);
      setIsSubscribed(true);
    }
  }, []);

  // Check if the email is already subscribed
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!email || !email.includes("@")) return;
      
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/subscribers/check/${encodeURIComponent(email)}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setIsSubscribed(data.isSubscribed);
          
          // Save to localStorage if subscribed
          if (data.isSubscribed) {
            localStorage.setItem("subscribedEmail", email);
            localStorage.setItem("isSubscribed", "true");
          }
        }
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    };
    
    // Add a delay to prevent excessive API calls
    const timeoutId = setTimeout(checkSubscriptionStatus, 500);
    return () => clearTimeout(timeoutId);
  }, [email]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const endpoint = isSubscribed ? "unsubscribe" : "subscribe";
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/subscribers/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        if (isSubscribed) {
          toast.success("Successfully unsubscribed from our newsletter");
          setIsSubscribed(false);
          // Remove from localStorage when unsubscribed
          localStorage.removeItem("subscribedEmail");
          localStorage.removeItem("isSubscribed");
        } else {
          toast.success("🎉 Successfully subscribed to our newsletter!");
          setIsSubscribed(true);
          // Save to localStorage when subscribed
          localStorage.setItem("subscribedEmail", email);
          localStorage.setItem("isSubscribed", "true");
        }
        setEmail("");
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const translations = {
    en: {
      description:
        "Wide range of pediatric healthcare services designed to meet the unique needs of children.",
      quickLinks: "Quick Links",
      home: "Home",
      about: "About Us",
      services: "Services",
      videos: "Videos",
      contact: "Contact",
      contactInfo: "Contact Info",
      address:
        "Torhayloch 100 meters from augusta bridge, Addis Ababa, Ethiopia",
      newsletter: "Newsletter",
      subscribeText:
        "Subscribe to get updates on health tips and clinic news.",
      placeholder: "Enter your email",
      subscribe: "Subscribe",
      unsubscribe: "Unsubscribe",
      copyright:
        "© 2025 All rights reserved. Developed by ",
    },
    am: {
      description:
        "ልጆችን በተለየ መልኩ ለማገልገል የተዘጋጁ ሰፊ የህፃናት ጤና አገልግሎቶች።",
      quickLinks: "ፈጣን አገናኞች",
      home: "መነሻ",
      about: "ስለ እኛ",
      services: "አገልግሎቶች",
      videos: "ቪዲዮዎች",
      contact: "አግኙን",
      contactInfo: "የእውቂያ መረጃ",
      address:
        "ቶርሃይሎች ከአውጉስታ ድልድይ 100 ሜትር ርቀት፣ አዲስ አበባ፣ ኢትዮጵያ",
      newsletter: "ኒውዝሌተር",
      subscribeText:
        "የጤና ምክሮችንና የክሊኒክ ዜናዎችን ለማወቅ ይመዝገቡ።",
      placeholder: "ኢሜይልዎን ያስገቡ",
      subscribe: "ይመዝገቡ",
      unsubscribe: "ከደረሰኝ ላይ ይውጡ",
      copyright:
        "© 2017 ሁሉም መብቶች ተጠብቀዋል። የተገነባ በ ",
    },
  };

  const t = translations[lang] || translations.en;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">BiruhKids</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {t.description}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.youtube.com/@ብሩህkids"
                target="_blank"
                className="text-red-600 transition-colors duration-200"
              >
                <FaYoutube className="h-8 w-8" />
              </a>

              <a
                href="https://www.tiktok.com/@biruhkids?_t=ZM-8zHeQeJllLk&_r=1"
                target="_blank"
                className="text-black transition-colors duration-200"
              >
                <FaTiktok className="h-7 w-7" />
              </a>
              <a
                href="#"
                target="_blank"
                className="text-blue-600 transition-colors duration-200"
              >
                <Facebook className="h-7 w-7" />
              </a>
              <a
                href="#"
                target="_blank"
                className="text-pink-400 transition-colors duration-200"
              >
                <Instagram className="h-7 w-7" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t.about}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t.services}
                </Link>
              </li>
              <li>
                <Link
                  to="/videos"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t.videos}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contactInfo}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  +251996505319 / +251939602927
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  biruhkidsclinic@gmail.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-300 text-sm">{t.address}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.newsletter}</h3>
            <p className="text-gray-300 text-sm mb-4">{t.subscribeText}</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:border-blue-400"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white px-4 py-2 rounded-md transition-colors duration-200 ${
                  isSubscribed 
                    ? "bg-red-600 hover:bg-red-700" 
                    : "bg-blue-600 hover:bg-blue-700"
                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting 
                  ? "Processing..." 
                  : isSubscribed 
                    ? t.unsubscribe 
                    : t.subscribe
                }
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t.copyright}
            <a
              href="https://t.me/ChainTech_6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition"
            >
              Chain Tech
            </a>
          </p>
        </div>
      </div>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </footer>
  );
}