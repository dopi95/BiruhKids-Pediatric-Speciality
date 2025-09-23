import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Stethoscope, FlaskConical, Monitor, Scissors, Eye, ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";

const Services = ({ lang = "En" }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;

    // Department data
    const departments = [
        {
            id: 1,
            name: "General Services",
            nameAm: "አጠቃላይ አገልግሎቶች",
            description: "Comprehensive pediatric care for all your child's health needs",
            descriptionAm: "ለልጅዎ ሁሉም የጤና ፍላጎቶች አጠቃላይ የህፃናት እንክብካቤ",
            icon: Stethoscope,
            gradient: "from-blue-500 to-blue-700",
            services: [
                { name: "General Consultation", nameAm: "አጠቃላይ ምክክር", description: "Complete health checkups" },
                { name: "Vaccination", nameAm: "ክትባት", description: "Immunization services" },
                { name: "Growth Monitoring", nameAm: "የእድገት ክትትል", description: "Track your child's development" },
                { name: "Nutrition Counseling", nameAm: "የአመጋገብ ምክር", description: "Dietary guidance for healthy growth" },
                { name: "Preventive Care", nameAm: "መከላከያ እንክብካቤ", description: "Early detection and prevention" },
                { name: "Health Education", nameAm: "የጤና ትምህርት", description: "Parent and child health education" },
                { name: "Emergency Care", nameAm: "የአደጋ ጊዜ እንክብካቤ", description: "24/7 emergency services" },
                { name: "Chronic Disease Management", nameAm: "የሥር በሽታ አያያዝ", description: "Long-term health condition care" }
            ]
        },
        {
            id: 2,
            name: "Laboratory Services",
            nameAm: "የላቦራቶሪ አገልግሎቶች",
            description: "Advanced diagnostic testing and analysis services",
            descriptionAm: "የላቀ የምርመራ ፈተና እና የትንተና አገልግሎቶች",
            icon: FlaskConical,
            gradient: "from-blue-600 to-blue-800",
            services: [
                { name: "Blood Tests", nameAm: "የደም ምርመራ", description: "Complete blood count and chemistry" },
                { name: "Urine Analysis", nameAm: "የሽንት ምርመራ", description: "Comprehensive urine testing" },
                { name: "Stool Examination", nameAm: "የሰገራ ምርመራ", description: "Parasites and infection detection" },
                { name: "Microbiology", nameAm: "ማይክሮባዮሎጂ", description: "Bacterial and viral cultures" },
                { name: "Allergy Testing", nameAm: "የአለርጂ ምርመራ", description: "Identify allergens and sensitivities" },
                { name: "Hormone Tests", nameAm: "የሆርሞን ምርመራ", description: "Endocrine system evaluation" },
                { name: "Genetic Testing", nameAm: "የጄኔቲክ ምርመራ", description: "DNA and chromosomal analysis" },
                { name: "Rapid Tests", nameAm: "ፈጣን ምርመራዎች", description: "Quick diagnostic results" }
            ]
        },
        {
            id: 3,
            name: "Ultrasound Services",
            nameAm: "የአልትራሳውንድ አገልግሎቶች",
            description: "Non-invasive imaging for accurate diagnosis",
            descriptionAm: "ለትክክለኛ ምርመራ ወራሪ ያልሆነ ምስል",
            icon: Monitor,
            gradient: "from-blue-400 to-blue-600",
            services: [
                { name: "Abdominal Ultrasound", nameAm: "የሆድ አልትራሳውንድ", description: "Internal organ examination" },
                { name: "Cardiac Echo", nameAm: "የልብ ኢኮ", description: "Heart structure and function" },
                { name: "Pelvic Ultrasound", nameAm: "የዳሌ አልትራሳውንድ", description: "Reproductive system imaging" },
                { name: "Thyroid Scan", nameAm: "የታይሮይድ ስካን", description: "Thyroid gland assessment" },
                { name: "Kidney Ultrasound", nameAm: "የኩላሊት አልትራሳውንድ", description: "Renal system evaluation" },
                { name: "Doppler Studies", nameAm: "ዶፕለር ጥናቶች", description: "Blood flow assessment" },
                { name: "Musculoskeletal US", nameAm: "የጡንቻ አጥንት አልትራሳውንድ", description: "Joint and muscle imaging" },
                { name: "Emergency Ultrasound", nameAm: "የአደጋ ጊዜ አልትራሳውንድ", description: "Urgent diagnostic imaging" }
            ]
        },
        {
            id: 4,
            name: "Minor Surgery Services",
            nameAm: "የትንሽ ቀዶ ጥገና አገልግሎቶች",
            description: "Safe outpatient surgical procedures for children",
            descriptionAm: "ለህፃናት ደህንነቱ የተጠበቀ የውጪ ታካሚ የቀዶ ጥገና ሂደቶች",
            icon: Scissors,
            gradient: "from-blue-700 to-blue-900",
            services: [
                { name: "Wound Repair", nameAm: "የቁስል ጥገና", description: "Suturing and wound care" },
                { name: "Abscess Drainage", nameAm: "የቁስለት ማስወገድ", description: "Infection treatment" },
                { name: "Foreign Body Removal", nameAm: "የውጭ ነገር ማስወገድ", description: "Safe extraction procedures" },
                { name: "Skin Lesion Removal", nameAm: "የቆዳ ቁስለት ማስወገድ", description: "Mole and cyst removal" },
                { name: "Circumcision", nameAm: "ግርዛት", description: "Safe pediatric circumcision" },
                { name: "Ingrown Nail Treatment", nameAm: "የተሰደደ ጥፍር ህክምና", description: "Nail correction procedures" },
                { name: "Burn Treatment", nameAm: "የማቃጠል ህክምና", description: "Minor burn care and dressing" },
                { name: "Biopsy Procedures", nameAm: "የባዮፕሲ ሂደቶች", description: "Tissue sampling for diagnosis" }
            ]
        }
    ];

    // Set default selected department
    useEffect(() => {
        if (!selectedDepartment && departments.length > 0) {
            setSelectedDepartment(departments[0]);
        }
    }, [departments, selectedDepartment]);

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % departments.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [departments.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % departments.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + departments.length) % departments.length);
    };

    const handleSeeServices = (department) => {
        setSelectedDepartment(department);
        setCurrentPage(1);
    };



    // Pagination logic
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = selectedDepartment?.services.slice(indexOfFirstService, indexOfLastService) || [];
    const totalPages = selectedDepartment ? Math.ceil(selectedDepartment.services.length / servicesPerPage) : 0;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to services grid
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid) {
            servicesGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const translations = {
        En: {
            heroTitle: "Our Medical Departments",
            heroDesc: "Comprehensive pediatric healthcare services across specialized departments",
            seeServices: "See Services",
            backToDepartments: "Back to Departments",
            servicesIn: "Services in",
            page: "Page",
            of: "of"
        },
        Am: {
            heroTitle: "የእኛ የህክምና ክፍሎች",
            heroDesc: "በልዩ ክፍሎች ውስጥ አጠቃላይ የህፃናት የጤና አገልግሎቶች",
            seeServices: "አገልግሎቶችን ይመልከቱ",
            backToDepartments: "ወደ ክፍሎች ተመለስ",
            servicesIn: "አገልግሎቶች በ",
            page: "ገጽ",
            of: "ከ"
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-blue-500 text-white py-20">
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

            {/* Departments Slider */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Desktop View - 4 cards */}
                    <div className="hidden lg:grid lg:grid-cols-4 gap-8">
                        {departments.map((dept, index) => {
                            const IconComponent = dept.icon;
                            return (
                                <div
                                    key={dept.id}
                                    className={`bg-white rounded-2xl p-8 border-l-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                                        selectedDepartment?.id === dept.id 
                                            ? 'border-l-8 bg-gradient-to-r from-blue-50 to-white ring-2 ring-blue-400 shadow-2xl scale-105' 
                                            : 'border-blue-500'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className={`bg-gradient-to-br ${dept.gradient} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                                            <IconComponent className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                            {lang === "En" ? dept.name : dept.nameAm}
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {lang === "En" ? dept.description : dept.descriptionAm}
                                        </p>
                                        <button
                                            onClick={() => handleSeeServices(dept)}
                                            className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center mx-auto"
                                        >
                                            <Eye className="h-5 w-5 mr-2" />
                                            {translations[lang].seeServices}
                                        </button>
                                        <div className="mt-4 flex justify-center">
                                            {selectedDepartment?.id === dept.id ? (
                                                <ChevronUp className="h-6 w-6 text-blue-500" />
                                            ) : (
                                                <ChevronDown className="h-6 w-6 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile/Tablet View - Slider */}
                    <div className="lg:hidden relative">
                        <div className="overflow-hidden rounded-2xl shadow-lg">
                            <div 
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {departments.map((dept) => {
                                    const IconComponent = dept.icon;
                                    return (
                                        <div
                                            key={dept.id}
                                            className="w-full flex-shrink-0 bg-white p-8 border-l-4 border-blue-500"
                                        >
                                            <div className="text-center">
                                                <div className={`bg-gradient-to-br ${dept.gradient} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                                                    <IconComponent className="h-10 w-10 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                                    {lang === "En" ? dept.name : dept.nameAm}
                                                </h3>
                                                <p className="text-gray-600 mb-6 leading-relaxed">
                                                    {lang === "En" ? dept.description : dept.descriptionAm}
                                                </p>
                                                <button
                                                    onClick={() => handleSeeServices(dept)}
                                                    className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center mx-auto"
                                                >
                                                    <Eye className="h-5 w-5 mr-2" />
                                                    {translations[lang].seeServices}
                                                </button>
                                                <div className="mt-4 flex justify-center">
                                                    {selectedDepartment?.id === dept.id ? (
                                                        <ChevronUp className="h-6 w-6 text-blue-500" />
                                                    ) : (
                                                        <ChevronDown className="h-6 w-6 text-gray-400" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-6 space-x-3">
                            {departments.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-8 h-3 rounded-full transition-all duration-200 ${
                                        currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Display - Shows at bottom when department is selected */}
            {selectedDepartment && (
                <section id="services-section" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* Title */}
                        <div className="mb-12 text-center">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                {lang === "En" ? selectedDepartment.name : selectedDepartment.nameAm}
                            </h2>
                            <div className={`h-1 w-24 bg-gradient-to-r ${selectedDepartment.gradient} rounded-full mx-auto`}></div>
                        </div>

                        {/* Services Grid */}
                        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {currentServices.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-blue-500"
                                >
                                    <p className="text-lg font-medium text-gray-900">
                                        {lang === "En" ? service.name : service.nameAm}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                
                                <span className="text-gray-700 font-medium">
                                    {translations[lang].page} {currentPage} {translations[lang].of} {totalPages}
                                </span>
                                
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Services;