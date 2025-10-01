import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Phone, MapPin, Youtube, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = ({ lang = "En" }) => {
	const [currentSlide, setCurrentSlide] = useState(1);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const touchStartX = useRef(null);
	const touchEndX = useRef(null);
	const autoPlayRef = useRef();
	const carouselRef = useRef(null);

	// English + Amharic text
	const slides = [
		{
			id: 0,
			title: {
				en: "BiruhKids",
				am: "ብሩህኪድስ",
			},
			tagline: {
				en: "Where children become bright and healthy!",
				am: "ልጆች ብሩህ እና ጤናማ የሚሆኑበት!",
			},
			isWelcomeSlide: true,
		},
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
		autoPlayRef.current = setInterval(goToNext, 15000);
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
		en: "BiruhKids Pediatric Speciality Clinic",
		am: "ብሩህኪድስ የህፃናት ልዩ ክሊኒክ",
	};

	const currentLang = lang === "En" ? "en" : "am";

	// Phone popup state
	const [showPhonePopup, setShowPhonePopup] = useState(false);

	// Welcome Slide Component
	const WelcomeSlide = ({ slide, currentLang, clinicName, lang }) => {
		const handlePhoneCall = (phoneNumber) => {
			window.location.href = `tel:${phoneNumber}`;
			setShowPhonePopup(false);
		};

		const handleLocationClick = () => {
			window.open('https://maps.app.goo.gl/JTYwvp7FoZiGTFid8?g_st=atm', '_blank');
		};

		return (
			<div className="backdrop-blur-md bg-black/30 rounded-xl sm:rounded-2xl pt-6 pb-6 px-4 xs:pt-8 xs:pb-7 xs:px-5 sm:pt-10 sm:pb-8 sm:px-6 md:pt-12 md:pb-10 md:px-7 lg:pt-8 lg:pb-7 lg:px-6 xl:pt-10 xl:pb-8 xl:px-8 border border-white/30 shadow-2xl font-sans">
				{/* 24 Hour Service Announcement */}
				<div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-4 flex justify-center">
					<div className="relative overflow-hidden">
						<div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full shadow-2xl border border-white/20 backdrop-blur-md animate-pulse">
							<div className="flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base md:text-base lg:text-base xl:text-lg font-black">
								<div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
								<span className="drop-shadow-lg whitespace-nowrap font-black">
									{currentLang === "am" ? "24/7 አገልግሎት" : "24/7 Service"}
								</span>
								<div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
							</div>
						</div>
						{/* Animated glow effect */}
						<div className="absolute inset-0 bg-gradient-to-r from-red-400/50 via-orange-400/50 to-red-400/50 rounded-full blur-lg animate-pulse -z-10"></div>
					</div>
				</div>
				<h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-2 xs:mb-3 sm:mb-4 md:mb-4 lg:mb-3 xl:mb-4 leading-tight font-sans">
					{lang === "En" ? (
						<>
							<span className="text-blue-500 drop-shadow-2xl font-black">BiruhKids</span>{" "}
							<span className="text-orange-500 drop-shadow-2xl font-black">Pediatric</span>{" "}
							<span className="text-blue-500 drop-shadow-2xl font-black">Speciality</span>{" "}
							<span className="text-orange-500 drop-shadow-2xl font-black">Clinic</span>
						</>
					) : (
						<>
							<span className="text-blue-500 drop-shadow-2xl font-black">ብሩህኪድስ</span>{" "}
							<span className="text-orange-500 drop-shadow-2xl font-black">የህፃናት</span>{" "}
							<span className="text-blue-500 drop-shadow-2xl font-black">ልዩ</span>{" "}
							<span className="text-orange-500 drop-shadow-2xl font-black">ክሊኒክ</span>
						</>
					)}
				</h2>
				<h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 md:mb-4 lg:mb-3 xl:mb-4 leading-tight font-sans">
					<span className="text-white drop-shadow-2xl font-bold">
						{slide.title[currentLang]}
					</span>
				</h3>
				<p className="text-lg xs:text-xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl text-white max-w-full leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-4 xl:mb-6 drop-shadow-2xl px-2 xs:px-0 font-medium font-sans">
					{slide.tagline[currentLang]}
				</p>

				{/* Social Media & Contact Icons */}
				<div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-6 animate-fade-in-up animation-delay-600">
					{/* Phone */}
					<button
						onClick={() => setShowPhonePopup(true)}
						className="group relative p-3 sm:p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-blue-500/50 border border-blue-400"
					>
						<Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-colors" />
					</button>

					{/* Location */}
					<button
						onClick={handleLocationClick}
						className="group relative p-3 sm:p-4 bg-orange-500 hover:bg-orange-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-orange-500/50 border border-orange-400"
					>
						<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-colors" />
					</button>

					{/* YouTube */}
					<a
						href="https://www.youtube.com/@ብሩህkids"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative p-3 sm:p-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-blue-600/50 border border-blue-500"
					>
						<Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-colors" />
					</a>

					{/* TikTok */}
					<a
						href="https://www.tiktok.com/@biruhkids?_t=ZM-8zHeQeJllLk&_r=1"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative p-3 sm:p-4 bg-orange-600 hover:bg-orange-700 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-orange-600/50 border border-orange-500"
					>
						<svg className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
							<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
						</svg>
					</a>

					{/* Facebook */}
					<a
						href="https://www.facebook.com/DrFasilPediatrician"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative p-3 sm:p-4 bg-blue-700 hover:bg-blue-800 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-blue-700/50 border border-blue-600"
					>
						<Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-colors" />
					</a>
				</div>

				{/* Dots - Inside slider box */}
				<div className="flex justify-center mt-5 xs:mt-6 sm:mt-7 md:mt-9 lg:mt-6 xl:mt-8 space-x-1.5 xs:space-x-2 md:space-x-3">
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

				{/* Phone Popup */}
				{showPhonePopup && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
						<div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm mx-4 shadow-2xl animate-scale-in">

							<div className="space-y-4">
								<button
									onClick={() => handlePhoneCall("+251963555552")}
									className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-colors"
								>
									<Phone className="w-5 h-5" />
									+251963555552
								</button>
								<button
									onClick={() => handlePhoneCall("+251939602927")}
									className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold transition-colors"
								>
									<Phone className="w-5 h-5" />
									+251939602927
								</button>
								<button
									onClick={() => setShowPhonePopup(false)}
									className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-medium transition-colors"
								>
									{currentLang === "am" ? "ይቅር" : "Cancel"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

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
						className="min-w-full h-full relative flex items-start md:items-center justify-center pt-16 xs:pt-20 sm:pt-24 md:pt-0"
					>
						<div className="text-center text-white px-3 xs:px-4 sm:px-6 lg:px-8 max-w-sm xs:max-w-md sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mt-0">
							{slide.isWelcomeSlide ? (
								<WelcomeSlide slide={slide} currentLang={currentLang} clinicName={clinicName} lang={lang} />
							) : (
								<div className="backdrop-blur-md bg-black/30 rounded-xl sm:rounded-2xl pt-6 pb-6 px-4 xs:pt-8 xs:pb-7 xs:px-5 sm:pt-10 sm:pb-8 sm:px-6 md:pt-12 md:pb-10 md:px-7 lg:pt-8 lg:pb-7 lg:px-6 xl:pt-10 xl:pb-8 xl:px-8 border border-white/30 shadow-2xl font-sans">
									{/* 24 Hour Service Announcement */}
									<div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-4 flex justify-center">
										<div className="relative overflow-hidden">
											<div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full shadow-2xl border border-white/20 backdrop-blur-md animate-pulse">
												<div className="flex items-center gap-1.5 xs:gap-2 text-sm xs:text-base md:text-base lg:text-base xl:text-lg font-black">
													<div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
													<span className="drop-shadow-lg whitespace-nowrap font-black">
														{currentLang === "am" ? "24/7 አገልግሎት" : "24/7 Service"}
													</span>
													<div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-white rounded-full animate-ping"></div>
												</div>
											</div>
											{/* Animated glow effect */}
											<div className="absolute inset-0 bg-gradient-to-r from-red-400/50 via-orange-400/50 to-red-400/50 rounded-full blur-lg animate-pulse -z-10"></div>
										</div>
									</div>
									<h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-2 xs:mb-3 sm:mb-4 md:mb-4 lg:mb-3 xl:mb-4 leading-tight font-sans">
										{lang === "En" ? (
											<>
												<span className="text-blue-500 drop-shadow-2xl font-black">BiruhKids</span>{" "}
												<span className="text-orange-500 drop-shadow-2xl font-black">Pediatric</span>{" "}
												<span className="text-blue-500 drop-shadow-2xl font-black">Speciality</span>{" "}
												<span className="text-orange-500 drop-shadow-2xl font-black">Clinic</span>
											</>
										) : (
											<>
												<span className="text-blue-500 drop-shadow-2xl font-black">ብሩህኪድስ</span>{" "}
												<span className="text-orange-500 drop-shadow-2xl font-black">የህፃናት</span>{" "}
												<span className="text-blue-500 drop-shadow-2xl font-black">ልዩ</span>{" "}
												<span className="text-orange-500 drop-shadow-2xl font-black">ክሊኒክ</span>
											</>
										)}
									</h2>
									<h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 md:mb-4 lg:mb-3 xl:mb-4 leading-tight font-sans">
										<span className="text-white drop-shadow-2xl font-bold">
											{slide.title[currentLang]}
										</span>
									</h3>
									<p className="text-lg xs:text-xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl text-white max-w-full leading-relaxed mb-4 xs:mb-5 sm:mb-6 md:mb-6 lg:mb-4 xl:mb-6 drop-shadow-2xl px-2 xs:px-0 font-medium font-sans">
										{slide.tagline[currentLang]}
									</p>
									<div className="flex flex-col gap-3 xs:gap-4 sm:flex-row sm:justify-center sm:gap-4 md:gap-6 lg:gap-8">
										<button className="group relative overflow-hidden bg-orange-500 hover:bg-orange-600 text-white px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl text-sm xs:text-base sm:text-lg md:text-xl font-bold transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 shadow-2xl hover:shadow-orange-500/50 border border-orange-400">
											<Link
												to="/appointment"
												className="flex items-center justify-center gap-2"
											>
												<span className="drop-shadow-lg whitespace-nowrap">
													{currentLang === "am"
														? "ቀጠሮ ያስይዙ"
														: "Book Appointment"}
												</span>
											</Link>
										</button>
										<button className="group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl text-sm xs:text-base sm:text-lg md:text-xl font-bold transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 shadow-2xl hover:shadow-blue-500/50 border border-blue-400">
											<Link
												to="/register"
												className="flex items-center justify-center gap-2"
											>
												<span className="drop-shadow-lg whitespace-nowrap">
													{currentLang === "am"
														? "ይጀምሩ"
														: "Get Started"}
												</span>
											</Link>
										</button>
									</div>
									{/* Dots - Inside slider box */}
									<div className="flex justify-center mt-5 xs:mt-6 sm:mt-7 md:mt-9 lg:mt-6 xl:mt-8 space-x-1.5 xs:space-x-2 md:space-x-3">
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
							)}
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
		</div>
	);
};

export default Hero;