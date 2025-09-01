import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Doctors from "./Doctors";
import Testimonials from "./Testimonials";
import Faq from "./Faqs";
import GoogleMap from "../../components/GoogleMap";

function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <Doctors />
            <Testimonials />
            <Faq />
            <GoogleMap />
        </>
    );
}
export default HomePage;
