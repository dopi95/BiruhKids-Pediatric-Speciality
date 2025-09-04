
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import React from "react";

export default function MainLayout({ children }) {
    const [lang, setLang] = useState("En");

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
            <Header lang={lang} setLang={setLang} />
            <main>{enhancedChildren}</main>
            <Footer lang={lang === "En" ? "en" : "am"} />
            <Chatbot />
        </div>
    );
}

