import {
  Users,
  Award,
  Clock,
  Stethoscope,
  Facebook,
  Instagram,
} from "lucide-react";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import VisionMissionSection from "../../components/VisionMissionSection";

// Variants for animation
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

export default function About({ lang }) {
  const isAmh = lang === "Am";

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: isAmh ? "ደስተኛ ታካሚዎች" : "Happy Patients",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Award,
      value: "15+",
      label: isAmh ? "የሥራ ልምድ ዓመታት" : "Years Experience",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      icon: Stethoscope,
      value: "50+",
      label: isAmh ? "ባለሙያ ሐኪሞች" : "Expert Doctors",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Clock,
      value: "24/7",
      label: isAmh ? "አደጋ ጊዜ እንክብካቤ" : "Emergency Care",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <article className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {isAmh
              ? "ስለ ብሩህኪድስ የህጻናት ልዩ ክሊኒክ"
              : "About BiruhKids Pediatric Speciality Clinic"}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-justify mb-4">
            {isAmh ? (
              <>
                ብሩህ ኪድስ በ <span className="font-semibold">ኖቬምበር 2024</span>{" "}
                በአዲስ አበባ እንደ ዋና የህጻናት ልዩ ክሊኒክ ተቋቋመ። ባለፉት ስምንት ወራት
                ውስጥ ለህጻናት አጠቃላይ የጤና አገልግሎት ማቅረብ እና የተቋም ሁኔታ
                ለማግኘት ጥረት አድርጎናል።
              </>
            ) : (
              <>
                Biruh Kids was established in{" "}
                <span className="font-semibold">November 2024</span> as a
                premier pediatric specialty clinic in Addis Ababa, Ethiopia.
                Over the last eight months, we have been dedicated to providing
                comprehensive healthcare services for children, working
                tirelessly towards obtaining institutional status.
              </>
            )}
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-justify">
            {isAmh ? (
              <>
                በብሩህ ኪድስ በአሁኑ ጊዜ{" "}
                <span className="font-medium text-gray-800">
                  የውጭ ታካሚ ክፍል (OPD)፣ አደጋ ጊዜ እንክብካቤ፣ የላቦራቶሪ አገልግሎቶች
                  እና የአልትራሳውንድ ምርመራ
                </span>{" "}
                እየቀረቡ ናቸው። ህጻናት በደህና እና በርኅራኄ ሁኔታ የጤና እንክብካቤ
                እንዲያገኙ እንረዳቸዋለን።
              </>
            ) : (
              <>
                At Biruh Kids, we currently offer a range of specialized
                services including{" "}
                <span className="font-medium text-gray-800">
                  Outpatient Department (OPD), emergency care, laboratory
                  services, and ultrasound diagnostics
                </span>{" "}
                to ensure that every child receives the highest standard of
                medical attention in a safe and compassionate environment.
              </>
            )}
          </p>
        </motion.div>

        {/* Vision & Mission Section */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
             <VisionMissionSection lang={lang} />
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              variants={fadeUp}
              custom={idx}
            >
              <div
                className={`${stat.bg} w-16 h-16 rounded-full flex items-center justify-center mb-4`}
              >
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex justify-center space-x-6 mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: <FaYoutube className="h-8 w-8" />,
              href: "https://www.youtube.com/@ብሩህkids",
              color: "text-red-500",
            },
            {
              icon: <FaTiktok className="h-7 w-7" />,
              href: "https://www.tiktok.com/@biruhkids?_t=ZM-8zHeQeJllLk&_r=1",
              color: "text-black",
            },
            {
              icon: <Facebook className="h-7 w-7" />,
              href: "https://www.facebook.com/DrFasilPediatrician",
              color: "text-blue-600",
            },
            {
              icon: <Instagram className="h-7 w-7" />,
              href: "#",
              color: "text-pink-500",
            },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              className={`${social.color} transition-colors duration-200`}
              variants={fadeUp}
              custom={idx}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </article>
  );
}
