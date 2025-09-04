import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Doctors from "./Doctors";
import Testimonials from "./Testimonials";
import Faq from "./Faqs";
import GoogleMap from "../../components/GoogleMap";
import OnlineConsultation from "../../components/OnlineConsultation";

function HomePage({ lang }) {
    return (
        <div className="w-full overflow-x-hidden">
            <Hero lang={lang} />
            <About lang={lang} />
            <Services lang={lang} />
            <Doctors lang={lang} />
            <Testimonials  lang={lang} />
             <Faq lang={lang === "En" ? "en" : "am"} /> 
             <GoogleMap lang={lang === "En" ? "en" : "am"} />
            <OnlineConsultation lang={lang === "En" ? "en" : "am"} />
        </div>
    );
}

export default HomePage;
