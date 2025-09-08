import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import serviceService from "../../services/serviceService";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Services({ lang = "En" }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAmh = lang === "Am";

  useEffect(() => {
    fetchLatestServices();
  }, []);

  const fetchLatestServices = async () => {
    try {
      const response = await serviceService.getServices();
      const latestServices = response.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
      setServices(latestServices);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Translations
  const translations = {
    En: {
      ourServices: "Our Services",
      description:
        "Comprehensive healthcare services designed to meet all your medical needs with state-of-the-art technology and expert care.",
      viewAllServices: "View All Services",
      learnMore: "Learn More",
      loading: "Loading services...",
    },
    Am: {
      ourServices: "አገልግሎታችን",
      description:
        "በዘመናዊ ቴክኖሎጂ እና በባለሙያ እንክብካቤ የተዘጋጀ የጤና አገልግሎት ለሁሉም የጤና ፍላጎቶችዎ ማሟላት።",
      viewAllServices: "ሁሉንም አገልግሎቶች ይመልከቱ",
      learnMore: "ተጨማሪ ይመልከቱ",
      loading: "አገልግሎቶች በመጫን ላይ...",
    },
  };

  const t = translations[lang];

  if (loading) {
    return (
      <article className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl animate-pulse text-gray-500">{t.loading}</div>
        </div>
      </article>
    );
  }

  return (
    <article className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {t.ourServices}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service._id || index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100"
              variants={fadeUp}
              custom={index}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image (optional if exists) */}
              {service.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {isAmh && service.title_am ? service.title_am : service.title_en}
                </h3>
                <p className="text-gray-600 mb-5 flex-grow leading-relaxed">
                  {isAmh && service.description_am
                    ? service.description_am
                    : service.description_en}
                </p>

                {/* Learn More button (goes to /services page) */}
                <Link
                  to="/services"
                  className="mt-auto inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  {t.learnMore} <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={services.length + 1}
        >
          <Link
            to="/services"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 inline-flex items-center"
          >
            {t.viewAllServices} <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
