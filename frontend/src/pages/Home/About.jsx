import {
  Users,
  Award,
  Clock,
  Stethoscope,
  Facebook,
  Instagram,
} from "lucide-react";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import VisionMissionSection from "../../components/VisionMissionSection";

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

  return (
    <article className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
       <div className="text-center mb-16 px-4">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
    About BiruhKids Pediatric Speciality Clinic
  </h2>
  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-justify [hyphens:auto] [word-spacing:0.05em] mb-4">
    Biruh Kids was established in <span className="font-semibold">November 2024</span> 
    as a premier pediatric specialty clinic in Addis Ababa, Ethiopia. Over the last eight 
    months, we have been dedicated to providing comprehensive healthcare services for children, 
    working tirelessly towards obtaining institutional status.
  </p>
  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-justify [hyphens:auto] [word-spacing:0.05em]">
    At Biruh Kids, we currently offer a range of specialized services including 
    <span className="font-medium text-gray-800"> Outpatient Department (OPD), emergency care, 
    laboratory services, and ultrasound diagnostics</span> to ensure that every child 
    receives the highest standard of medical attention in a safe and compassionate environment.
  </p>
</div>


        {/* Vision & Mission Section (Reused Component) */}
        <div className="mb-20">
          <VisionMissionSection />
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
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
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
