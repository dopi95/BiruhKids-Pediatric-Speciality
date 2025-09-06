import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { Award, Zap, Heart, Shield } from "lucide-react";
import serviceService from "../services/serviceService";

const Services = ({ lang = "En" }) => {
    const [visible, setVisible] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const serviceRefs = useRef([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await serviceService.getServices();
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = serviceRefs.current.indexOf(entry.target);
                    if (entry.isIntersecting) {
                        setVisible((prev) => [...prev, index]);
                    } else {
                        setVisible((prev) => prev.filter((i) => i !== index));
                    }
                });
            },
            { threshold: 0.2 }
        );

        serviceRefs.current.forEach((ref) => ref && observer.observe(ref));

        return () => {
            serviceRefs.current.forEach(
                (ref) => ref && observer.unobserve(ref)
            );
        };
    }, [services]);

    // 🔹 Only the translations you asked for
    const translations = {
        En: {
            heroTitle: "Our Services",
            heroDesc:
                "Comprehensive healthcare services designed to meet all your medical needs.",
            why: [
                {
                    title: "Expert Doctors",
                    desc: "Board-certified physicians with specialized training.",
                    icon: Award,
                    bg: "bg-blue-600",
                },
                {
                    title: "Advanced Technology",
                    desc: "State-of-the-art medical equipment and innovative treatment methods.",
                    icon: Zap,
                    bg: "bg-orange-500",
                },
                {
                    title: "Compassionate Care",
                    desc: "Patient-centered approach with personalized attention.",
                    icon: Heart,
                    bg: "bg-green-500",
                },
                {
                    title: "Quality Assurance",
                    desc: "Rigorous quality standards and continuous improvement.",
                    icon: Shield,
                    bg: "bg-purple-500",
                },
            ],
        },
        Am: {
            heroTitle: "አገልግሎቶቻችን",
            heroDesc:
                "ሁሉንም የጤና ፍላጎቶችዎን ለመሟላት የተዘጋጀ አጠቃላይ የጤና አገልግሎት።",
            why: [
                {
                    title: "ባለሙያ ዶክተሮች",
                    desc: "የሙያ ልዩ ስልጠና ያገኙ የተረጋገጡ ዶክተሮች።",
                    icon: Award,
                    bg: "bg-blue-600",
                },
                {
                    title: "ዘመናዊ ቴክኖሎጂ",
                    desc: "ዘመናዊ የሕክምና መሳሪያዎች እና አዳዲስ የሕክምና ዘዴዎች።",
                    icon: Zap,
                    bg: "bg-orange-500",
                },
                {
                    title: "ርኅራኄ እንክብካቤ",
                    desc: "በታካሚው ላይ የተመሰረተ አቀራረብ እና የግል ትኩረት።",
                    icon: Heart,
                    bg: "bg-green-500",
                },
                {
                    title: "ጥራት ማረጋገጫ",
                    desc: "ጥራት ደረጃዎች በጥንቃቄ የሚጠበቁ እና የቀጣይ ማሻሻያ።",
                    icon: Shield,
                    bg: "bg-purple-500",
                },
            ],
        },
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading services...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r bg-[#007799] text-white py-20">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {translations[lang].heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                        {translations[lang].heroDesc}
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <ServiceCard
                        key={service._id}
                        title={lang === "En" ? service.title_en : service.title_am || service.title_en}
                        description={lang === "En" ? service.description_en : service.description_am || service.description_en}
                        features={lang === "En" ? service.features_en : service.features_am || service.features_en}
                        className={`${
                            visible.includes(idx)
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                        ref={(el) => (serviceRefs.current[idx] = el)}
                    />
                ))}
            </section>

            {/* Why Choose Us (translated) */}
            <section className="py-20 bg-gray-50 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {translations[lang].why.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={idx}>
                            <div
                                className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                            >
                                <IconComponent className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default Services;