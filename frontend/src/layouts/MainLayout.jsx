import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export default function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
            <Chatbot />
        </div>
    );
}
