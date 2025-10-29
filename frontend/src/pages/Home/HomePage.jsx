import { useEffect, useContext } from 'react';
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Doctors from "./Doctors";
import Testimonials from "./Testimonials";
import Faq from "./Faqs";
import GoogleMap from "../../components/GoogleMap";
import OnlineConsultation from "../../components/OnlineConsultation";
import ErrorBoundary from "../../components/ErrorBoundary";
import { SEOHead } from '../../components/SEO';
import { useSEO } from '../../hooks/useSEO';
import { trackPageView, trackDeviceType } from '../../utils/analytics';
import { LanguageContext } from '../../context/LanguageContext';

function HomePage({ lang }) {
    const { language } = useContext(LanguageContext);
    const currentLang = language || lang || 'en';
    
    useSEO('home', {}, currentLang);
    
    useEffect(() => {
        trackPageView(window.location.href, document.title);
        trackDeviceType();
    }, []);
    return (
        <>
            <SEOHead 
                title={currentLang === 'am' ? 'ብሩህኪድስ ልዩ የህፃናት ክሊኒክ | በአዲስ አበባ ምርጥ የህፃናት ሆስፒታል' : 'BiruhKids Pediatric Specialty Clinic | Best Children Hospital in Addis Ababa Ethiopia'}
                description={currentLang === 'am' ? 'ብሩህኪድስ በአዲስ አበባ የሚገኝ ዋና የህፃናት ልዩ ክሊኒክ ነው። የባለሙያ የህፃናት ዶክተሮች፣ የመስመር ላይ ቀጠሮ፣ ልዩ የህፃናት የጤና አገልግሎት።' : 'BiruhKids is the leading pediatric specialty clinic in Addis Ababa, Ethiopia. Expert pediatricians, online appointments, specialized children healthcare services.'}
                keywords={currentLang === 'am' ? 'ብሩህኪድስ, የህፃናት ክሊኒክ, አዲስ አበባ, ኢትዮጵያ, የህፃናት ዶክተር, የህፃናት ህክምና' : 'BiruhKids, pediatric clinic, children hospital, Addis Ababa, Ethiopia, pediatrician, child doctor'}
                lang={currentLang}
            />
            <div className="w-full overflow-x-hidden">
            <ErrorBoundary>
                <Hero lang={lang} />
            </ErrorBoundary>
            <ErrorBoundary>
                <About lang={lang} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Services lang={lang} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Doctors lang={lang} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Testimonials lang={lang} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Faq lang={lang === "En" ? "en" : "am"} /> 
            </ErrorBoundary>
            <ErrorBoundary>
                <GoogleMap lang={lang === "En" ? "en" : "am"} />
            </ErrorBoundary>
            <ErrorBoundary>
                <OnlineConsultation lang={lang === "En" ? "en" : "am"} />
            </ErrorBoundary>
            </div>
        </>
    );
}

export default HomePage;
