import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope, FlaskConical, Monitor, Scissors } from "lucide-react";
import { motion } from "framer-motion";

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
  // Department data
  const departments = [
    {
      id: 1,
      name: "General Services",
      nameAm: "አጠቃላይ አገልግሎቶች",
      description: "Comprehensive pediatric care for all your child's health needs",
      descriptionAm: "ለልጅዎ ሁሉም የጤና ፍላጎቶች አጠቃላይ የህፃናት እንክብካቤ",
      icon: Stethoscope,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      name: "Laboratory Services",
      nameAm: "የላቦራቶሪ አገልግሎቶች",
      description: "Advanced diagnostic testing and analysis services",
      descriptionAm: "የላቀ የምርመራ ፈተና እና የትንተና አገልግሎቶች",
      icon: FlaskConical,
      gradient: "from-blue-600 to-blue-800",
    },
    {
      id: 3,
      name: "Ultrasound Services",
      nameAm: "የአልትራሳውንድ አገልግሎቶች",
      description: "Non-invasive imaging for accurate diagnosis",
      descriptionAm: "ለትክክለኛ ምርመራ ወራሪ ያልሆነ ምስል",
      icon: Monitor,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: 4,
      name: "Minor Surgery Services",
      nameAm: "የትንሽ ቀዶ ጥገና አገልግሎቶች",
      description: "Safe outpatient surgical procedures for children",
      descriptionAm: "ለህፃናት ደህንነቱ የተጠበቀ የውጪ ታካሚ የቀዶ ጥገና ሂደቶች",
      icon: Scissors,
      gradient: "from-blue-700 to-blue-900",
    }
  ];

  // Translations
  const translations = {
    En: {
      ourServices: "Our Services",
      description: "Comprehensive pediatric healthcare services across specialized departments",
      readMore: "Read More",
      viewAllServices: "View All Services",
    },
    Am: {
      ourServices: "የእኛ አገልግሎቶች",
      description: "በልዩ ክፍሎች ውስጥ አጠቃላይ የህፃናት የጤና አገልግሎቶች",
      readMore: "ተጨማሪ ያንብቡ",
      viewAllServices: "ሁሉንም አገልግሎቶች ይመልከቱ",
    },
  };

  const t = translations[lang];

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

        {/* Department Cards - 2 per row on desktop, 1 on mobile */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {departments.map((dept, index) => {
            const IconComponent = dept.icon;
            return (
              <motion.div
                key={dept.id}
                className="bg-white rounded-2xl p-8 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                variants={fadeUp}
                custom={index}
              >
                <div className="flex flex-col h-full text-center">
                  <div className="mb-6">
                    <div className={`bg-gradient-to-br ${dept.gradient} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      {lang === "En" ? dept.name : dept.nameAm}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {lang === "En" ? dept.description : dept.descriptionAm}
                    </p>
                  </div>
                  
                  {/* Read More Link */}
                  <div className="mt-auto">
                    <Link
                      to="/services"
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group"
                    >
                      {t.readMore}
                      <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={departments.length + 1}
        >
          <Link
            to="/services"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>{t.viewAllServices}</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
