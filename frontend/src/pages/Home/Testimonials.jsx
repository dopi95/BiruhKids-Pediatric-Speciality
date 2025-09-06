import { useState, useEffect, useRef } from "react";
import {
    Users,
    Star,
    ArrowRight,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import TestimonialForm from "./TestimonialForm";

export default function Testimonials({ lang }) {
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const containerRef = useRef(null);
    const [visibleCards, setVisibleCards] = useState(1);

    // Translations
    const translations = {
        En: {
            heading: "What Our Patients Say",
            subheading:
                "Read testimonials from our satisfied patients who have experienced our exceptional healthcare services.",
            shareButton: "Share Your Experience",
            error: "Failed to load testimonials",
            noTestimonials: "No testimonials available yet.",
            loading: "Loading testimonials...",
        },
        Am: {
            heading: "የታካሚዎቻችን ምስክርነት",
            subheading:
                "የተሟላ የጤና አገልግሎት የተቀበሉ ታካሚዎቻችን ምስክርነት ይንብቡ።",
            shareButton: "ልምድዎን ያካፍሉ",
            error: "ምስክርነቶችን ማምጣት አልተቻለም",
            noTestimonials: "እስካሁን ምንም ምስክርነቶች የሉም።",
            loading: "ምስክርነቶች በመጫን ላይ...",
        },
    };

    const t = translations[lang] || translations.En;

    // Fetch testimonials
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/testimonials/approved`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch testimonials");
                }

                const data = await response.json();

                if (data.success) {
                    setTestimonials(data.data);
                } else {
                    throw new Error(data.message || "Failed to fetch testimonials");
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Handle resize -> set visibleCards dynamically
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleCards(1); // mobile
            } else if (window.innerWidth < 1024) {
                setVisibleCards(2); // tablet
            } else {
                setVisibleCards(3); // desktop
            }
            setCurrent(0); // reset to first
        };

        handleResize(); // initial call
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Slides count (make sure we don't show extra dots)
    const totalSlides =
        testimonials.length > visibleCards
            ? testimonials.length - visibleCards + 1
            : 1;

    const nextSlide = () => {
        if (totalSlides <= 1) return;
        setCurrent((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (totalSlides <= 1) return;
        setCurrent((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrent(index);
    };

    // Avatar
    const renderUserAvatar = (testimonial) => {
        if (testimonial.image) {
            return (
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mr-4 border border-gray-200">
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/uploads/testimonials/${testimonial.image}`}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = "none";
                            const defaultAvatar = e.target.parentNode.querySelector('.default-avatar');
                            if (defaultAvatar) {
                                defaultAvatar.style.display = "flex";
                            }
                        }}
                    />
                    <div className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center hidden default-avatar">
                        <Users className="h-6 w-6 text-blue-600" />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                </div>
            );
        }
    };

    return (
        <article className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t.heading}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t.subheading}
                    </p>
                </div>

                {error && (
                    <div className="text-center py-8 text-red-600">
                        {t.error}: {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">{t.loading}</p>
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">{t.noTestimonials}</p>
                    </div>
                ) : (
                    <>
                        {/* Slider */}
                        <div className="w-full relative">
                            <div className="overflow-hidden mx-0 md:mx-8">
                                <div
                                    ref={containerRef}
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(-${
                                            (current * 100) / visibleCards
                                        }%)`,
                                    }}
                                >
                                    {testimonials.map((testimonial, index) => (
                                        <div
                                            key={testimonial._id || index}
                                            className="px-2 md:px-4 flex-shrink-0"
                                            style={{
                                                width: `${100 / visibleCards}%`,
                                                minWidth: `${100 / visibleCards}%`,
                                            }}
                                        >
                                            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md h-full">
                                                <div className="flex items-center mb-4">
                                                    {[...Array(testimonial.rating)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="h-5 w-5 text-yellow-400 fill-current"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <p className="text-gray-600 mb-6 italic text-base md:text-lg">
                                                    "{testimonial.testimony}"
                                                </p>
                                                <div className="flex items-center">
                                                    {renderUserAvatar(testimonial)}
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 text-lg md:text-xl">
                                                            {testimonial.name}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm md:text-base">
                                                            {testimonial.treatment}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controls */}
                            {totalSlides > 1 && (
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
                            )}
                        </div>

                        {/* Dots */}
                        {totalSlides > 1 && (
                            <div className="flex justify-center mt-8 space-x-2">
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${
                                            index === current
                                                ? "bg-orange-500"
                                                : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Share button */}
                <div className="text-center mt-12 relative z-20">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 inline-flex items-center"
                    >
                        {t.shareButton}
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 py-5">
                    <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <h3 className="text-xl font-bold mb-4 text-gray-900">
                            {t.shareButton}
                        </h3>
                        <TestimonialForm lang={lang} onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </article>
    );
}