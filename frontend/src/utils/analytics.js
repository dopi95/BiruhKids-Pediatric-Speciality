// Google Analytics 4 Configuration
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 tracking ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'clinic_type',
        'custom_parameter_2': 'user_language'
      }
    });
  }
};

// Track page views
export const trackPageView = (url, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track appointment bookings
export const trackAppointmentBooking = (doctorName, appointmentDate, language) => {
  trackEvent('appointment_booking', 'engagement', `Doctor: ${doctorName}`, 1);
  trackEvent('appointment_date', 'engagement', appointmentDate, 1);
  trackEvent('user_language', 'user_behavior', language, 1);
};

// Track doctor profile views
export const trackDoctorView = (doctorName, language) => {
  trackEvent('doctor_profile_view', 'engagement', `Doctor: ${doctorName}`, 1);
  trackEvent('content_language', 'user_behavior', language, 1);
};

// Track service page views
export const trackServiceView = (serviceName, language) => {
  trackEvent('service_view', 'engagement', `Service: ${serviceName}`, 1);
  trackEvent('service_language', 'user_behavior', language, 1);
};

// Track contact form submissions
export const trackContactForm = (formType, language) => {
  trackEvent('contact_form_submit', 'engagement', formType, 1);
  trackEvent('form_language', 'user_behavior', language, 1);
};

// Track newsletter subscriptions
export const trackNewsletterSignup = (language) => {
  trackEvent('newsletter_signup', 'engagement', 'Newsletter', 1);
  trackEvent('newsletter_language', 'user_behavior', language, 1);
};

// Track chatbot interactions
export const trackChatbotUsage = (query, language) => {
  trackEvent('chatbot_interaction', 'engagement', 'AI_Chatbot', 1);
  trackEvent('chatbot_language', 'user_behavior', language, 1);
  trackEvent('chatbot_query_type', 'user_behavior', query, 1);
};

// Track search queries
export const trackSearch = (searchTerm, language, resultsCount) => {
  trackEvent('site_search', 'engagement', searchTerm, resultsCount);
  trackEvent('search_language', 'user_behavior', language, 1);
};

// Track video interactions
export const trackVideoInteraction = (videoTitle, action, language) => {
  trackEvent('video_interaction', 'engagement', `${action}: ${videoTitle}`, 1);
  trackEvent('video_language', 'user_behavior', language, 1);
};

// Track testimonial interactions
export const trackTestimonialView = (testimonialId, language) => {
  trackEvent('testimonial_view', 'engagement', `Testimonial: ${testimonialId}`, 1);
  trackEvent('testimonial_language', 'user_behavior', language, 1);
};

// Track language switching
export const trackLanguageSwitch = (fromLang, toLang) => {
  trackEvent('language_switch', 'user_behavior', `${fromLang}_to_${toLang}`, 1);
};

// Track mobile vs desktop usage
export const trackDeviceType = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  trackEvent('device_type', 'user_behavior', isMobile ? 'mobile' : 'desktop', 1);
};

// Enhanced ecommerce tracking for appointment bookings
export const trackAppointmentPurchase = (appointmentId, doctorName, fee, currency = 'ETB') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: appointmentId,
      value: fee,
      currency: currency,
      items: [{
        item_id: appointmentId,
        item_name: `Appointment with ${doctorName}`,
        category: 'Medical Consultation',
        quantity: 1,
        price: fee
      }]
    });
  }
};

// Track user engagement time
export const trackEngagementTime = (timeSpent, pageName) => {
  trackEvent('engagement_time', 'user_behavior', pageName, Math.round(timeSpent));
};

// Track scroll depth
export const trackScrollDepth = (percentage, pageName) => {
  trackEvent('scroll_depth', 'user_behavior', `${pageName}_${percentage}%`, percentage);
};