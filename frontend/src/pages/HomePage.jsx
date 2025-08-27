import Hero from "Home/Hero";
import About from "Home/About";
import Services from "Home/Services";
import Doctors from "Home/Doctors";
import Testimonials from "Home/Testimonials";
import Faq from "Home/Faq";

function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <Doctors />
            <Testimonials />
            <Faq />
        </>
    );
}
export default HomePage;
