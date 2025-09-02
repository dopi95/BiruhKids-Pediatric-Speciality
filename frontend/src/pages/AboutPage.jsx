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

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Intro Section */}
      <section className="bg-[#007799] text-white text-center px-4 py-12 sm:py-16 lg:py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-center lg:text-left">
          Dedicated to providing exceptional healthcare services with compassion,
          innovation, and unwavering commitment to our patients' wellbeing.
        </p>
      </section>

      {/* Our Story Section */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          <SectionImage src={clinicImage} alt="Clinic Building"/>
        
          <SectionText>
            <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Biruh Kids was established in November 2024 as a premier pediatric specialty clinic in Addis Ababa, Ethiopia. 
              Over the last eight months, we have been dedicated to providing comprehensive healthcare services for children, 
              working tirelessly towards obtaining institutional status. At Biruh Kids, we currently offer a range of 
              specialized services including Outpatient Department (OPD), emergency care, laboratory services,
               and ultrasound diagnostics to ensure that every child receives the highest standard of medical attention.</p>

              <p className="text-gray-700 leading-relaxed mt-2">
              Our state-of-the-art facilities are equipped with advanced technology to support the diagnosis and treatment 
              of various pediatric conditions. Whether it’s routine consultations or emergency interventions, our team of 
              skilled doctors and specialists is committed to delivering exceptional care in a comfortable and 
              compassionate environment, ensuring that every child’s health and well-being are our top priorities.</p>

            <p className="text-gray-700 leading-relaxed mt-2">
              Among our staff are some of the most experienced pediatricians, radiologists, pediatric nurses, and 
              laboratory technicians in Ethiopia.
              Biruh Kids stands out for its design, which is specifically tailored to meet the unique 
              healthcare needs of children, ensuring that we provide comprehensive care for virtually 
              every pediatric condition. We are proud to have built our reputation by offering the highest 
              quality services and utilizing state-of-the-art medical equipment, all while maintaining 
              affordable pricing.</p>
          </SectionText>
        </div>
      </SectionWrapper>

      {/* CEO Section */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <SectionText>
            <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">
              Message from Our CEO
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At HealthCare Clinic, we believe that exceptional healthcare is not just about treating illness, 
              but about caring for the whole person.
            </p>
          </SectionText>
          <SectionImage src={ceoImage} alt="CEO" showName="Dr. Fasil Menbere" showRole="CEO & Founder" />
        </div>
      </SectionWrapper>

      {/* Vision & Mission Section */}
      <SectionWrapper>
        <motion.div
          className="py-16 px-4 sm:px-6 lg:px-12 bg-white max-w-6xl mx-auto grid gap-8 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-start text-left border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaEye className="text-[#007799] text-3xl" />
              <h3 className="text-xl font-bold">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be recognized as a center of excellence in pediatric specialty care, 
              where every child is valued, every family is supported, and every life is given the 
              opportunity to grow in health and happiness. 
              We envision a future where access, compassion, and innovation create brighter 
              possibilities for children everywhere.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-start text-left border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaHeart className="text-[#FF7A1A] text-3xl" />
              <h3 className="text-xl font-bold">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to deliver outstanding pediatric care that blends advanced 
              medical expertise with genuine compassion. We are committed to working 
              alongside families, providing evidence-based treatments in a child-friendly 
              environment, and nurturing not only physical health but also resilience, 
              confidence, and emotional well-being in every child we serve.
            </p>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* Core Values Section */}
      <SectionWrapper>
        <div className="py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
              These principles define who we are and guide every decision we make 
              in our mission to serve children and families with integrity and care.
            </p>
          </div>

          <motion.div
            className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-start border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaHandsHelping className="text-[#007799] text-3xl" />
                <h3 className="text-xl font-bold">Compassion</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We place empathy at the heart of care, listening deeply, 
                responding kindly, and honoring every child’s unique needs and experiences.
              </p>
            </motion.div>

            <motion.div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-start border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaMedal className="text-[#FF7A1A] text-3xl" />
                <h3 className="text-xl font-bold">Excellence</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We pursue the highest standards in healthcare, 
                striving for precision, safety, and continuous improvement in all we do.
              </p>
            </motion.div>

            <motion.div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-start border border-gray-200 hover:scale-105 transition duration-300 cursor-pointer" variants={cardVariants}>
              <div className="flex items-center gap-3 mb-4">
                <FaLightbulb className="text-yellow-400 text-3xl" />
                <h3 className="text-xl font-bold">Innovation</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We embrace creativity and new technologies, 
                seeking fresh solutions that make pediatric care more effective, accessible, and hopeful.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

// Reusable section wrapper with scroll animation
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
