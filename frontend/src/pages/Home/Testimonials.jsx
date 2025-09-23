import { useState, useEffect, useRef } from "react";
import {
  Users,
  Star,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Send,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";
import { getPublicTestimonials, submitTestimonial } from "../../services/testimonialService";

export default function Testimonials({ lang = "En" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  

  // Load testimonials from API
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await getPublicTestimonials();
        setTestimonials(response.data || []);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        // Fallback to empty array if API fails
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Translations
  const translations = {
    En: {
      heading: "What Our Patients Say",
      subheading: "Read testimonials from our satisfied patients who have experienced our exceptional healthcare services.",
      shareButton: "Share Your Experience",
      noTestimonials: "No testimonials available yet.",
      formTitle: "Share Your Story",
      thankYou: "Thank You!",
      submitted: "Your testimony has been submitted successfully.",
      name: "Full Name *",
      email: "Email Address *",
      treatment: "Treatment/Service *",
      selectTreatment: "Select treatment",
      rating: "Overall Rating *",
      testimonyTitle: "Testimony Title *",
      experience: "Your Experience *",
      upload: "Upload an Image (optional)",
      chooseFile: "Choose File",
      submit: "Submit Testimony",
      successTitle: "Thank You for Sharing!",
      successMessage: "Your testimonial has been successfully submitted and will help others make informed decisions about their healthcare.",
      successNotificationTitle: "Success!",
      successNotificationMessage: "Your testimonial has been submitted successfully.",
    },
    Am: {
      heading: "የታካሚዎቻችን ምስክርነት",
      subheading: "የተሟላ የጤና አገልግሎት የተቀበሉ ታካሚዎቻችን ምስክርነት ያንብቡ።",
      shareButton: "ልምድዎን ያካፍሉ",
      noTestimonials: "እስካሁን ምንም ምስክርነቶች የሉም።",
      formTitle: "ታሪክዎን ያካፍሉ",
      thankYou: "አናመሰግናለን!",
      submitted: "መልእክትዎ በተሳካ ሁኔታ ተልኳል።",
      name: "ሙሉ ስም *",
      email: "ኢሜይል አድራሻ *",
      treatment: "ሕክምና/አገልግሎት *",
      selectTreatment: "ሕክምና ይምረጡ",
      rating: "አጠቃላይ እውቅና *",
      testimonyTitle: "የመልእክት ርዕስ *",
      experience: "ተሞክሮዎ *",
      upload: "ምስል ያስገቡ (አማራጭ)",
      chooseFile: "ፋይል ይምረጡ",
      submit: "መልእክት ያስገቡ",
      successTitle: "ልምድዎን ስላካፈሉ እናመሰግናለን!",
      successMessage: "የእርስዎ �ምስክርነት በተሳካ ሁኔታ ቀርቧል እና ሌሎች ሰዎች ስለ ጤናቸው በትክክል ለማሰብ ይረዳቸዋል።",
      successNotificationTitle: "በተሳካ ሁኔታ!",
      successNotificationMessage: "ምስክርነትዎ በትክክል ቀርቧል።",
    },
  };

  const t = translations[lang] || translations.En;

  // Handle resize -> set visibleCards dynamically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1); // mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2); // tablet
      } else {
        setVisibleCards(3); // desktop
      }
      setCurrent(0); // reset to first
    };

    handleResize(); // initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slides count
  const totalSlides =
    testimonials && testimonials.length > visibleCards
      ? testimonials.length - visibleCards + 1
      : 1;

  const nextSlide = () => {
    if (totalSlides <= 1) return;
    setCurrent((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (totalSlides <= 1) return;
    setCurrent((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Avatar
const renderUserAvatar = (testimonial) => {
  if (testimonial.image) {
    return (
      <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mr-4 border border-gray-200">
        <img
          src={
            testimonial.image.includes('cloudinary.com') 
              ? testimonial.image 
              : testimonial.image.includes('biruh-kids/') 
                ? `https://res.cloudinary.com/door11ovj/image/upload/${testimonial.image}` 
                : `http://localhost:5000/uploads/testimonials/${testimonial.image}`
          }
          alt={testimonial.name}
          className="w-full h-full object-contain bg-gray-100"
          onError={(e) => {
            e.target.style.display = "none";
            const defaultAvatar = e.target.parentNode.querySelector('.default-avatar');
            if (defaultAvatar) {
              defaultAvatar.style.display = "flex";
            }
          }}
        />
        <div className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center hidden default-avatar">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
        <Users className="h-6 w-6 text-blue-600" />
      </div>
    );
  }
};

  // Success Notification Component
  const SuccessNotification = ({ onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-green-400 to-teal-500 p-6 text-center text-white">
            <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t.successTitle}</h3>
            <p className="opacity-90">{t.successMessage}</p>
          </div>
          <div className="p-6 bg-white">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-teal-700 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Testimonial Form Component
  const TestimonialForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      treatment: "",
      rating: 0,
      title: "",
      testimony: "",
      image: null,
    });
    const [preview, setPreview] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("treatment", formData.treatment);
        formDataToSend.append("testimony", formData.testimony);
        formDataToSend.append("rating", formData.rating.toString());
        
        if (formData.image) {
          formDataToSend.append("image", formData.image);
        }

        await submitTestimonial(formDataToSend);

        setIsSubmitted(true);
        setIsLoading(false);

        // Reset form
        setFormData({
          name: "",
          email: "",
          treatment: "",
          rating: 0,
          title: "",
          testimony: "",
          image: null,
        });
        setPreview(null);

        // Immediately close form and show success
        if (onClose) onClose();
        setShowSuccess(true);

        // Hide success notification after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);

      } catch (error) {
        console.error("Error submitting testimonial:", error);
        setError(error.response?.data?.message || "Failed to submit testimonial. Please try again.");
        setIsLoading(false);
      }
    };

    const handleChange = (e) => {
      const { name, value, type, files } = e.target;

      if (type === "file") {
        const file = files[0];
        setFormData({ ...formData, image: file });
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => setPreview(e.target.result);
          reader.readAsDataURL(file);
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };

    const handleRatingChange = (rating) => {
      setFormData({ ...formData, rating });
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[95vh] p-6 sm:p-8">
          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="h-7 w-7 text-orange-500 mr-2" />
            {t.formTitle}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                  {t.thankYou}
                </h3>
                <p className="text-green-700 text-sm sm:text-base">
                  {t.submitted}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* name & email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* treatment */}
              <div>
                <label
                  htmlFor="treatment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.treatment}
                  </label>
                  <select
                    id="treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">
                      {t.selectTreatment}
                    </option>
                    <option value="Dental Care">Dental Care</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Pediatric Care">Pediatric Care</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              {/* rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.rating}
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={`text-xl ${
                        star <= formData.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:text-yellow-400`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating} / 5
                  </span>
                </div>
              </div>

              {/* title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t.testimonyTitle}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* testimony */}
              <div>
                <label
                  htmlFor="testimony"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t.experience}
                </label>
                <textarea
                  id="testimony"
                  name="testimony"
                  value={formData.testimony}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                ></textarea>
              </div>

              {/* image upload */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1 items-center"
                >
                  <ImageIcon className="h-4 w-4 mr-1 text-blue-500" />
                  {t.upload}
                </label>

                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                <label
                  htmlFor="image"
                  className="inline-block cursor-pointer bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  {t.chooseFile}
                </label>

                {formData.image && (
                  <span className="ml-3 text-sm text-gray-600">
                    {formData.image.name}
                  </span>
                )}

                {preview && (
                  <div className="mt-2">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Send className="h-5 w-5 mr-2" />
                )}
                {isLoading ? "Submitting..." : t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  };

  return (
    <article className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subheading}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        ) : !testimonials || testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t.noTestimonials}</p>
          </div>
        ) : (
          <>
            {/* Slider */}
            <div className="w-full relative">
              <div className="overflow-hidden mx-0 md:mx-8">
                <div
                  ref={containerRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${(current * 100) / visibleCards}%)`,
                  }}
                >
                  {(testimonials || []).map((testimonial, index) => (
                    <div
                      key={testimonial._id || index}
                      className="px-2 md:px-4 flex-shrink-0"
                      style={{
                        width: `${100 / visibleCards}%`,
                        minWidth: `${100 / visibleCards}%`,
                      }}
                    >
                      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md h-full">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-6 italic text-base md:text-lg">
                          "{testimonial.testimony}"
                        </p>
                        <div className="flex items-center">
                          {renderUserAvatar(testimonial)}
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg md:text-xl">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-600 text-sm md:text-base">
                              {testimonial.treatment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Dots */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === current
                        ? "bg-orange-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Share button */}
        <div className="text-center mt-12 relative z-20">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>{t.shareButton}</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && <TestimonialForm onClose={() => setIsOpen(false)} />}
      
      {/* Success Notification */}
      {showSuccess && <SuccessNotification onClose={() => setShowSuccess(false)} />}
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
      `}</style>
    </article>
  );
}