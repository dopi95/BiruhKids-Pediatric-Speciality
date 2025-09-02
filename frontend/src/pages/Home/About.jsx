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
                "To provide compassionate, high-quality healthcare services that improve the health and wellbeing of our community while advancing medical knowledge and practices.",
            bg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            icon: Award,
            title: "Our Vision",
            description:
                "To be the leading healthcare provider recognized for excellence in patient care, medical innovation, and community health improvement.",
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
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Committed to providing exceptional healthcare services
                        with a focus on patient-centered care, innovation, and
                        clinical excellence.
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
                            <p className="text-gray-600 leading-relaxed">
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
