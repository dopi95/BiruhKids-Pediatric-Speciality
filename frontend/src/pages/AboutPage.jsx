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
const clinicImage = "https://i.postimg.cc/bJ6GYR11/clinic-Image.jpg"

const ceoImage = "https://imgur.com/Jvnc3F4.jpg";

// ✅ Translations
const translations = {
  En: {
    aboutTitle: "About Us",
    aboutDesc:
      "Dedicated to providing exceptional healthcare services with compassion, innovation, and unwavering commitment to our patient’s wellbeing.",
    storyTitle: "Our Story",
    storyP1:
      "Biruh Kids was established in November 2024 as a premier pediatric specialty clinic in Addis Ababa, Ethiopia. Over the last eight months, we have been dedicated to providing comprehensive healthcare services for children, working tirelessly towards obtaining institutional status. At Biruh Kids, we currently offer a range of specialized services including Outpatient Department (OPD), emergency care, laboratory services, and ultrasound diagnostics to ensure that every child receives the highest standard of medical attention.",
    storyP2:
      "Our state-of-the-art facilities are equipped with advanced technology to support the diagnosis and treatment of various pediatric conditions. Whether it’s routine consultations or emergency interventions, our team of skilled doctors and specialists is committed to delivering exceptional care in a comfortable and compassionate environment, ensuring that every child’s health and well-being are our top priorities.",
    storyP3:
      "Among our staff are some of the most experienced pediatricians, radiologists, pediatric nurses, and laboratory technicians in Ethiopia. Biruh Kids stands out for its design, which is specifically tailored to meet the unique healthcare needs of children, ensuring that we provide comprehensive care for virtually every pediatric condition. We are proud to have built our reputation by offering the highest quality services and utilizing state-of-the-art medical equipment, all while maintaining affordable pricing.",
    ceoTitle: "Message from the CEO",
    ceoGreeting: "Dear Parents and Families,",
    ceoMsg1:
      "Welcome to Biruhkids Pediatric Clinic. In our center every child is at the heart of what we do. Our team is dedicated to provide not only the best medical and pediatric care but also kindness, comfort, and support for your family.",
    ceoMsg2:
      "We believe that healthy and bright children build a brighter tomorrow that is why our name is Biruhkids (Bright children) and we are honored to walk this journey with you.Thank you for trusting us with your child's care. Together, we'll help children grow bright, strong and healthy.",
    ceoMsgP: "With warm regards",
    ceoName:
      "Dr. Fasil Menbere ( MD, Senior Pediatrcian and Childhealth Expert)",
    officer: "Chief Executive Officer",
    biruhkids: "Biruhkids Pediatric Speciality Clinic",
    valuesTitle: "Our Core Values",
    valuesDesc:
      "These principles define who we are and guide every decision we make in our mission to serve children and families with integrity and care.",
    compassion: "Compassion",
    compassionDesc:
      "We are caring for every child with empathy and kindness to adress every child's health care need and treatment.",
    excellence: "Excellence",
    excellenceDesc:
      " We provide the highest quality Pediatric care in our outpatient and inpatient services with highly skilled healthcare professionals.",
    innovation: "Innovation",
    innovationDesc:
      "Our clinic is using up-to-date knowledge and skill on field of Pediatrics and childhealth.",
    Teamwork: "TeamWork",
    TeamworkDesc:
      "We working together with parents in our social media flatforms to build knowledgable families for better care of children",
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
    name: "Dr.Fasil Menbere",
    role: "CEO & Cofounder",
  },
  Am: {
    aboutTitle: "ስለ እኛ",
    aboutDesc:
      "ልዩ የጤና አጠባበቅ አገልግሎቶችን በርኅራኄ፣ ፈጠራ እና የማያወላውል ለታካሚዎቻችን ደህንነት ለመስጠት የተጋ ነው።",
    storyTitle: "ታሪካችን",
    storyP1:
      "ብሩህ ኪድስ በ ህዳር 2017 በአዲስ አበባ፣ ኢትዮጵያ ውስጥ እንደ ፕሪሚየር የህፃናት ስፔሻሊቲ ክሊኒክ ተቋቋመ። ባለፉት ስምንት ወራት ውስጥ ለህጻናት ሁሉን አቀፍ የጤና እንክብካቤ አገልግሎት ለመስጠት ቆርጠን ተነስተናል፣ ተቋማዊ ደረጃ ለማግኘት ደከመኝ ሰለቸኝ ሳንል እየሰራን ነው። በብሩህ ኪድስ በአሁኑ ወቅት እያንዳንዱ ህጻን ከፍተኛውን የህክምና ክትትል እንዲያገኝ ለማድረግ የተመላላሽ ታካሚ ዲፓርትመንት (OPD)፣ የድንገተኛ ህክምና፣ የላብራቶሪ አገልግሎት እና የአልትራሳውንድ ምርመራዎችን ጨምሮ ልዩ ልዩ አገልግሎቶችን እንሰጣለን።",
    storyP2:
      "የእኛ ዘመናዊ ፋሲሊቲዎች የተለያዩ የሕፃናት ሕክምናን ለመመርመር እና ለማከም የላቀ ቴክኖሎጂ የታጠቁ ናቸው። መደበኛ ምክክርም ሆነ የድንገተኛ ጊዜ ጣልቃገብነቶች፣ የእኛ የተካኑ ዶክተሮች እና ስፔሻሊስቶች ቡድን ምቹ እና ሩህሩህ በሆነ አካባቢ ውስጥ ልዩ እንክብካቤን ለማቅረብ ቁርጠኛ ነው፣ ይህም የእያንዳንዱ ልጅ ጤና እና ደህንነት ቅድሚያ የምንሰጣቸው ጉዳዮች መሆናቸውን በማረጋገጥ ነው።",
    storyP3:
      "ከሰራተኞቻችን መካከል በኢትዮጵያ ውስጥ በጣም ልምድ ካላቸው የሕፃናት ሐኪሞች፣ ራዲዮሎጂስቶች፣ የሕፃናት ነርሶች እና የላብራቶሪ ቴክኒሻኖች መካከል ጥቂቶቹ ናቸው። ብሩህ ኪድስ ለዲዛይኑ ጎልቶ ይታያል፣ይህም በተለይ የህጻናትን ልዩ የጤና እንክብካቤ ፍላጎቶች ለማሟላት የተዘጋጀ ነው፣ይህን ማለት ይቻላል ለእያንዳንዱ የህፃናት ህመም አጠቃላይ እንክብካቤን የምንሰጥ መሆኑን ያረጋግጣል። ከፍተኛ ጥራት ያለው አገልግሎት በመስጠት እና ዘመናዊ የህክምና መሳሪያዎችን በመጠቀም ስማችንን በመገንባታችን ኩራት ይሰማናል።",
    ceoTitleAmh: "ከዋና ስራ አስኪያጁ የተላከ መልእክት",
    ceoGreetingAmh: "ውድ ወላጆች እና ቤተሰቦች፣",
    ceoMsg1Amh:
      "እንኳን ወደ ብሩህኪድስ የህፃናት ህክምና ክሊኒክ በደህና መጡ። በማዕከላችን ውስጥ ለእያንዳንዱ ልጅ የምናደርገው ነገር ከልብ ነው። ቡድናችን ምርጡን ህክምና እና የህፃናት ህክምና ብቻ ሳይሆን ደግነትን፣ ምቾትን እና ለቤተሰብዎ ድጋፍ ለመስጠት ቆርጦ ተነስቷል።",
    ceoMsg2Amh:
      "ጤናማ እና ብሩህ ልጆች ነገን የበለጠ ብሩህ እንደሚገነቡ እናምናለን ለዚህም ነው ስማችን ብሩህኪድስ (ደማቅ ልጆች) ይባላል እናም ይህንን ጉዞ ከእርስዎ ጋር በመጓዝ ታላቅ ክብር ይሰማናል። በልጅዎ እንክብካቤ ስላመኑን እናመሰግናለን። አንድ ላይ፣ ልጆች ብሩህ፣ ጠንካራ እና ጤናማ እንዲሆኑ እንረዳቸዋለን።",
    ceoMsgPAmh: "ከሠላምታ ጋር",
    ceoNameAmh: "ፋሲል መንበረ (ዶ/ር፣ ከፍተኛ የሕፃናት ሐኪም እና የሕፃናት ጤና ኤክስፐርት)",
    officerAmh: "ዋና ሥራ አስፈፃሚ",
    biruhkidsAmh: "ብሩህኪድስ የሕፃናት ስፔሻሊቲ ክሊኒክ",
    valuesTitle: "ዋና እሴቶቻችን",
    valuesDesc:
      "እነዚህ መርሆዎች እኛን የምንሆነውን ይገልጻሉ እና ልጆችንና ቤተሰቦችን በክብር እና በእውነት ለማገልገል የምንወስድበትን ውሳኔ ያመራሉ።",
    compassion: "ርኅራኄ",
    compassionDesc:
      "የእያንዳንዱን ልጅ የጤና እንክብካቤ ፍላጎት እና ህክምና ለማሟላት የእያንዳንዱን ልጅ ችግር በመረዳት እና በደግነት እየተንከባከብን ነው።",
    excellence: "ከፍተኛ ችሎታ",
    excellenceDesc:
      "በእኛ የተመላላሽ እና የመኝታ ክፍል አገልግሎቶች ከፍተኛ ብቃት ካላቸው የጤና እንክብካቤ ባለሙያዎች ጋር ከፍተኛ ጥራት ያለው የሕፃናት ሕክምና እንሰጣለን።",
    innovation: "ፈጠራ",
    innovationDesc:
      "ክሊኒኩ በሕፃናት ሕክምና እና በልጆች ላይ ባለው መስክ ላይ ወቅታዊ የሆኑ ዕውቀት እና ችሎታን ይጠቀማል።",
    Teamwork: "የቡድን ስራ",
    TeamworkDesc: "እኛ ማህበራዊ ሚዲያን በመጠቀም የተሻሉ ቤተሰቦችን ለመገንባት ከወላጆች ጋር አብረን እንሰራለን",
    differentTitle: "ምን ልዩ ያደርገናል?",
    differentDesc:
      "በብሩህ ኪድስ፣ ደህንነቱ የተጠበቀ፣ ፈጠራ እና ህጻናትን ያማከለ አካባቢ ለመፍጠር ከመደበኛ የህፃናት ህክምና አልፈን እንሄዳለን። ይህ ልዩ ያደርገናል።",
    facilities: "ዘመናዊ ተቋማት",
    facilitiesDesc:
      "ዓለም አቀፍ ደረጃውን የጠበቀ እንክብካቤ በሚሰጥበት ጊዜ ለህጻናት እና ለቤተሰብ ምቾትን የሚያረጋግጥ ለህጻናት ተስማሚ የሆነ ዲዛይን ያለው ዘመናዊ የህጻናት ክሊኒክ።",
    specialized: "ልዩ የህፃናት ህክምና",
    specializedDesc:
      "የተሟላ የሕፃናት አገልግሎቶች የእድገት ግምገማዎች ልምድ ያላቸው የሕክምና እንክብካቤዎች፣ ነርሶች እና ራዲዮሎጂስቶች እንሰጣለን።",
    diagnostics: "የላቀ ምርመራዎች",
    diagnosticsDesc:
      "ፈጣን እና ትክክለኛ ውጤቶችን ለህጻናት በማረጋገጥ የቅርብ ጊዜውን የአልትራሳውንድ ቴክኖሎጂ በመጠቀም የላብራቶሪ እና ኢሜጂንግ አገልግሎቶች እንሰጣለን።",
    emergency: "ድንገተኛ የሕፃናት ሕክምና",
    emergencyDesc:
      "ወሳኝ በሆኑ ሁኔታዎች ውስጥ ፈጣን ምላሽ እና ውጤታማ ህክምናን የሚያረጋግጥ የሰለጠኑ ስፔሻሊስቶች የተሰጠ የህፃናት ድንገተኛ ክፍል።",
    outreach: "ማህበረሰብ ጋር ተደራሽነት",
    outreachDesc:
      "በማህበራዊ ሚዲያ ለ4+ አመታት ቤተሰቦችን በንቃት በማስተማር፣የህፃናት ጤና እውቀትን ማስፋፋት እና ወላጆችን ማብቃት።",
    team: "የተዋጣለት ቡድን",
    teamDesc:
      "ርህሩህ የህፃናት ሐኪሞች፣ ነርሶች፣ ራዲዮሎጂስቶች እና ድጋፍ ሰጪ ሰራተኞች ከመጀመሪያ እስከ መጨረሻ ድረስ እንከን የለሽ፣ ለቤተሰብ ተስማሚ የሆነ እንክብካቤን ያረጋግጣሉ።",
    name: "ዶ/ር ፋሲል መንበረ",
    role: "መስራች",
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
      <section className="bg-blue-500 text-white text-center px-4 py-12 sm:py-16 lg:py-24">
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
            <p className="text-gray-700 text-justify leading-relaxed">
              {t.storyP1}
            </p>
            <p className="text-gray-700 text-justify leading-relaxed mt-2">
              {t.storyP2}
            </p>
            <p className="text-gray-700 text-justify leading-relaxed mt-2">
              {t.storyP3}
            </p>
          </SectionText>
        </div>
      </SectionWrapper>

      {/* CEO Section */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12">
          {/* Mobile Title */}
          <h1 className="text-3xl font-bold mb-6 text-center lg:hidden">
            {lang === "Am" ? t.ceoTitleAmh : t.ceoTitle}
          </h1>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <SectionText>
              {/* Desktop Title */}
              <h1 className="hidden lg:block text-3xl font-bold mb-6 text-center lg:text-left">
                {lang === "Am" ? t.ceoTitleAmh : t.ceoTitle}
              </h1>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {lang === "Am" ? t.ceoGreetingAmh : t.ceoGreeting}
              </h2>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                {lang === "Am" ? t.ceoMsg1Amh : t.ceoMsg1}
              </p>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                {lang === "Am" ? t.ceoMsg2Amh : t.ceoMsg2}
              </p>
              <p className="text-base leading-relaxed text-gray-600 italic mb-4">
                {lang === "Am" ? t.ceoMsgPAmh : t.ceoMsgP}
              </p>
              <div className="text-base leading-relaxed text-gray-800">
                <p className="font-bold">
                  {lang === "Am" ? t.ceoNameAmh : t.ceoName}
                </p>
                <p className="text-gray-600">
                  {lang === "Am" ? t.officerAmh : t.officer}
                </p>
                <p className="text-gray-600">
                  {lang === "Am" ? t.biruhkidsAmh : t.biruhkids}
                </p>
              </div>
            </SectionText>
            <SectionImage
              src={ceoImage}
              alt="CEO"
              showName={lang === "Am" ? t.ceoNameAmh : t.ceoName}
              showRole={lang === "Am" ? t.officerAmh : t.officer}
            />
          </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.valuesTitle}
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t.valuesDesc}
            </p>
          </div>
          <motion.div
            className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaHandsHelping className="text-[#007799] text-3xl" />
                <h3 className="text-xl font-bold">{t.compassion}</h3>
              </div>
              <p>{t.compassionDesc}</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaMedal className="text-[#FF7A1A] text-3xl" />
                <h3 className="text-xl font-bold">{t.excellence}</h3>
              </div>
              <p>{t.excellenceDesc}</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaLightbulb className="text-yellow-400 text-3xl" />
                <h3 className="text-xl font-bold">{t.innovation}</h3>
              </div>
              <p>{t.innovationDesc}</p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-green-500 text-3xl" />
                <h3 className="text-xl font-bold">{t.Teamwork}</h3>
              </div>
              <p>{t.TeamworkDesc}</p>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* What Makes Us Different */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.differentTitle}
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t.differentDesc}
            </p>
          </div>
          <motion.div
            className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaHospital className="text-[#007799] text-3xl" />
                <h3 className="text-xl font-bold">{t.facilities}</h3>
              </div>
              <p>{t.facilitiesDesc}</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaStethoscope className="text-[#FF7A1A] text-3xl" />
                <h3 className="text-xl font-bold">{t.specialized}</h3>
              </div>
              <p>{t.specializedDesc}</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaMicroscope className="text-yellow-500 text-3xl" />
                <h3 className="text-xl font-bold">{t.diagnostics}</h3>
              </div>
              <p>{t.diagnosticsDesc}</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaAmbulance className="text-red-500 text-3xl" />
                <h3 className="text-xl font-bold">{t.emergency}</h3>
              </div>
              <p>{t.emergencyDesc}</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-green-600 text-3xl" />
                <h3 className="text-xl font-bold">{t.outreach}</h3>
              </div>
              <p>{t.outreachDesc}</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6"
              variants={cardVariants}
            >
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
