import { Link } from "react-router-dom";
import { Heart, Stethoscope, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

export default function Services({ lang }) {
  const isAmh = lang === "Am";

  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description:
        "Comprehensive heart care with advanced diagnostic and treatment options.",
    },
    {
      icon: Shield,
      title: "Emergency Care",
      description:
        "24/7 emergency services with rapid response and expert medical care.",
    },
    {
      icon: Stethoscope,
      title: "General Medicine",
      description:
        "Complete primary healthcare services for patients of all ages.",
    },
  ];

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
            {isAmh ? "አገልግሎታችን" : "Our Services"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isAmh
              ? "በዘመናዊ ቴክኖሎጂ እና በባለሙያ እንክብካቤ የተዘጋጀ የጤና አገልግሎት ለሁሉም የጤና ፍላጎቶችዎ ማሟላት።"
              : "Comprehensive healthcare services designed to meet all your medical needs with state-of-the-art technology and expert care."}
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
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={fadeUp}
              custom={index}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                to="/services"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
              >
                {isAmh ? "ተጨማሪ ይወቁ" : "Learn More"}{" "}
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
            {isAmh ? "ሁሉንም አገልግሎቶች ይመልከቱ" : "View All Services"}{" "}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
