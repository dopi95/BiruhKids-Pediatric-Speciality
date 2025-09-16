import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Doctors from "./Doctors";
import Testimonials from "./Testimonials";
import Faq from "./Faqs";
import GoogleMap from "../../components/GoogleMap";
import OnlineConsultation from "../../components/OnlineConsultation";
import ErrorBoundary from "../../components/ErrorBoundary";

function HomePage({ lang }) {
    return (
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
    );
}

export default HomePage;
