import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoData, structuredDataTemplates } from '../components/SEO/seoData';
import { generateFuzzyKeywords } from '../utils/fuzzySearchKeywords';

export const useSEO = (pageKey, customData = {}, lang = 'en') => {
  const location = useLocation();

  useEffect(() => {
    const pageSEO = seoData[pageKey]?.[lang] || seoData.home[lang];
    
    const seoConfig = {
      ...pageSEO,
      ...customData,
      url: `${window.location.origin}${location.pathname}${location.search}`
    };

    if (seoConfig.title) {
      document.title = seoConfig.title;
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && seoConfig.description) {
      metaDescription.setAttribute('content', seoConfig.description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && seoConfig.keywords) {
      metaKeywords.setAttribute('content', seoConfig.keywords);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', seoConfig.url);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && seoConfig.title) {
      ogTitle.setAttribute('content', seoConfig.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && seoConfig.description) {
      ogDescription.setAttribute('content', seoConfig.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', seoConfig.url);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && seoConfig.image) {
      ogImage.setAttribute('content', seoConfig.image);
    }

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle && seoConfig.title) {
      twitterTitle.setAttribute('content', seoConfig.title);
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription && seoConfig.description) {
      twitterDescription.setAttribute('content', seoConfig.description);
    }

    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage && seoConfig.image) {
      twitterImage.setAttribute('content', seoConfig.image);
    }

    document.documentElement.lang = lang;

    if (customData.structuredData) {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.textContent = JSON.stringify(customData.structuredData);
      }
    }

  }, [pageKey, customData, lang, location]);

  return {
    updateSEO: (newData) => {
      const updatedData = { ...customData, ...newData };
      return updatedData;
    }
  };
};

export const generateBreadcrumbs = (items) => {
  return structuredDataTemplates.breadcrumb(items);
};

export const generateDoctorStructuredData = (doctor) => {
  return structuredDataTemplates.doctor(doctor);
};

export const generateServiceStructuredData = (service) => {
  return structuredDataTemplates.service(service);
};

export const seoPatterns = {
  doctor: (doctor, lang = 'en') => ({
    title: lang === 'am' 
      ? `ዶክተር ${doctor.name} | ብሩህኪድስ የህፃናት ስፔሻሊስት`
      : `Dr. ${doctor.name} | BiruhKids Pediatric Specialist`,
    description: lang === 'am'
      ? `ዶክተር ${doctor.name} በብሩህኪድስ የህፃናት ክሊኒክ የህፃናት ስፔሻሊስት ዶክተር ነው። የባለሙያ የህፃናት ህክምና አገልግሎት።`
      : `Dr. ${doctor.name} is a pediatric specialist at BiruhKids Clinic. Expert pediatric care and consultation services.`,
    keywords: lang === 'am'
      ? `ዶክተር ${doctor.name}, የህፃናት ዶክተር, ብሩህኪድስ, አዲስ አበባ የህፃናት ስፔሻሊስት`
      : `Dr. ${doctor.name}, pediatrician, BiruhKids, Addis Ababa pediatric specialist`,
    structuredData: generateDoctorStructuredData(doctor)
  }),

  service: (service, lang = 'en') => ({
    title: lang === 'am'
      ? `${service.name} | ብሩህኪድስ የህፃናት አገልግሎት`
      : `${service.name} | BiruhKids Pediatric Service`,
    description: lang === 'am'
      ? `${service.description} በብሩህኪድስ የህፃናት ክሊኒክ የሚሰጥ ልዩ የህፃናት አገልግሎት።`
      : `${service.description} Specialized pediatric service provided at BiruhKids Clinic.`,
    keywords: lang === 'am'
      ? `${service.name}, የህፃናት አገልግሎት, ብሩህኪድስ, አዲስ አበባ`
      : `${service.name}, pediatric service, BiruhKids, Addis Ababa`,
    structuredData: generateServiceStructuredData(service)
  }),

  appointment: (doctor = null, lang = 'en') => ({
    title: lang === 'am'
      ? `የህፃናት ቀጠሮ ያስይዙ ${doctor ? `ከዶክተር ${doctor.name} ጋር` : ''} | ብሩህኪድስ`
      : `Book Pediatric Appointment ${doctor ? `with Dr. ${doctor.name}` : ''} | BiruhKids`,
    description: lang === 'am'
      ? `በብሩህኪድስ የህፃናት ክሊኒክ ${doctor ? `ከዶክተር ${doctor.name} ጋር` : ''} የልጅዎን ቀጠሮ በመስመር ላይ ያስይዙ።`
      : `Book your child's appointment online at BiruhKids Pediatric Clinic ${doctor ? `with Dr. ${doctor.name}` : ''}.`,
    keywords: lang === 'am'
      ? `የህፃናት ቀጠሮ, የመስመር ላይ ቀጠሮ, ብሩህኪድስ ቀጠሮ, አዲስ አበባ የህፃናት ቀጠሮ${doctor ? `, ዶክተር ${doctor.name}` : ''}`
      : `pediatric appointment, online booking, BiruhKids appointment, Addis Ababa pediatric booking${doctor ? `, Dr. ${doctor.name}` : ''}`
  })
};