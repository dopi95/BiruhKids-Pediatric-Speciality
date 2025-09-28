
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { useLanguage } from "../context/LanguageContext";
import React from "react";

export default function MainLayout({ children }) {
    const { language: lang, changeLanguage: setLang } = useLanguage();

    const enhancedChildren = Array.isArray(children)
        ? children.map((child) =>
              React.isValidElement(child)
                  ? React.cloneElement(child, { lang, setLang })
                  : child
          )
        : React.isValidElement(children)
        ? React.cloneElement(children, { lang, setLang })
        : children;

    return (
        <div>
            <Header />
            <main>{enhancedChildren}</main>
            <Footer lang={lang === "En" ? "en" : "am"} />
            <Chatbot />
        </div>
    );
}

