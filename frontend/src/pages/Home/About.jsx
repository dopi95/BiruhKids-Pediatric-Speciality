import {
    Users,
    Award,
    Clock,
    Heart,
    Stethoscope,
    Shield,
    Facebook,
    Instagram,
} from "lucide-react";
import { FaTiktok, FaYoutube } from "react-icons/fa";

export default function About() {
    const stats = [
        {
            icon: Users,
            value: "10,000+",
            label: "Happy Patients",
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            icon: Award,
            value: "15+",
            label: "Years Experience",
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
        {
            icon: Stethoscope,
            value: "50+",
            label: "Expert Doctors",
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            icon: Clock,
            value: "24/7",
            label: "Emergency Care",
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
    ];

    const features = [
        {
            icon: Heart,
            title: "Our Mission",
            description:
                "Our mission is to provide outstanding, family-centered pediatric specialty care through a collaborative, multidisciplinary approach. We are committed to delivering evidence-based treatments with warmth, dignity, and respect. By investing in advanced medical knowledge, nurturing partnerships with families, and fostering a child-friendly atmosphere, we strive to support not just the health of our patients, but their growth, resilience, and emotional well-being. Every child in our care is treated with the same compassion, attention, and dedication we would offer our own.",
            bg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            icon: Award,
            title: "Our Vision",
            description:
                "Our vision is to become a leading center of excellence in pediatric specialty care, where every child regardless of background receives expert, compassionate and individualized care in a healing environment. We envision a future where children and families are empowered, healthcare is accessible and inclusive, and innovation and empathy work hand-in-hand to build brighter, healthier lives.",
            bg: "bg-orange-100",
            iconColor: "text-orange-600",
        },
        {
            icon: Shield,
            title: "Our Values",
            description:
                "Integrity, compassion, excellence, respect, and innovation guide everything we do in our commitment to serving patients and families.",
            bg: "bg-green-100",
            iconColor: "text-green-600",
        },
    ];

    return (
        <article className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        About BiruhKids Pediatric Clinic
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto text-justify leading-relaxed [hyphens:auto] [word-spacing:0.05em]">
                        Biruh Kids was established in November 2024 as a premier pediatric
                        specialty clinic in Addis Ababa, Ethiopia. Over the last eight
                        months, we have been dedicated to providing comprehensive
                        healthcare services for children, working tirelessly towards
                        obtaining institutional status. At Biruh Kids, we currently offer a
                        range of specialized services including Outpatient Department
                        (OPD), emergency care, laboratory services, and ultrasound
                        diagnostics to ensure that every child receives the highest
                        standard of medical attention.
                    </p>
                </div>

                {/* Mission, Vision, Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="text-center flex flex-col items-center"
                        >
                            <div
                                className={`${feature.bg} w-16 h-16 rounded-full flex items-center justify-center mb-6`}
                            >
                                <feature.icon
                                    className={`h-8 w-8 ${feature.iconColor}`}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-justify max-w-prose mx-auto [hyphens:auto] [word-spacing:0.05em]">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                        >
                            <div
                                className={`${stat.bg} w-16 h-16 rounded-full flex items-center justify-center mb-4`}
                            >
                                <stat.icon
                                    className={`h-8 w-8 ${stat.color}`}
                                />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 mt-8">
                    <a
                        href="https://www.youtube.com/@ብሩህkids"
                        target="_blank"
                        className="text-red-500 transition-colors duration-200"
                    >
                        <FaYoutube className="h-8 w-8" />
                    </a>
                    <a
                        href="https://www.tiktok.com/@biruhkids?_t=ZM-8zHeQeJllLk&_r=1"
                        target="_blank"
                        className="text-black transition-colors duration-200"
                    >
                        <FaTiktok className="h-7 w-7" />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        className="text-blue-600 transition-colors duration-200"
                    >
                        <Facebook className="h-7 w-7" />
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        className="text-pink-500 transition-colors duration-200"
                    >
                        <Instagram className="h-7 w-7" />
                    </a>
                </div>
            </div>
        </article>
    );
}
