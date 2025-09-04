import { useState } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Faqs({ lang }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // English FAQ
  const faqsEn = [
    {
      question: "What are your operating hours?",
      answer:
        "We are open 24/7 for emergency services. Regular consultations are available Monday to Friday, 8:00 AM to 6:00 PM.",
    },
    {
      question: "Do you accept insurance?",
      answer:
        "Yes, we accept most major insurance plans. Please contact us to verify your coverage.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment online through our website, call us directly, or visit our clinic in person.",
    },
    {
      question: "Do you provide emergency services?",
      answer:
        "Yes, we provide 24/7 emergency services with fully equipped emergency department and experienced staff.",
    },
  ];

  // Amharic FAQ
  const faqsAm = [
    {
      question: "የስራ ሰዓቶቻችሁ ምንድን ናቸው?",
      answer:
        "ለአስቸኳይ አገልግሎቶች በ24/7 ክፍት ነን። መደበኛ ምክር ከሰኞ እስከ አርብ ከ2፡00 ጠዋት እስከ 12፡00 ከሰዓት ይሰጣል።",
    },
    {
      question: "ኢንሹራንስ ታቀበላችሁ?",
      answer:
        "አዎን፣ ብዙ ዋና ዋና የኢንሹራንስ እቅዶችን እንቀበላለን። ለማረጋገጥ እባክዎን ያግኙን።",
    },
    {
      question: "ቀጠሮ እንዴት ማዘዝ እችላለሁ?",
      answer:
        "በድር ጣቢያችን በመጠቀም በመስመር ላይ፣ በቀጥታ በመደወል ወይም በቀጥታ በክሊኒካችን በመጎብኘት ቀጠሮ ማዘዝ ይችላሉ።",
    },
    {
      question: "አስቸኳይ አገልግሎት ትሰጡ ነበር?",
      answer:
        "አዎን፣ በበቂ መሳሪያ የተዘጋጀ የአስቸኳይ ክፍል እና ተሞክሮ ያላቸው ሰራተኞች ጋር 24/7 አስቸኳይ አገልግሎቶችን እንሰጣለን።",
    },
  ];

  const faqs = lang === "am" ? faqsAm : faqsEn;

  return (
    <article className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {lang === "am"
              ? "ተደጋጋሚ የሚጠየቁ ጥያቄዎች"
              : "Frequently Asked Questions"}
          </h2>
          <p className="text-xl text-gray-600">
            {lang === "am"
              ? "ስለ አገልግሎቶቻችን እና ሂደቶቻችን የተደጋጋሚ ጥያቄዎችን ያግኙ።"
              : "Find answers to common questions about our services and procedures."}
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 flex justify-between items-center group"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                </div>

                {/* Animated Chevron */}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </motion.div>
              </button>

              {/* Animated Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed pl-7">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
