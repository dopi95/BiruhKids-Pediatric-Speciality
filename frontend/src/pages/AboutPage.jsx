import React from "react";
import {
  FaHandsHelping,
  FaMedal,
  FaLightbulb,
  FaHospital,
  FaStethoscope,
  FaMicroscope,
  FaAmbulance,
  FaUsers,
  FaUserMd,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import VisionMissionSection from "../components/VisionMissionSection";

// Placeholder images
const clinicImage = "https://imgur.com/Jvnc3F4.jpg";
const ceoImage = "https://imgur.com/Jvnc3F4.jpg";

// ✅ Translations
const translations = {
  En: {
    aboutTitle: "About Us",
    aboutDesc:
      "Dedicated to providing exceptional healthcare services with compassion, innovation, and unwavering commitment to our patients' wellbeing.",
    storyTitle: "Our Story",
    storyP1:
      "Biruh Kids was established in November 2024 as a premier pediatric specialty clinic in Addis Ababa, Ethiopia. Over the last eight months, we have been dedicated to providing comprehensive healthcare services for children, working tirelessly towards obtaining institutional status. At Biruh Kids, we currently offer a range of specialized services including Outpatient Department (OPD), emergency care, laboratory services, and ultrasound diagnostics to ensure that every child receives the highest standard of medical attention.",
    storyP2:
      "Our state-of-the-art facilities are equipped with advanced technology to support the diagnosis and treatment of various pediatric conditions. Whether it’s routine consultations or emergency interventions, our team of skilled doctors and specialists is committed to delivering exceptional care in a comfortable and compassionate environment, ensuring that every child’s health and well-being are our top priorities.",
    storyP3:
      "Among our staff are some of the most experienced pediatricians, radiologists, pediatric nurses, and laboratory technicians in Ethiopia. Biruh Kids stands out for its design, which is specifically tailored to meet the unique healthcare needs of children, ensuring that we provide comprehensive care for virtually every pediatric condition. We are proud to have built our reputation by offering the highest quality services and utilizing state-of-the-art medical equipment, all while maintaining affordable pricing.",
    ceoTitle: "Message from Our CEO",
    ceoMsg:
      "At HealthCare Clinic, we believe that exceptional healthcare is not just about treating illness, but about caring for the whole person.",
    valuesTitle: "Our Core Values",
    valuesDesc:
      "These principles define who we are and guide every decision we make in our mission to serve children and families with integrity and care.",
    compassion: "Compassion",
    compassionDesc:
      "We place empathy at the heart of care, listening deeply, responding kindly, and honoring every child’s unique needs and experiences.",
    excellence: "Excellence",
    excellenceDesc:
      "We pursue the highest standards in healthcare, striving for precision, safety, and continuous improvement in all we do.",
    innovation: "Innovation",
    innovationDesc:
      "We embrace creativity and new technologies, seeking fresh solutions that make pediatric care more effective, accessible, and hopeful.",
    differentTitle: "What Makes Us Different?",
    differentDesc:
      "At Biruh Kids, we go beyond standard pediatric care to create a safe, innovative, and child-centered environment. Here’s how we stand out.",
    facilities: "Modern Facilities",
    facilitiesDesc:
      "State-of-the-art pediatric clinic with child-friendly design, ensuring comfort for children and families while delivering world-class care.",
    specialized: "Specialized Pediatric Care",
    specializedDesc:
      "Comprehensive pediatric services from growth assessments to chronic care delivered by experienced pediatricians, nurses, and radiologists.",
    diagnostics: "Advanced Diagnostics",
    diagnosticsDesc:
      "Cutting-edge laboratory and imaging services with the latest ultrasound technology, ensuring fast and accurate results tailored to children.",
    emergency: "Emergency Pediatric Care",
    emergencyDesc:
      "Dedicated pediatric emergency unit with trained specialists ensuring immediate response and effective treatment in critical situations.",
    outreach: "Community Outreach",
    outreachDesc:
      "Actively educating families for 4+ years through social media, spreading pediatric health knowledge and empowering parents.",
    team: "Dedicated Team",
    teamDesc:
      "Compassionate pediatricians, nurses, radiologists, and support staff ensuring seamless, family-friendly care from arrival to departure.",
  },
  Am: {
    aboutTitle: "ስለ እኛ",
    aboutDesc:
      "በርሀ ኪድስ ልጆች ለጤናቸው ከፍተኛ ጥራት ያለው እንክብካቤ በርካታ በፍላጎት እና በማህበራዊ አገልግሎት ለመስጠት ተቃውሞ የማይቀር ትኩረት ያቀርባል።",
    storyTitle: "ታሪካችን",
    storyP1:
      "በርሀ ኪድስ በኖቬምበር 2024 በአዲስ አበባ እንደ ልዩ ልጅ ጤና ክሊኒክ ተቋቋመ። ባለፉት 8 ወራት ልጆች ለማንኛውም የጤና አገልግሎት በጥራት እና በተወላጅ መንገድ እንዲያገኙ በጥረት ተቋቋመናል።",
    storyP2:
      "አዳዲስ ቴክኖሎጂዎችን የያዘ ዘመናዊ መሳሪያ ተዘጋጅቶ ልጆች በሚፈለጉበት ሁኔታ እንክብካቤ እንዲያገኙ ታስቦ ተነድፎበታል።",
    storyP3:
      "በቡድናችን ውስጥ በኢትዮጵያ ከሚገኙት በጣም የተሞክሮ ያላቸው ህፃናት ሐኪሞች፣ ራዲዮሎጂስቶች፣ ህፃናት ነርሶችና ላቦራቶሪ ቴክኒሻኖች ይገኛሉ።",
    ceoTitle: "የአስተዳዳሪነት መልዕክት",
    ceoMsg:
      "በህክምና ክሊኒክ እኛ ጤና ማስተናገድ ማንኛውንም በሽታ ብቻ ሳይሆን በሰውነት ሙሉ ያለ ትኩረት ነው በምንመኘው።",
    valuesTitle: "ዋና እሴቶቻችን",
    valuesDesc:
      "እነዚህ መርሆዎች እኛን የምንሆነውን ይገልጻሉ እና ልጆችንና ቤተሰቦችን በክብር እና በእውነት ለማገልገል የምንወስድበትን ውሳኔ ያመራሉ።",
    compassion: "ርኅራኄ",
    compassionDesc:
      "በቅርብ መስማት እና በትክክል መልስ ልጆች በልዩ እንክብካቤ እንዲያገኙ እና ልዩነታቸውን እንዲጠብቁ እንሠራለን።",
    excellence: "ብልጽግና",
    excellenceDesc:
      "በጤና አገልግሎት ከፍተኛ ስኬት ለማድረግ በማሻሻያና በደህንነት እንጥራለን።",
    innovation: "አዳዲስነት",
    innovationDesc:
      "አዳዲስ ቴክኖሎጂዎችን በመቀበል ልጆች ለጤናቸው በተስፋ እንክብካቤ እንሰጣለን።",
    differentTitle: "ምን እንደምንለየው?",
    differentDesc:
      "በብሩህ ኪድስ የህፃናት እንክብካቤ ብቻ አይደለም፤ አስተዋፅኦ ያለው የልጅ ማእከል እንዲኖር እንሠራለን።",
    facilities: "ዘመናዊ ተቋማት",
    facilitiesDesc:
      "ልጆችና ቤተሰቦች በተስፋ እንዲያገኙ በዓለም ደረጃ የተዘጋጀ የህፃናት ክሊኒክ።",
    specialized: "ልዩ የህፃናት እንክብካቤ",
    specializedDesc:
      "የህፃናት አጠቃላይ እንክብካቤ በተሞክሮ ያላቸው ሐኪሞች እና ነርሶች የሚሰጥ።",
    diagnostics: "ዘመናዊ ምርመራ",
    diagnosticsDesc:
      "የህፃናት በግልጽ ውጤት የሚሰጥ ላቦራቶሪ እና ኢምጅ አገልግሎት።",
    emergency: "የአደጋ እንክብካቤ",
    emergencyDesc:
      "የህፃናት አደጋ ክፍል በተዘጋጀ ባለሙያዎች የተሞላ።",
    outreach: "ማህበረሰብ አጋር",
    outreachDesc:
      "ለ4+ ዓመታት በማህበራዊ ሚዲያ ቤተሰቦችን በጤና ማስተላለፊያ ማሳያ።",
    team: "ተዋዳድ ቡድን",
    teamDesc:
      "ልጆችን በቅርብ እንክብካቤ የሚያገኙ በልዩ ተዘጋጅቶ የተሞላ ቡድን።",
  },
};

const AboutPage = ({ lang }) => {
  const t = translations[lang] || translations.en;

  // Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Intro Section */}
      <section className="bg-[#007799] text-white text-center px-4 py-12 sm:py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {t.aboutTitle}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-center lg:text-left">
          {t.aboutDesc}
        </p>
      </section>

      {/* Our Story Section */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          <SectionImage src={clinicImage} alt="Clinic Building" />
          <SectionText>
            <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">
              {t.storyTitle}
            </h2>
            <p className="text-gray-700 text-justify leading-relaxed">{t.storyP1}</p>
            <p className="text-gray-700 text-justify leading-relaxed mt-2">{t.storyP2}</p>
            <p className="text-gray-700 text-justify leading-relaxed mt-2">{t.storyP3}</p>
          </SectionText>
        </div>
      </SectionWrapper>

      {/* CEO Section */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <SectionText>
            <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">
              {t.ceoTitle}
            </h2>
            <p className="text-gray-700 text-justify leading-relaxed">{t.ceoMsg}</p>
          </SectionText>
          <SectionImage src={ceoImage} alt="CEO" showName="Dr. Fasil Menbere" showRole="CEO & Founder" />
        </div>
      </SectionWrapper>

      {/* Vision & Mission Section */}
      <SectionWrapper>
        <VisionMissionSection lang={lang} />
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.valuesTitle}</h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">{t.valuesDesc}</p>
          </div>
          <motion.div
            className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaHandsHelping className="text-[#007799] text-3xl" />
                <h3 className="text-xl font-bold">{t.compassion}</h3>
              </div>
              <p>{t.compassionDesc}</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaMedal className="text-[#FF7A1A] text-3xl" />
                <h3 className="text-xl font-bold">{t.excellence}</h3>
              </div>
              <p>{t.excellenceDesc}</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaLightbulb className="text-yellow-400 text-3xl" />
                <h3 className="text-xl font-bold">{t.innovation}</h3>
              </div>
              <p>{t.innovationDesc}</p>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* What Makes Us Different */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.differentTitle}</h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">{t.differentDesc}</p>
          </div>
          <motion.div
            className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaHospital className="text-[#007799] text-3xl" />
                <h3 className="text-xl font-bold">{t.facilities}</h3>
              </div>
              <p>{t.facilitiesDesc}</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaStethoscope className="text-[#FF7A1A] text-3xl" />
                <h3 className="text-xl font-bold">{t.specialized}</h3>
              </div>
              <p>{t.specializedDesc}</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaMicroscope className="text-yellow-500 text-3xl" />
                <h3 className="text-xl font-bold">{t.diagnostics}</h3>
              </div>
              <p>{t.diagnosticsDesc}</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaAmbulance className="text-red-500 text-3xl" />
                <h3 className="text-xl font-bold">{t.emergency}</h3>
              </div>
              <p>{t.emergencyDesc}</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-green-600 text-3xl" />
                <h3 className="text-xl font-bold">{t.outreach}</h3>
              </div>
              <p>{t.outreachDesc}</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-xl p-6" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaUserMd className="text-purple-600 text-3xl" />
                <h3 className="text-xl font-bold">{t.team}</h3>
              </div>
              <p>{t.teamDesc}</p>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

// Reusable section wrapper
const SectionWrapper = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// Section Image with optional CEO name/role
const SectionImage = ({ src, alt, showName, showRole }) => (
  <motion.div
    className="lg:w-1/2 w-full flex flex-col justify-start order-1 lg:order-2"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <img
      src={src}
      alt={alt}
      className="rounded-xl w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover shadow-lg"
    />
    {showName && showRole && (
      <div className="mt-4 bg-white px-4 py-2 rounded-lg shadow-lg text-center text-black">
        <h3 className="text-lg font-bold">{showName}</h3>
        <p className="text-sm">{showRole}</p>
      </div>
    )}
  </motion.div>
);

// Section Text
const SectionText = ({ children }) => (
  <motion.div
    className="lg:w-1/2 w-full order-2 lg:order-1 space-y-4"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

export default AboutPage;
