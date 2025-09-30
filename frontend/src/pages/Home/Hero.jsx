import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = ({ lang = "En" }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const touchStartX = useRef(null);
	const touchEndX = useRef(null);
	const autoPlayRef = useRef();
	const carouselRef = useRef(null);

	// English + Amharic text
	const slides = [
		{
			id: 1,
			title: {
				en: "Pediatric healthcare services",
				am: "የህፃናት ጤና አገልግሎቶች",
			},
			tagline: {
				en: "designed to meet the unique needs of children.",
				am: "ልዩ የህፃናት ፍላጎት ለማሟላት የተዘጋጀ።",
			},
		},
		{
			id: 2,
			title: {
				en: "Outpatient care (OPD)",
				am: "የውጭ ሕክምና አገልግሎት (OPD)",
			},
			tagline: {
				en: "Our clinic provides comprehensive evaluations, diagnoses, and treatments for children of all ages.",
				am: "ክሊኒካችን ለሁሉም እድሜ የህፃናት ሙሉ ግምገማ፣ ምርመራ እና ህክምና ያቀርባል።",
			},
		},
		{
			id: 3,
			title: {
				en: "Emergency care",
				am: "አደጋ ጊዜ አገልግሎት",
			},
			tagline: {
				en: "We offer urgent medical services for children in need of immediate attention.",
				am: "እንቅስቃሴ ያስፈልጋቸውን ህፃናት አስቸኳይ የሕክምና አገልግሎት እንሰጣለን።",
			},
		},
		{
			id: 4,
			title: {
				en: "Laboratory and Imaging Services",
				am: "የላቦራቶሪ እና ምስል አገልግሎቶች",
			},
			tagline: {
				en: "Our clinic is equipped with state-of-the-art laboratory machines and advanced imaging technology.",
				am: "ክሊኒካችን በዘመናዊ የላቦራቶሪ መሳሪያዎች እና በላቀ የምስል ቴክኖሎጂ የተዘጋጀ ነው።",
			},
		},
	];

	const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

	const goToSlide = useCallback((index) => {
		setCurrentSlide(index + 1);
	}, []);

	const goToNext = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentSlide((prev) => prev + 1);
	}, [isTransitioning]);

	const goToPrev = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentSlide((prev) => prev - 1);
	}, [isTransitioning]);

	useEffect(() => {
		const handleTransitionEnd = () => {
			setIsTransitioning(false);

			if (currentSlide === 0) {
				if (carouselRef.current) {
					carouselRef.current.style.transition = "none";
					setCurrentSlide(slides.length);
					setTimeout(() => {
						if (carouselRef.current) {
							carouselRef.current.style.transition =
								"transform 0.7s ease-in-out";
						}
					}, 50);
				}
			} else if (currentSlide === slides.length + 1) {
				if (carouselRef.current) {
					carouselRef.current.style.transition = "none";
					setCurrentSlide(1);
					setTimeout(() => {
						if (carouselRef.current) {
							carouselRef.current.style.transition =
								"transform 0.7s ease-in-out";
						}
					}, 50);
				}
			}
		};

		const carousel = carouselRef.current;
		if (carousel) {
			carousel.addEventListener("transitionend", handleTransitionEnd);
			return () =>
				carousel.removeEventListener(
					"transitionend",
					handleTransitionEnd
				);
		}
	}, [currentSlide, slides.length]);

	useEffect(() => {
		autoPlayRef.current = setInterval(goToNext, 9000);
		return () => clearInterval(autoPlayRef.current);
	}, [goToNext]);

	const handleTouchStart = (e) => {
		touchStartX.current = e.targetTouches[0].clientX;
	};

	const handleTouchMove = (e) => {
		touchEndX.current = e.targetTouches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (!touchStartX.current || !touchEndX.current) return;
		const distance = touchStartX.current - touchEndX.current;
		if (distance > 50) goToNext();
		else if (distance < -50) goToPrev();
		touchStartX.current = null;
		touchEndX.current = null;
	};

	const getActualSlideIndex = () => {
		if (currentSlide === 0) return slides.length - 1;
		if (currentSlide === slides.length + 1) return 0;
		return currentSlide - 1;
	};

	const clinicName = {
		en: "BiruhKids Pediatric Specialty Clinic",
		am: "ብሩህኪድስ የህፃናት ልዩ ክሊኒክ",
	};

	const currentLang = lang === "En" ? "en" : "am";

	return (
		<div className="relative h-screen xl:h-[92vh] overflow-hidden z-10">
			<video
				autoPlay
				muted
				loop
				playsInline
				preload="metadata"
				onEnded={(e) => e.target.play()}
				className="absolute top-0 left-0 w-full h-full object-cover z-10"
				style={{
					minHeight: "100vh",
					minWidth: "100vw",
					objectFit: "cover",
					objectPosition: "center",
				}}
			>
				<source
					src="https://res.cloudinary.com/door11ovj/video/upload/v1758725830/biruhkids-hero-video_sjxcaf.mp4"
					type="video/mp4"
				/>
			</video>

			{/* Blue to White Mirror Overlay */}
			<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/40 via-blue-400/25 to-white/15 backdrop-blur-[1px] z-20" />
			<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-900/30 via-transparent to-white/10 z-30" />

			{/* Glass Effect Overlay */}
			<div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-[0.5px] z-40" />



			<div
				ref={carouselRef}
				className="flex transition-transform duration-700 ease-in-out h-full relative z-50"
				style={{ transform: `translateX(-${currentSlide * 100}%)` }}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{extendedSlides.map((slide, index) => (
					<div
						key={`${slide.id}-${index}`}
						className="min-w-full h-full relative flex items-center justify-center"
					>
						<div className="text-center text-white px-3 xs:px-4 sm:px-6 lg:px-8 max-w-sm xs:max-w-md sm:max-w-3xl md:max-w-3xl lg:max-w-2xl xl:max-w-3xl mx-auto">
							<div className="backdrop-blur-sm bg-white/8 rounded-xl sm:rounded-2xl pt-10 pb-9 px-5 xs:pt-12 xs:pb-10 xs:px-6 sm:pt-14 sm:pb-12 sm:px-7 md:pt-16 md:pb-14 md:px-8 lg:pt-8 lg:pb-7 lg:px-6 xl:pt-10 xl:pb-8 xl:px-7 border border-white/15 shadow-2xl">
								{/* 24 Hour Service Announcement */}
								<div className="mb-4 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-5 flex justify-center">
									<div className="relative overflow-hidden">
										<div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full shadow-2xl border border-white/20 backdrop-blur-md animate-pulse">
											<div className="flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm md:text-base font-bold">
												<div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
												<span className="drop-shadow-lg whitespace-nowrap">
													{currentLang === "am" ? "24 ሰዓት አገልግሎት" : "24 Hour Service"}
												</span>
												<div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
											</div>
										</div>
										{/* Animated glow effect */}
										<div className="absolute inset-0 bg-gradient-to-r from-red-400/50 via-orange-400/50 to-red-400/50 rounded-full blur-lg animate-pulse -z-10"></div>
									</div>
								</div>
								<h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-3 xl:mb-5 leading-tight">
									<span className="bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
										{lang === "En" ? clinicName.en : clinicName.am}
									</span>
								</h2>
								<h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-3 xl:mb-5 leading-tight">
									<span className="text-white drop-shadow-2xl">
										{slide.title[currentLang]}
									</span>
								</h3>
								<p className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-white/95 max-w-full leading-relaxed mb-5 xs:mb-6 sm:mb-7 md:mb-8 lg:mb-4 xl:mb-7 drop-shadow-xl px-2 xs:px-0">
									{slide.tagline[currentLang]}
								</p>
								<div className="flex flex-col gap-3 xs:gap-4 sm:flex-row sm:justify-center sm:gap-4 md:gap-6 lg:gap-8">
									<button className="group relative overflow-hidden backdrop-blur-md bg-white/10 hover:bg-white/20 text-white px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl text-sm xs:text-base sm:text-lg md:text-xl font-bold transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 shadow-2xl hover:shadow-blue-500/30 border border-white/30 hover:border-blue-400/50">
										<div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-orange-500/30 to-blue-500/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
										<div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<Link
											to="/appointment"
											className="relative z-10 flex items-center justify-center gap-2"
										>
											<span className="drop-shadow-lg whitespace-nowrap">
												{currentLang === "am"
													? "ቀጠሮ ያስይዙ"
													: "Book Appointment"}
											</span>
										</Link>
									</button>
									<button className="group relative overflow-hidden backdrop-blur-md bg-white/10 hover:bg-white/20 text-white px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl text-sm xs:text-base sm:text-lg md:text-xl font-bold transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 shadow-2xl hover:shadow-orange-500/30 border border-white/30 hover:border-orange-400/50">
										<div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-orange-500/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
										<div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<Link
											to="/register"
											className="relative z-10 flex items-center justify-center gap-2"
										>
											<span className="drop-shadow-lg whitespace-nowrap">
												{currentLang === "am"
													? "ይጀምሩ"
													: "Get Started"}
											</span>
										</Link>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Prev Button - Tablet and Desktop */}
			<button
				onClick={goToPrev}
				className="hidden md:flex absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 hover:from-blue-400/50 hover:to-cyan-400/50 backdrop-blur-md text-white p-3 lg:p-4 rounded-full transition-all duration-500 hover:scale-125 z-[70] border border-white/20 shadow-2xl hover:shadow-blue-500/25"
				aria-label="Previous slide"
			>
				<ChevronLeft size={24} className="lg:w-7 lg:h-7 drop-shadow-lg" />
			</button>

			{/* Next Button - Tablet and Desktop */}
			<button
				onClick={goToNext}
				className="hidden md:flex absolute right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 hover:from-cyan-400/50 hover:to-blue-400/50 backdrop-blur-md text-white p-3 lg:p-4 rounded-full transition-all duration-500 hover:scale-125 z-[70] border border-white/20 shadow-2xl hover:shadow-cyan-500/25"
				aria-label="Next slide"
			>
				<ChevronRight size={24} className="lg:w-7 lg:h-7 drop-shadow-lg" />
			</button>

			{/* Dots - Outside slider box */}
			<div className="flex fixed xl:absolute bottom-8 xs:bottom-10 sm:bottom-12 md:bottom-6 lg:bottom-8 xl:bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5 xs:space-x-2 md:space-x-3 z-[80]">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`transition-all duration-500 rounded-full border border-white/30 backdrop-blur-sm touch-manipulation ${
							index === getActualSlideIndex()
								? "w-6 xs:w-7 sm:w-8 md:w-10 lg:w-12 h-2.5 xs:h-3 md:h-3.5 lg:h-4 bg-gradient-to-r from-cyan-400 to-blue-500 scale-110 shadow-lg shadow-blue-500/50"
								: "w-2.5 xs:w-3 md:w-3.5 lg:w-4 h-2.5 xs:h-3 md:h-3.5 lg:h-4 bg-white/40 hover:bg-white/60 hover:scale-110 active:scale-125"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Hero;