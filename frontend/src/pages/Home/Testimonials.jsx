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

export default function Testimonials() {
    const [isOpen, setIsOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const containerRef = useRef(null);

    const testimonials = [
        {
            name: "John Doe",
            content:
                "Excellent care and professional service. The doctors are very knowledgeable and caring.",
            rating: 5,
        },
        {
            name: "Jane Smith",
            content:
                "I had a great experience here. The staff is friendly and the facilities are modern.",
            rating: 5,
        },
        {
            name: "Mike Wilson",
            content:
                "Quick and efficient service. I would definitely recommend this clinic to others.",
            rating: 5,
        },
        {
            name: "Alice Brown",
            content:
                "Very professional and caring staff. The clinic is very clean and well-organized.",
            rating: 5,
        },
        {
            name: "Bob Green",
            content:
                "Great service and friendly environment. Highly recommend to everyone.",
            rating: 5,
        },
    ];

    // Create a duplicated array for seamless looping
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    // Determine number of visible cards
    const getVisibleCards = () => {
        if (window.innerWidth >= 768) return 3; // Tablet and desktop: 3 cards
        return 1; // Mobile: 1 card
    };

    const [visibleCards, setVisibleCards] = useState(getVisibleCards());

    useEffect(() => {
        const handleResize = () => setVisibleCards(getVisibleCards());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) => {
            if (prev >= testimonials.length) {
                // If we're at the end of the duplicated array, reset to 0 with no transition
                setTimeout(() => {
                    setCurrent(0);
                    // Temporarily disable transition for the reset
                    containerRef.current.style.transition = "none";
                    containerRef.current.style.transform = `translateX(0%)`;

                    // Force reflow
                    containerRef.current.offsetHeight;

                    // Re-enable transition
                    containerRef.current.style.transition = "";
                }, 0);
                return testimonials.length;
            }
            return prev + 1;
        });
    };

    const prevSlide = () => {
        setCurrent((prev) => {
            if (prev === 0) {
                // If we're at the beginning, jump to the end of the original array (without transition)
                setTimeout(() => {
                    setCurrent(testimonials.length - 1);
                    // Temporarily disable transition for the reset
                    containerRef.current.style.transition = "none";
                    containerRef.current.style.transform = `translateX(-${
                        (100 / visibleCards) * (testimonials.length - 1)
                    }%)`;

                    // Force reflow
                    containerRef.current.offsetHeight;

                    // Re-enable transition
                    containerRef.current.style.transition = "";
                }, 0);
                return -1;
            }
            return prev - 1;
        });
    };

    // Handle transition end to reset position seamlessly
    const handleTransitionEnd = () => {
        if (current >= testimonials.length) {
            // Disable transition temporarily
            containerRef.current.style.transition = "none";
            containerRef.current.style.transform = `translateX(0%)`;

            // Force reflow
            containerRef.current.offsetHeight;

            // Re-enable transition
            containerRef.current.style.transition = "";

            // Reset current to 0
            setCurrent(0);
        } else if (current < 0) {
            // Disable transition temporarily
            containerRef.current.style.transition = "none";
            containerRef.current.style.transform = `translateX(-${
                (100 / visibleCards) * (testimonials.length - 1)
            }%)`;

            // Force reflow
            containerRef.current.offsetHeight;

            // Re-enable transition
            containerRef.current.style.transition = "";

            // Reset current to the last slide
            setCurrent(testimonials.length - 1);
        }
    };

    // Auto-play
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [current, visibleCards]);

    return (
        <article className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Patients Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Read testimonials from our satisfied patients who have
                        experienced our exceptional healthcare services.
                    </p>
                </div>

                {/* Slider container */}
                <div className="relative">
                    <div className="overflow-hidden mx-12">
                        <div
                            ref={containerRef}
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${
                                    (100 / visibleCards) * current
                                }%)`,
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {duplicatedTestimonials.map(
                                (testimonial, index) => (
                                    <div
                                        key={index}
                                        className="px-4 flex-shrink-0"
                                        style={{
                                            width: `${100 / visibleCards}%`,
                                        }}
                                    >
                                        <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                                            <div className="flex items-center mb-4">
                                                {[
                                                    ...Array(
                                                        testimonial.rating
                                                    ),
                                                ].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className="h-5 w-5 text-yellow-400 fill-current"
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 mb-6 italic">
                                                "{testimonial.content}"
                                            </p>
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                    <Users className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-gray-600 text-sm">
                                                        Patient
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Prev/Next buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-3 w-3 rounded-full mx-1 ${
                                current % testimonials.length === index
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>

                {/* Share button */}
                <div className="text-center mt-12 relative z-20">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 inline-flex items-center"
                    >
                        Share Your Experience
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
                            Share Your Experience
                        </h3>
                        <TestimonialForm onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </article>
    );
}
