import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import serviceService from "../../services/serviceService";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
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
      // Get the latest 5 services (assuming services are returned with createdAt field)
      const latestServices = response.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
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
      description: "Comprehensive healthcare services designed to meet all your medical needs with state-of-the-art technology and expert care.",
      learnMore: "Learn More",
      viewAllServices: "View All Services",
      loading: "Loading services..."
    },
    Am: {
      ourServices: "አገልግሎታችን",
      description: "በዘመናዊ ቴክኖሎጂ እና በባለሙያ እንክብካቤ የተዘጋጀ የጤና አገልግሎት ለሁሉም የጤና ፍላጎቶችዎ ማሟላት።",
      learnMore: "ተጨማሪ ይወቁ",
      viewAllServices: "ሁሉንም አገልግሎቶች ይመልከቱ",
      loading: "አገልግሎቶች በመጫን ላይ..."
    }
  };

  const t = translations[lang];

  if (loading) {
    return (
      <article className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl">{t.loading}</div>
        </div>
      </article>
    );
  }

  return (
    <article className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.ourServices}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={fadeUp}
              custom={index}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {isAmh && service.title_am ? service.title_am : service.title_en}
              </h3>
              <p className="text-gray-600 mb-6">
                {isAmh && service.description_am 
                  ? service.description_am 
                  : service.description_en}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                {t.learnMore}{" "}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.div
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={services.length + 1}
        >
          <Link
            to="/services"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
          >
            {t.viewAllServices}{" "}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </article>
  );
}