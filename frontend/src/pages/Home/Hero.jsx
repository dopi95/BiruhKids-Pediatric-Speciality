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
		<div className="relative h-[92vh] overflow-hidden z-10">
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
					src="https://res.cloudinary.com/door11ovj/video/upload/v1758629721/ASSET-1_t4foak.mp4"
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
						<div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
							<div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
								<h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
									<span className="bg-gradient-to-r from-blue-500 via-orange-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
										{lang === "En" ? clinicName.en : clinicName.am}
									</span>
								</h2>
								<h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-8 leading-tight">
									<span className="text-white drop-shadow-2xl">
										{slide.title[currentLang]}
									</span>
								</h3>
								<p className="text-lg sm:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-12 drop-shadow-xl">
									{slide.tagline[currentLang]}
								</p>
								<div className="flex flex-col mt-10 gap-6 sm:flex-row sm:justify-center sm:gap-8">
									<button className="group relative overflow-hidden backdrop-blur-md bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-blue-500/30 border border-white/30 hover:border-blue-400/50">
										<div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-orange-500/30 to-blue-500/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
										<div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<Link
											to="/appointment"
											className="relative z-10 flex items-center justify-center gap-2"
										>
											<span className="drop-shadow-lg">
												{currentLang === "am"
													? "ቀጠሮ ያስይዙ"
													: "Book Appointment"}
											</span>
										</Link>
									</button>
									<button className="group relative overflow-hidden backdrop-blur-md bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-orange-500/30 border border-white/30 hover:border-orange-400/50">
										<div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-orange-500/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
										<div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<Link
											to="/register"
											className="relative z-10 flex items-center justify-center gap-2"
										>
											<span className="drop-shadow-lg">
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

			{/* Prev Button - Desktop only */}
			<button
				onClick={goToPrev}
				className="hidden md:flex absolute left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 hover:from-blue-400/50 hover:to-cyan-400/50 backdrop-blur-md text-white p-4 rounded-full transition-all duration-500 hover:scale-125 z-[70] border border-white/20 shadow-2xl hover:shadow-blue-500/25"
				aria-label="Previous slide"
			>
				<ChevronLeft size={28} className="drop-shadow-lg" />
			</button>

			{/* Next Button - Desktop only */}
			<button
				onClick={goToNext}
				className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 hover:from-cyan-400/50 hover:to-blue-400/50 backdrop-blur-md text-white p-4 rounded-full transition-all duration-500 hover:scale-125 z-[70] border border-white/20 shadow-2xl hover:shadow-cyan-500/25"
				aria-label="Next slide"
			>
				<ChevronRight size={28} className="drop-shadow-lg" />
			</button>

			{/* Dots - Clickable on all devices */}
			<div className="flex absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 space-x-2 md:space-x-4 z-[70]">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`transition-all duration-500 rounded-full border border-white/30 backdrop-blur-sm touch-manipulation ${
							index === getActualSlideIndex()
								? "w-8 md:w-12 h-3 md:h-4 bg-gradient-to-r from-cyan-400 to-blue-500 scale-110 shadow-lg shadow-blue-500/50"
								: "w-3 md:w-4 h-3 md:h-4 bg-white/40 hover:bg-white/60 hover:scale-110 active:scale-125"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Hero;