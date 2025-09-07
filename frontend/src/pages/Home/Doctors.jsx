import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { doctorAPI } from "../../services/doctorApi"; 

export default function DoctorsSlider({ lang }) {
  const [current, setCurrent] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await doctorAPI.getDoctors();
        setDoctors(response.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to load doctors");
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Create infinite scroll effect by duplicating doctors only if needed
  const getDuplicatedDoctors = () => {
    if (doctors.length <= 1) return doctors; // Don't duplicate if there's only one doctor
    return [...doctors, ...doctors];
  };

  const duplicatedDoctors = getDuplicatedDoctors();

  const getVisibleCards = () => {
    return window.innerWidth < 768 ? 1 : 3;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCards(mobile ? 1 : 3);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (doctors.length === 0) return;
    
    setIsTransitioning(true);
    setCurrent((prev) => {
      if (prev >= doctors.length - 1) {
        // When we reach the end, jump to beginning without animation
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrent(0);
        }, 500);
        return prev + 1;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    if (doctors.length === 0) return;
    
    setIsTransitioning(true);
    setCurrent((prev) => {
      if (prev <= 0) {
        // When we reach the beginning, jump to end without animation
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrent(doctors.length - 1);
        }, 500);
        return -1;
      }
      return prev - 1;
    });
  };

  const handleTransitionEnd = () => {
    if (current >= doctors.length) {
      setIsTransitioning(false);
      setCurrent(0);
    } else if (current < 0) {
      setIsTransitioning(false);
      setCurrent(doctors.length - 1);
    }
  };

  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || doctors.length === 0) return;
    const currentX = e.touches[0].clientX;
    const diffX = startXRef.current - currentX;

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(calc(-${
        (100 / visibleCards) * current
      }% - ${diffX}px))`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!isDraggingRef.current || doctors.length === 0) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startXRef.current - endX;

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${
        (100 / visibleCards) * current
      }%)`;
    }

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDraggingRef.current = false;
  };

  useEffect(() => {
    if (doctors.length === 0) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [current, visibleCards, doctors.length]);

  // Motion variants
  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const subheadingVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Texts
  const texts = {
    en: {
      title: "Meet Our Doctors",
      subtitle: "Our team of experienced healthcare professionals is dedicated to providing you with the best possible care.",
      experience: "years of experience",
      noDoctors: "No doctors available at the moment."
    },
    am: {
      title: "ዶክተሮቻችንን ያግኙ",
      subtitle: "የተሞክሮ ያላቸው የጤና ባለሙያዎቻችን ለእርስዎ በቻለበት ሁሉ ምርጥ እንክብካቤ ለመስጠት ተደነግገዋል።",
      experience: "የስራ ልምድ",
      noDoctors: "በአሁኑ ጊዜ ምንም ዶክተሮች የሉም።"
    },
  };

  const currentLang = lang === "En" ? "en" : "am";

  if (loading) {
    return (
      <article className="w-full py-20 bg-gray-50">
        <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-12"></div>
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-300 rounded-lg h-96 w-72"></div>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="w-full py-20 bg-gray-50">
        <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </article>
    );
  }

  if (doctors.length === 0) {
    return (
      <article className="w-full py-20 bg-gray-50">
        <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              variants={headingVariants}
            >
              {texts[currentLang].title}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              variants={subheadingVariants}
            >
              {texts[currentLang].noDoctors}
            </motion.p>
          </motion.div>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full py-20 bg-gray-50">
      <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            variants={headingVariants}
          >
            {texts[currentLang].title}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={subheadingVariants}
          >
            {texts[currentLang].subtitle}
          </motion.p>
        </motion.div>

        {/* Slider */}
        <div className="w-full relative">
          <div className="overflow-hidden mx-0 md:mx-12">
            <motion.div
              ref={containerRef}
              className="flex pb-2"
              style={{
                transform: `translateX(-${(100 / visibleCards) * current}%)`,
                transition: isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
              onTouchStart={isMobile ? handleTouchStart : undefined}
              onTouchMove={isMobile ? handleTouchMove : undefined}
              onTouchEnd={isMobile ? handleTouchEnd : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {duplicatedDoctors.map((doctor, index) => (
                <motion.div
                  key={`${doctor._id}-${index}`}
                  className="px-2 md:px-4 flex-shrink-0"
                  style={{ width: `${100 / visibleCards}%` }}
                  variants={cardVariants}
                  custom={index % doctors.length}
                >
                  <div className="bg-white rounded-lg shadow-lg h-full mx-2 md:mx-0 overflow-hidden group hover:shadow-xl hover:scale-[1.03] transition-all duration-300">
                    <div className="relative">
                     <img
  src={doctor.photo ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/${doctor.photo}` : "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"}
  alt={doctor.name}
  className="w-full h-80 object-cover"
  onError={(e) => {
    e.target.src = "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop";
  }}
/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {currentLang === "en" ? doctor.name : doctor.nameAmh}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">
                        {currentLang === "en" ? doctor.field : doctor.fieldAmh}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {currentLang === "en" ? doctor.experience : doctor.experienceAmh} {texts[currentLang].experience}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Prev/Next buttons - Only show if there's more than one doctor */}
          {doctors.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* Indicators - Only show if there's more than one doctor */}
        {doctors.length > 1 && (
          <div className="flex justify-center mt-8">
            {doctors.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrent(index);
                }}
                className={`h-3 w-3 rounded-full mx-1 transition-all duration-300 ${
                  current % doctors.length === index
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                whileTap={{ scale: 1.3 }}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}