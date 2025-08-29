import React from "react";
import { FaEye, FaHeart, FaHandsHelping, FaMedal, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Placeholder images
const clinicImage = "https://imgur.com/Jvnc3F4.jpg";
const ceoImage = "https://imgur.com/Jvnc3F4.jpg";

const AboutPage = () => {
  // Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const impactNumbersTarget = {
    years: 3,
    patients: 5000,
    staff: 50,
    services: 20,
    satisfaction: 100,
  };

  const ImpactNumber = ({ value }) => {
    const { ref, inView } = useInView({ triggerOnce: true }); // ✅ only once
    const [num, setNum] = React.useState(0);

    React.useEffect(() => {
      if (!inView) return;
      let start = 0;
      const duration = 2000;
      const intervalTime = 30;
      const interval = setInterval(() => {
        start += intervalTime;
        const newValue = Math.min(Math.floor((start / duration) * value), value);
        setNum(newValue);
        if (start >= duration) clearInterval(interval);
      }, intervalTime);
      return () => clearInterval(interval);
    }, [inView, value]);

    return (
      <h3 ref={ref} className="text-2xl font-bold mb-1">
        {num}
        {value >= 100 ? "%" : "+"}
      </h3>
    );
  };

  return (
    <div className="flex flex-col">

      {/* Intro Section */}
      <section className="bg-[#007799] text-white text-center px-4 py-12 sm:py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
          Dedicated to providing exceptional healthcare services with compassion,
          innovation, and unwavering commitment to our patients' wellbeing.
        </p>
      </section>

      {/* Our Story Section */}
      <SectionWrapper>
        <div className="py-20 px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <SectionImage src={clinicImage} alt="Clinic Building" />
          <SectionText>
            <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">Our Story</h2>
            <p>
              Founded in 2010, HealthCare Clinic began with a simple yet powerful vision:
              to provide world-class healthcare services that are accessible, compassionate,
              and centered around our patients' needs.
            </p>
            <p>
              What started as a small clinic with just a few dedicated healthcare professionals
              has grown into a comprehensive medical facility serving thousands of patients
              across our community. Our journey has been marked by continuous growth,
              innovation, and an unwavering commitment to excellence.
            </p>
            <p>
              Over the years, we have expanded our services, invested in cutting-edge technology,
              and built a team of exceptional medical professionals who share our passion
              for healing and caring. Today, we stand as a trusted healthcare partner, known
              for our clinical excellence and patient-centered approach.
            </p>
          </SectionText>
        </div>
      </SectionWrapper>

      {/* Vision & Mission Section */}
      <SectionWrapper>
        <motion.div
          className="py-20 px-4 sm:px-8 bg-white max-w-4xl mx-auto grid gap-8 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}  // ✅ only once
          variants={containerVariants}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center text-center border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer"
            variants={cardVariants}
          >
            <FaEye className="text-[#007799] text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p>
              To be the leading pediatric specialty clinic providing world-class care
              with compassion and innovation.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center text-center border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer"
            variants={cardVariants}
          >
            <FaHeart className="text-[#FF7A1A] text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p>
              Deliver exceptional, patient-centered pediatric care while fostering trust
              and wellness for every child.
            </p>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* Core Values Section */}
      <SectionWrapper>
        <div className="py-20 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              These fundamental principles guide our decisions, shape our culture,
              and define who we are as a healthcare organization.
            </p>
          </div>

          <motion.div
            className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}   // ✅ only once
            variants={containerVariants}
          >
            <motion.div className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer" variants={cardVariants}>
              <FaHandsHelping className="text-[#007799] text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Compassion</h3>
              <p>We prioritize empathy and understanding in every interaction.</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer" variants={cardVariants}>
              <FaMedal className="text-[#FF7A1A] text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p>Our commitment to high-quality care drives continuous improvement.</p>
            </motion.div>

            <motion.div className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer" variants={cardVariants}>
              <FaLightbulb className="text-yellow-400 text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p>We embrace new ideas and technologies to enhance outcomes.</p>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* CEO Section */}
      <SectionWrapper>
        <div className="py-20 px-4 sm:px-8 flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          <SectionText>
            <h2 className="text-3xl font-bold mb-6">Message from Our CEO</h2>
            <p>
              At HealthCare Clinic, we believe that exceptional healthcare is not just about treating illness, but about caring for the whole person.
            </p>
          </SectionText>
          <SectionImage src={ceoImage} alt="CEO" showName="Dr. Fasil Menbere" showRole="CEO & Founder"/>
        </div>
      </SectionWrapper>

      {/* Impact Section */}
      <SectionWrapper>
        <section className=" text-[#FF7A1A] py-12 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Our Impact</h2>
            <p className="max-w-3xl mx-auto text-sm sm:text-base">
              Numbers that reflect our commitment to excellence.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 text-center">
            <ImpactNumber value={impactNumbersTarget.years}/>
            <ImpactNumber value={impactNumbersTarget.patients}/>
            <ImpactNumber value={impactNumbersTarget.staff}/>
            <ImpactNumber value={impactNumbersTarget.services}/>
            <ImpactNumber value={impactNumbersTarget.satisfaction}/>
          </div>
        </section>
      </SectionWrapper>
    </div>
  );
};

// Reusable section wrapper with scroll animation
const SectionWrapper = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 }); // ✅ only once
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
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
    viewport={{ once: true }}   // ✅ only once
    transition={{ duration: 0.8 }}
  >
    <img src={src} alt={alt} className="rounded-xl w-full h-64 lg:h-96 object-cover shadow-lg"/>
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
    viewport={{ once: true }}   // ✅ only once
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

export default AboutPage;


