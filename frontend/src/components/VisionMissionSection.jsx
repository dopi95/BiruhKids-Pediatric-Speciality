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
            ? "የእኛ ራዕይ በልጆች ልዩ አገልግሎት ዘርፍ ውስጥ የታላቅ ብርታት ማዕከል መሆን ነው። ልጅ ሁሉ ከማንኛውም ባህላዊ ወይም ማህበራዊ ቅድሚያ እንኳ በማይተወው ሁኔታ የሙያ ያለው፣ ርኅራኄ ያለው እና የግል ተመጣጣኝ እንክብካቤ በሚቀበሉበት እና በሚያገለግል አካባቢ ውስጥ። ልጆችና ቤተሰቦቻቸው የሚጠናከሩ፣ ጤና በማንኛውም ሰው የሚደረስበት፣ አካባቢው የሚያካትት እና ዘመናዊነትና ርኅራኄ በአንድነት የሚሰሩበት ወደ በለጠ ብሩህ እና ጤናማ ህይወት እንዲመሩ እናያለን።"
            : "Our vision is to become a leading center of excellence in pediatric specialty care, where every child regardless of background receives expert, compassionate, and individualized care in a healing environment. We envision a future where children and families are empowered, healthcare is accessible and inclusive, and innovation and empathy work hand-in-hand to build brighter, healthier lives."}
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
            ? "የእኛ ተልዕኮ በቤተሰብ ማዕከላዊነት የተመሠረተ የልጆች ልዩ እንክብካቤን በተባባሪነት እና በብዙ ዘርፍ ባለሙያዎች በመሳተፍ ማቅረብ ነው። በማስረጃ የተመሠረቱ ሕክምናዎችን በሙቀት፣ በክብር እና በአክብሮት ለመስጠት ተግባራዊ ነን። በዘመናዊ የሕክምና እውቀት ላይ በመተካት፣ ከቤተሰቦች ጋር ግንኙነትን በማዳበር እና ልጆች የሚወዱትን አካባቢ በማቋቋም ብቻ የህመምተኞቻችንን ጤና ሳይሆን የእነርሱን እድገት፣ ጽናት እና ስነ-ልቦናዊ ደህንነት እንደገና እንደምንደግ። በእኛ እንክብካቤ ውስጥ ያሉ ልጆች ሁሉ እንደ የራሳችን ልጆች በተመሳሳይ ርኅራኄ እና ትኩረት ይቀበላሉ።"
            : "Our mission is to provide outstanding, family-centered pediatric specialty care through a collaborative, multidisciplinary approach. We are committed to delivering evidence-based treatments with warmth, dignity, and respect. By investing in advanced medical knowledge, nurturing partnerships with families, and fostering a child-friendly atmosphere, we strive to support not just the health of our patients, but their growth, resilience, and emotional well-being. Every child in our care is treated with the same compassion, attention, and dedication we would offer our own."}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default VisionMissionSection;
