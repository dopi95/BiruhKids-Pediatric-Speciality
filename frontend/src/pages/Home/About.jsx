import { Users, Award, Clock, Heart, Stethoscope, Shield } from "lucide-react";

export default function About() {
    const stats = [
        { icon: Users, value: "10,000+", label: "Happy Patients" },
        { icon: Award, value: "15+", label: "Years Experience" },
        { icon: Stethoscope, value: "50+", label: "Expert Doctors" },
        { icon: Clock, value: "24/7", label: "Emergency Care" },
    ];
    return (
        <article className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Mission */}
                    <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Our Mission
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            To provide compassionate, high-quality healthcare
                            services that improve the health and wellbeing of
                            our community while advancing medical knowledge and
                            practices.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="text-center">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award className="h-8 w-8 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Our Vision
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            To be the leading healthcare provider recognized for
                            excellence in patient care, medical innovation, and
                            community health improvement.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Integrity, compassion, excellence, respect, and
                            innovation guide everything we do in our commitment
                            to serving patients and families.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <stat.icon className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}
