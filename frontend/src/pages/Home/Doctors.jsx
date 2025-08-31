import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DoctorsSlider() {
    const [current, setCurrent] = useState(0);
    const containerRef = useRef(null);
    const startXRef = useRef(0);
    const isDraggingRef = useRef(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const doctors = [
        {
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            experience: "15 years",
            image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        },
        {
            name: "Dr. Michael Chen",
            specialty: "Emergency Medicine",
            experience: "12 years",
            image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        },
        {
            name: "Dr. Emily Davis",
            specialty: "General Medicine",
            experience: "10 years",
            image: "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        },
        {
            name: "Dr. Amy Smith",
            specialty: "General Medicine",
            experience: "10 years",
            image: "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        },
        {
            name: "Dr. Susan Lee",
            specialty: "General Medicine",
            experience: "10 years",
            image: "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        },
    ];

    // Create a duplicated array for seamless looping
    const duplicatedDoctors = [...doctors, ...doctors];

    // Determine number of visible cards
    const getVisibleCards = () => {
        return window.innerWidth < 768 ? 1 : 3; // Mobile: 1 card, Desktop: 3 cards
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
        setIsTransitioning(true);
        setCurrent((prev) => {
            if (prev >= doctors.length - 1) {
                // After transitioning to the duplicate, quickly reset without animation
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
        setIsTransitioning(true);
        setCurrent((prev) => {
            if (prev <= 0) {
                // After transitioning to the duplicate, quickly reset without animation
                setTimeout(() => {
                    setIsTransitioning(false);
                    setCurrent(doctors.length - 1);
                }, 500);
                return -1;
            }
            return prev - 1;
        });
    };

    // Handle transition end to reset position seamlessly
    const handleTransitionEnd = () => {
        if (current >= doctors.length) {
            setIsTransitioning(false);
            setCurrent(0);
        } else if (current < 0) {
            setIsTransitioning(false);
            setCurrent(doctors.length - 1);
        }
    };

    // Swipe handling for mobile
    const handleTouchStart = (e) => {
        isDraggingRef.current = true;
        startXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (!isDraggingRef.current) return;

        const currentX = e.touches[0].clientX;
        const diffX = startXRef.current - currentX;

        // Add a slight drag effect while swiping
        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(calc(-${
                (100 / visibleCards) * current
            }% - ${diffX}px))`;
        }
    };

    const handleTouchEnd = (e) => {
        if (!isDraggingRef.current) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = startXRef.current - endX;

        // Reset transform
        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(-${
                (100 / visibleCards) * current
            }%)`;
        }

        // Determine if it's a swipe (more than 50px)
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - go to next slide
                nextSlide();
            } else {
                // Swipe right - go to previous slide
                prevSlide();
            }
        }

        isDraggingRef.current = false;
    };

    // Auto-play
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [current, visibleCards]);

    return (
        <article className="w-full py-20 bg-gray-50">
            <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Meet Our Doctors
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our team of experienced healthcare professionals is
                        dedicated to providing you with the best possible care.
                    </p>
                </div>

                {/* Slider container */}
                <div className="w-full relative">
                    <div className="overflow-hidden mx-0 md:mx-12">
                        <div
                            ref={containerRef}
                            className="flex pb-2"
                            style={{
                                transform: `translateX(-${
                                    (100 / visibleCards) * current
                                }%)`,
                                transition: isTransitioning
                                    ? "transform 0.5s ease-in-out"
                                    : "none",
                            }}
                            onTransitionEnd={handleTransitionEnd}
                            onTouchStart={
                                isMobile ? handleTouchStart : undefined
                            }
                            onTouchMove={isMobile ? handleTouchMove : undefined}
                            onTouchEnd={isMobile ? handleTouchEnd : undefined}
                        >
                            {duplicatedDoctors.map((doctor, index) => (
                                <div
                                    key={index}
                                    className="px-2 md:px-4 flex-shrink-0"
                                    style={{
                                        width: `${100 / visibleCards}%`,
                                    }}
                                >
                                    <div className="bg-white rounded-lg shadow-lg h-full mx-2 md:mx-0 overflow-hidden group hover:shadow-xl transition-all duration-300">
                                        <div className="relative">
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-full h-80 object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {doctor.name}
                                            </h3>
                                            <p className="text-blue-600 font-medium mb-2">
                                                {doctor.specialty}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {doctor.experience} of
                                                experience
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prev/Next buttons - hidden on mobile */}

                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-700" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-700" />
                        </button>
                    </>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-8">
                    {doctors.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsTransitioning(true);
                                setCurrent(index);
                            }}
                            className={`h-3 w-3 rounded-full mx-1 ${
                                current % doctors.length === index
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </article>
    );
}
