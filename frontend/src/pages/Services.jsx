import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Stethoscope, FlaskConical, Monitor, Scissors, Eye, ChevronUp, ChevronDown } from "lucide-react";
import departmentService from "../services/departmentService";

const Services = ({ lang = "En" }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const servicesPerPage = 6;
    const [desktopSlide, setDesktopSlide] = useState(0);

    // Translations
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

    // Icon mapping for departments
    const iconMap = {
        "Cardiology": Stethoscope,
        "Neurology": Monitor,
        "Laboratory": FlaskConical,
        "Surgery": Scissors,
        "General": Stethoscope
    };

    const gradientMap = {
        "Cardiology": "from-red-500 to-red-700",
        "Neurology": "from-purple-500 to-purple-700",
        "Laboratory": "from-green-500 to-green-700",
        "Surgery": "from-blue-500 to-blue-700",
        "General": "from-indigo-500 to-indigo-700"
    };

    const getIcon = (title) => {
        const key = Object.keys(iconMap).find(k => title.toLowerCase().includes(k.toLowerCase()));
        return iconMap[key] || Stethoscope;
    };

    const getGradient = (title) => {
        const key = Object.keys(gradientMap).find(k => title.toLowerCase().includes(k.toLowerCase()));
        return gradientMap[key] || "from-blue-500 to-blue-700";
    };

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await departmentService.getDepartments();
            const deptData = response.data.map(dept => ({
                id: dept._id,
                name: dept.title_en,
                nameAm: dept.title_am,
                description: dept.description_en,
                descriptionAm: dept.description_am,
                icon: getIcon(dept.title_en),
                gradient: getGradient(dept.title_en),
                services: dept.services.map(service => ({
                    name: service.name_en,
                    nameAm: service.name_am
                }))
            }));
            
            // Sort: General first, then others by recent date
            const sortedData = deptData.sort((a, b) => {
                const aIsGeneral = a.name.toLowerCase().includes('general');
                const bIsGeneral = b.name.toLowerCase().includes('general');
                
                if (aIsGeneral && !bIsGeneral) return -1;
                if (!aIsGeneral && bIsGeneral) return 1;
                
                // Both are general or both are not general, sort by date
                const aDate = response.data.find(d => d._id === a.id)?.createdAt;
                const bDate = response.data.find(d => d._id === b.id)?.createdAt;
                return new Date(bDate) - new Date(aDate);
            });
            
            setDepartments(sortedData);
        } catch (error) {
            console.error("Error fetching departments:", error);
            setDepartments([]);
        } finally {
            setLoading(false);
        }
    };

    // ALL HOOKS MUST BE AT THE TOP
    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (!selectedDepartment && departments.length > 0) {
            setSelectedDepartment(departments[0]);
        }
    }, [departments, selectedDepartment]);

    useEffect(() => {
        if (departments.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % departments.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [departments.length]);

    const handleSeeServices = (department) => {
        setSelectedDepartment(department);
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid) {
            servicesGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // Pagination logic
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = selectedDepartment?.services.slice(indexOfFirstService, indexOfLastService) || [];
    const totalPages = selectedDepartment ? Math.ceil(selectedDepartment.services.length / servicesPerPage) : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (departments.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
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
                <div className="py-20 text-center">
                    <p className="text-gray-600">No departments available at the moment.</p>
                </div>
            </div>
        );
    }

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
                    {/* Desktop View */}
                    {departments.length <= 4 ? (
                        /* Static Grid for 4 or fewer departments */
                        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
                            {departments.map((dept) => {
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
                    ) : (
                        /* Slider for more than 4 departments */
                        <div className="hidden lg:block relative">
                            {/* Navigation Arrows */}
                            <button
                                onClick={() => setDesktopSlide(Math.max(0, desktopSlide - 1))}
                                disabled={desktopSlide === 0}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-6 w-6 text-gray-600" />
                            </button>
                            <button
                                onClick={() => setDesktopSlide(Math.min(Math.ceil(departments.length / 4) - 1, desktopSlide + 1))}
                                disabled={desktopSlide >= Math.ceil(departments.length / 4) - 1}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="h-6 w-6 text-gray-600" />
                            </button>
                            
                            {/* Slider Container */}
                            <div className="overflow-hidden mx-12">
                                <div 
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${desktopSlide * 100}%)` }}
                                >
                                    {Array.from({ length: Math.ceil(departments.length / 4) }).map((_, slideIndex) => (
                                        <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-4 gap-8">
                                            {departments.slice(slideIndex * 4, (slideIndex + 1) * 4).map((dept) => {
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
                                    ))}
                                </div>
                            </div>
                            
                            {/* Dots Indicator */}
                            <div className="flex justify-center mt-6 space-x-3">
                                {Array.from({ length: Math.ceil(departments.length / 4) }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setDesktopSlide(index)}
                                        className={`w-8 h-3 rounded-full transition-all duration-200 ${
                                            desktopSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

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

            {/* Services Display */}
            {selectedDepartment && (
                <section id="services-section" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="mb-12 text-center">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                {lang === "En" ? selectedDepartment.name : selectedDepartment.nameAm}
                            </h2>
                            <div className={`h-1 w-24 bg-gradient-to-r ${selectedDepartment.gradient} rounded-full mx-auto`}></div>
                        </div>

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