import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Doctors from "./Doctors";
import Testimonials from "./Testimonials";
import Faq from "./Faqs";
import GoogleMap from "../../components/GoogleMap";
import OnlineConsultation from "../../components/OnlineConsultation";

function HomePage() {
    return (
        <div className="w-full overflow-x-hidden">
            <Hero />
            <About />
            <Services />
            <Doctors />
            <Testimonials />
            <Faq />
            <GoogleMap />
            <OnlineConsultation />

        </div>
    );
}

export default HomePage;
