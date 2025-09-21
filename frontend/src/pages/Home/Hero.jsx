import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import re from '../../assets/re.jpg';
import building from '../../assets/building.jpg';
import off from '../../assets/off.jpg';
import laboratory from '../../assets/labratory.jpg';



const Hero = ({ lang = "En" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const autoPlayRef = useRef();
  const carouselRef = useRef(null);

  // English + Amharic text
  const slides = [
    {
      id: 1,
      backgroundImage:
       re,
      title: {
        en: "Pediatric healthcare services",
        am: "የህፃናት ጤና አገልግሎቶች",
      },
      tagline: {
        en: "designed to meet the unique needs of children, ensuring their health, growth, and development are supported every step of the way.",
        am: "ልዩ የህፃናት ፍላጎት ለማሟላት የተነደፈ፣ ጤንነታቸውን እና እድገታቸውን በእያንዳንዱ እርምጃ እንዲደገፉ የተዘጋጀ።",
      },
    },
    {
      id: 2,
      backgroundImage:
       building,
      title: {
        en: "Outpatient care (OPD)",
        am: "የውጭ ሕክምና አገልግሎት (OPD)",
      },
      tagline: {
        en: "Our clinic provides comprehensive evaluations, diagnoses, and treatments for children of all ages.",
        am: "ክሊኒካችን ለሁሉም እድሜ የህፃናት ሙሉ ግምገማ፣ ምርመራ እና ህክምና ያቀርባል።",
      },
    },
    {
      id: 3,
      backgroundImage:
        off,
      title: {
        en: "Emergency care",
        am: "አደጋ ጊዜ አገልግሎት",
      },
      tagline: {
        en: "We offer urgent medical services for children in need of immediate attention.",
        am: "እንቅስቃሴ ያስፈልጋቸውን ህፃናት አስቸኳይ የሕክምና አገልግሎት እንሰጣለን።",
      },
    },
    {
      id: 4,
      backgroundImage:
        laboratory,
      title: {
        en: "Laboratory and Imaging Services",
        am: "የላቦራቶሪ እና ምስል አገልግሎቶች",
      },
      tagline: {
        en: "Our clinic is equipped with state-of-the-art laboratory machines and advanced imaging technology using the latest ultrasound (US) systems.",
        am: "ክሊኒካችን በዘመናዊ የላቦራቶሪ መሳሪያዎች እና በላቀ የምስል ቴክኖሎጂ ከአዳዲስ የአልትራሳውንድ (US) ስርዓቶች ጋር የተዘጋጀ ነው።",
      },
    },
  ];

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index + 1);
  }, []);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  }, [isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  }, [isTransitioning]);

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      if (currentSlide === 0) {
        if (carouselRef.current) {
          carouselRef.current.style.transition = "none";
          setCurrentSlide(slides.length);
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition =
                "transform 0.7s ease-in-out";
            }
          }, 50);
        }
      } else if (currentSlide === slides.length + 1) {
        if (carouselRef.current) {
          carouselRef.current.style.transition = "none";
          setCurrentSlide(1);
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition =
                "transform 0.7s ease-in-out";
            }
          }, 50);
        }
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        carousel.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [currentSlide, slides.length]);

  useEffect(() => {
    autoPlayRef.current = setInterval(goToNext, 9000);
    return () => clearInterval(autoPlayRef.current);
  }, [goToNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) goToNext();
    else if (distance < -50) goToPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getActualSlideIndex = () => {
    if (currentSlide === 0) return slides.length - 1;
    if (currentSlide === slides.length + 1) return 0;
    return currentSlide - 1;
  };

  // --- TYPEWRITER EFFECT ---
  const clinicName = {
    en: "BiruhKids Pediatric Specialty Clinic",
    am: "ብሩህኪድስ የህፃናት ልዩ ክሊኒክ",
  };

  const fullText = lang === "En" ? clinicName.en : clinicName.am;
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTypedText(""); // reset when lang changes
    setIsDeleting(false);
  }, [fullText]);

  useEffect(() => {
    let timeout;
    const typeSpeed = 50;
    const pauseTime = 3000;

    if (!isDeleting && typedText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && typedText === "") {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else {
      timeout = setTimeout(() => {
        setTypedText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }, typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, fullText]);

  const currentLang = lang === "En" ? "en" : "am";

  return (
    <div className="relative h-[92vh] overflow-hidden">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="min-w-full h-full relative bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-orange-500 to-blue-700 bg-clip-text text-transparent">
                    {typedText}
                  </span>
                </h2>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    {slide.title[currentLang]}
                  </span>
                </h3>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                  {slide.tagline[currentLang]}
                </p>
                <div className="flex flex-col mt-10 gap-4 sm:flex-row sm:justify-center sm:gap-6">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-700 hover:to-orange-800 text-white p-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <Link to="/appointment">
                      {currentLang === "am" ? "ቀጠሮ ያስይዙ" : "Book Appointment"}
                    </Link>
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <Link to="/register">
                      {currentLang === "am" ? "ይጀምሩ" : "Get Started"}
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={goToPrev}
        className="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="flex absolute bottom-8 left-1/2 transform -translate-x-1/2 space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === getActualSlideIndex()
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
