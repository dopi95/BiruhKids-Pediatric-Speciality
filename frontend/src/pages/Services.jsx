import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import {
    Heart,
    Stethoscope,
    Brain,
    Bone,
    Eye,
    Ear,
    Baby,
    Activity,
    Shield,
    Microscope,
    Pill,
    Zap,
    Award,
} from "lucide-react";

const Services = ({ lang = "En" }) => {
    const [visible, setVisible] = useState([]);
    const serviceRefs = useRef([]);

    const services = [
        {
            id: 1,
            icon: Heart,
            title: "Cardiology",
            description:
                "Comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases.",
            features: [
                "ECG & Stress Testing",
                "Echocardiography",
                "Cardiac Catheterization",
                "Heart Disease Prevention",
            ],
        },
        {
            id: 2,
            icon: Shield,
            title: "Emergency Care",
            description:
                "24/7 emergency services with rapid response team and state-of-the-art emergency equipment.",
            features: [
                "24/7 Availability",
                "Trauma Care",
                "Critical Care",
                "Emergency Surgery",
            ],
        },
        {
            id: 3,
            icon: Stethoscope,
            title: "General Medicine",
            description:
                "Primary healthcare services for patients of all ages with comprehensive health management.",
            features: [
                "Health Checkups",
                "Chronic Disease Management",
                "Vaccination",
                "Health Counseling",
            ],
        },
        {
            id: 4,
            icon: Brain,
            title: "Neurology",
            description:
                "Specialized care for disorders of the nervous system, brain, and spinal cord.",
            features: [
                "Neurological Exams",
                "EEG Testing",
                "Stroke Care",
                "Epilepsy Treatment",
            ],
        },
        {
            id: 5,
            icon: Bone,
            title: "Orthopedics",
            description:
                "Expert care for bone, joint, muscle, and ligament conditions and injuries.",
            features: [
                "Joint Replacement",
                "Sports Medicine",
                "Fracture Care",
                "Physical Therapy",
            ],
        },
        {
            id: 6,
            icon: Eye,
            title: "Ophthalmology",
            description:
                "Complete eye care services from routine exams to complex surgical procedures.",
            features: [
                "Eye Exams",
                "Cataract Surgery",
                "Glaucoma Treatment",
                "Retinal Care",
            ],
        },
        {
            id: 7,
            icon: Baby,
            title: "Pediatrics",
            description:
                "Specialized healthcare for infants, children, and adolescents up to age 18.",
            features: [
                "Well-child Visits",
                "Immunizations",
                "Growth Monitoring",
                "Developmental Screening",
            ],
        },
        {
            id: 8,
            icon: Microscope,
            title: "Laboratory Services",
            description:
                "Comprehensive diagnostic testing with state-of-the-art laboratory equipment.",
            features: [
                "Blood Tests",
                "Urine Analysis",
                "Microbiology",
                "Pathology",
            ],
        },
        {
            id: 9,
            icon: Activity,
            title: "Radiology",
            description:
                "Advanced imaging services for accurate diagnosis and treatment planning.",
            features: ["X-Ray", "CT Scan", "MRI", "Ultrasound"],
        },
        {
            id: 10,
            icon: Pill,
            title: "Pharmacy",
            description:
                "Full-service pharmacy with prescription medications and health consultations.",
            features: [
                "Prescription Filling",
                "Medication Counseling",
                "Health Screenings",
                "Vaccinations",
            ],
        },
        {
            id: 11,
            icon: Ear,
            title: "ENT Services",
            description:
                "Specialized care for ear, nose, throat, and related head and neck conditions.",
            features: [
                "Hearing Tests",
                "Sinus Treatment",
                "Throat Surgery",
                "Allergy Testing",
            ],
        },
        {
            id: 12,
            icon: Zap,
            title: "Physical Therapy",
            description:
                "Rehabilitation services to restore function, reduce pain, and prevent disability.",
            features: [
                "Injury Rehabilitation",
                "Pain Management",
                "Sports Therapy",
                "Post-Surgical Care",
            ],
        },
    ];

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
                },
                {
                    title: "Advanced Technology",
                    desc: "State-of-the-art medical equipment and innovative treatment methods.",
                },
                {
                    title: "Compassionate Care",
                    desc: "Patient-centered approach with personalized attention.",
                },
                {
                    title: "Quality Assurance",
                    desc: "Rigorous quality standards and continuous improvement.",
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
                },
                {
                    title: "ዘመናዊ ቴክኖሎጂ",
                    desc: "ዘመናዊ የሕክምና መሳሪያዎች እና አዳዲስ የሕክምና ዘዴዎች።",
                },
                {
                    title: "ርኅራኄ እንክብካቤ",
                    desc: "በታካሚው ላይ የተመሰረተ አቀራረብ እና የግል ትኩረት።",
                },
                {
                    title: "ጥራት ማረጋገጫ",
                    desc: "ጥራት ደረጃዎች በጥንቃቄ የሚጠበቁ እና የቀጣይ ማሻሻያ።",
                },
            ],
        },
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
    }, []);

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

            {/* Services Grid (unchanged – cards show like before) */}
            <section className="py-20 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <ServiceCard
                        key={service.id}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                        features={service.features}
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
                {[
                    {
                        icon: Award,
                        bg: "bg-blue-600",
                        ...translations[lang].why[0],
                    },
                    {
                        icon: Zap,
                        bg: "bg-orange-500",
                        ...translations[lang].why[1],
                    },
                    {
                        icon: Heart,
                        bg: "bg-green-500",
                        ...translations[lang].why[2],
                    },
                    {
                        icon: Shield,
                        bg: "bg-purple-500",
                        ...translations[lang].why[3],
                    },
                ].map((item, idx) => (
                    <div key={idx}>
                        <div
                            className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                        >
                            <item.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {item.title}
                        </h3>
                        <p className="text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Services;
