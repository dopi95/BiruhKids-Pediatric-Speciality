import React from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const VisionMissionSection = ({ lang }) => {
  const isAmh = lang === "Am";

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className="py-16 px-4 sm:px-6 lg:px-12 bg-white max-w-6xl mx-auto grid gap-8 sm:grid-cols-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Vision Card */}
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-start text-left border border-gray-200 
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300 cursor-pointer"
        variants={cardVariants}
      >
        <div className="flex items-center gap-3 mb-4">
          <FaEye className="text-[#007799] text-3xl" />
          <h3 className="text-xl font-bold">
            {isAmh ? "የእኛ ራዕይ" : "Our Vision"}
          </h3>
        </div>
        <p className="text-gray-700 text-justify leading-relaxed [hyphens:auto] [word-spacing:0.05em]">
          {isAmh
            ? "በእንክብካቤ ልህቀት የሚታወቅ፣ እያንዳንዱ ልጅ ደህንነት የሚሰማው፣ የሚከበርበት እና እንዲበለጽግ የሚደገፍ ግንባር ቀደም የህፃናት ህክምና እና የቀዶ ጥገና ማዕከል ለመሆን።"
            : "To be the leading pediatric medical and surgical center known for excellence in care, where every child feels safe, valued, and supported to thrive."}
        </p>
      </motion.div>

      {/* Mission Card */}
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-start text-left border border-gray-200 
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-all duration-300 cursor-pointer"
        variants={cardVariants}
      >
        <div className="flex items-center gap-3 mb-4">
          <FaHeart className="text-[#FF7A1A] text-3xl" />
          <h3 className="text-xl font-bold">
            {isAmh ? "የእኛ ተልዕኮ" : "Our Mission"}
          </h3>
        </div>
        <p className="text-gray-700 text-justify leading-relaxed [hyphens:auto] [word-spacing:0.05em]">
          {isAmh
            ? "እያንዳንዱን ልጅ ጤና እና እድገት የሚደግፍ ሩህሩህ፣ ደህንነቱ የተጠበቀ እና ከፍተኛ ጥራት ያለው የህፃናት ህክምና ለመስጠት፣ ከቤተሰቦች ጋር በአክብሮት፣ በፈጠራ እና በቡድን ስራ ታማኝ ሽርክና መገንባት።"
            : "To provide compassionate, safe, and high-quality pediatric care that supports every child’s health and development, while building trusted partnerships with families through respect, innovation, and teamwork."}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default VisionMissionSection;
