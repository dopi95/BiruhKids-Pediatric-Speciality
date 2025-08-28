import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function Faqs() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What are your operating hours?",
            answer: "We are open 24/7 for emergency services. Regular consultations are available Monday to Friday, 8:00 AM to 6:00 PM.",
        },
        {
            question: "Do you accept insurance?",
            answer: "Yes, we accept most major insurance plans. Please contact us to verify your coverage.",
        },
        {
            question: "How can I book an appointment?",
            answer: "You can book an appointment online through our website, call us directly, or visit our clinic in person.",
        },
        {
            question: "Do you provide emergency services?",
            answer: "Yes, we provide 24/7 emergency services with fully equipped emergency department and experienced staff.",
        },
    ];

    return (
        <article className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600">
                        Find answers to common questions about our services and
                        procedures.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg"
                        >
                            {/* Question row */}
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full text-left p-6 flex justify-between items-center"
                            >
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                    <span className="text-lg font-semibold text-gray-900">
                                        {faq.question}
                                    </span>
                                </div>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-600" />
                                )}
                            </button>

                            {/* Answer */}
                            {openIndex === index && (
                                <div className="px-6 pb-6">
                                    <p className="text-gray-600 leading-relaxed pl-7">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}
