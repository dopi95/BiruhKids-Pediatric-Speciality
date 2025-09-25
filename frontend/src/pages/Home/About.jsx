import {
  Users,
  Award,
  Video,
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
      value: "1,000+",
      label: isAmh ? "ደስተኛ ታካሚዎች" : "Happy Patients",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    
 {
  icon: Video,
  value: "Live",
  label: isAmh ? "የኦንላይ አገልግሎት" : "Online Consultation",
  color: "text-green-600",
  bg: "bg-green-100",
},

    {
      icon: Stethoscope,
      value: "4+",
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
      
                ብሩህ ኪድስ በ <span className="font-semibold">ህዳር 2017</span>{" "} በአዲስ አበባ፣ ኢትዮጵያ ውስጥ እንደ ፕሪሚየር የህፃናት ስፔሻሊቲ ክሊኒክ ተቋቋመ። ባለፉት ስምንት ወራት ውስጥ ለህጻናት ሁሉን አቀፍ የጤና እንክብካቤ አገልግሎት ለመስጠት ቆርጠን ተነስተናል፣ ተቋማዊ ደረጃ ለማግኘት ደከመኝ ሰለቸኝ ሳንል እየሰራን ነው።

በብሩህ ኪድስ በአሁኑ ወቅት እያንዳንዱ ህጻን ከፍተኛውን የህክምና ክትትል እንዲያገኝ ለማድረግ የተመላላሽ ታካሚ ዲፓርትመንት (OPD)፣ የድንገተኛ ህክምና፣ የላብራቶሪ አገልግሎት እና የአልትራሳውንድ ምርመራዎችን ጨምሮ ልዩ ልዩ አገልግሎቶችን እንሰጣለን።              </>
            ) : (
              <>

                Biruh Kids was established in {" "}
                <span className="font-semibold">November 2024</span> as a premier pediatric specialty clinic 
                in Addis Ababa, Ethiopia. Over the last eight months, we have been dedicated to 
                providing comprehensive healthcare services for children, working tirelessly towards obtaining 
                institutional status. At Biruh Kids, we currently offer a range of specialized 
                services including Outpatient Department (OPD), emergency care, laboratory services,
                 and ultrasound diagnostics to ensure that every child receives the highest standard of medical attention.
              </>
            )}
          </p>

          {/* Read More Button */}
          <div className="flex justify-center">
            <a
              href="/about"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>{isAmh ? "ተጨማሪ ያንብቡ" : "Read More"}</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
         
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
              href: "https://www.instagram.com/biruh_kids?igsh=MXdqaHRvejJlZTkwbw==",
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
