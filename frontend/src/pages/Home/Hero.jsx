import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const autoPlayRef = useRef();
    const carouselRef = useRef(null);

    const slides = [
        {
            id: 1,
            backgroundImage:
                "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1920",
            title: "Welcome to Innovation",
            tagline:
                "Discover the future of technology with cutting-edge solutions",
        },
        {
            id: 2,
            backgroundImage:
                "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1920",
            title: "Build Something Amazing",
            tagline:
                "Transform your ideas into reality with our powerful platform",
        },
        {
            id: 3,
            backgroundImage:
                "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1920",
            title: "Connect & Collaborate",
            tagline:
                "Join thousands of creators building the next generation of apps",
        },
        {
            id: 4,
            backgroundImage:
                "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1920",
            title: "Scale Your Dreams",
            tagline: "From startup to enterprise, we grow with your ambitions",
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
                carousel.removeEventListener(
                    "transitionend",
                    handleTransitionEnd
                );
        }
    }, [currentSlide, slides.length]);

    useEffect(() => {
        // Always autoplay regardless of hover state
        autoPlayRef.current = setInterval(goToNext, 3000);

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
    const fullText = "BiruhKids Pediatric Specialty";
    const [typedText, setTypedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;
        const typeSpeed = 50;
        const pauseTime = 3000; // 2s pause after typing

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
    }, [typedText, isDeleting]);

    return (
        <div className="relative h-[90vh] overflow-hidden">
            <div
                ref={carouselRef}
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                // Removed onMouseEnter and onMouseLeave handlers that were controlling autoplay
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
                                        {slide.title}
                                    </span>
                                </h3>
                                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                                    {slide.tagline}
                                </p>
                                <div className="flex flex-col mt-10 gap-4 sm:flex-row sm:justify-center sm:gap-6">
                                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-700 hover:to-orange-800 text-white p-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        <Link to="/appointment">
                                            Book Appointment
                                        </Link>
                                    </button>
                                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        <Link to="/register">Get Started</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={goToPrev}
                className="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={goToNext}
                className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 space-x-3 z-10">
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

            <div className="md:hidden flex flex-col absolute right-4 top-1/2 transform -translate-y-1/2 space-y-3 z-10">
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
