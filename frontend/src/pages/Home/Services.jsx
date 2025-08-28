import { Link } from "react-router-dom";
import { Heart, Stethoscope, Shield, ArrowRight } from "lucide-react";

export default function Services() {
    const services = [
        {
            icon: Heart,
            title: "Cardiology",
            description:
                "Comprehensive heart care with advanced diagnostic and treatment options.",
        },
        {
            icon: Shield,
            title: "Emergency Care",
            description:
                "24/7 emergency services with rapid response and expert medical care.",
        },
        {
            icon: Stethoscope,
            title: "General Medicine",
            description:
                "Complete primary healthcare services for patients of all ages.",
        },
    ];
    return (
        <article className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive healthcare services designed to meet all
                        your medical needs with state-of-the-art technology and
                        expert care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <service.icon className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {service.description}
                            </p>
                            <Link
                                to="/services"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Learn More{" "}
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/services"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
                    >
                        View All Services{" "}
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
