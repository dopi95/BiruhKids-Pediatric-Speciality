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
      question: "Where are you located?",
      answer:
        "Torhayloch Agusta Bridge Infront of Hibir Acadamy.",
    },
    {
      question: "What type of service do you offer?",
      answer:
        "we offer all service of Pediatric cares pls call 0939602927 or 0963555552",
    },
    {
      question: "Do you accept online booking?",
      answer:
        "Yes, Book directly on our website and we are accepting in person booking pls call 0939602927 or 0963555552 for further information. If you book online, wait for verification we’ll notify you by email once confirmed.",
    },
    {
      question: "What type of laboratory service do you offer?",
      answer:
        "- Complete Medical check up\n- CBC \n- Blood Group & Rh \n- CRP \n- Bilirubin \n- Serum Folate level \n- Serum Iron & Ferritin \n- Vitamin D level \n- Vitamin B12 level \n- Electrolyte Level \n- Testosterone & Estradiol level \n- Body fluid Analysis\n- Liver function test \n- Hepatitis B & C \n- Renal function test \n- Pediatric appetite assessment \n- Malaria test \n- Thyroid Function test \n- Lipid Profile \n- HbA1c & RBS \n- H. Pylori test \n- Stool Analysis \n- Stool occult \n- Urine Analysis \n- Widal Welflex \n- Bacteriology Test \n- Uric acid \n- Rheumatoid Factor (RF)\n- Urine HCG \n- Sputum AFB",
    },
  ];

  // Amharic FAQ
  const faqsAm = [
    {
      question: "የት ነው የሚገኙት?",
      answer:
        "ጦርሃይሎች አውጉስታ ድልድይ ከሕብር አካዳሚ ት/ቤት ፊትለፊት ያገኙናል።",
    },
    {
      question: "ምን አይነት አገልግሎቶች ይሰጣሉ?",
      answer:
        "ሁሉንም የህፃናት ህክምና አገልግሎቶችን እንሰጣለን ለበለጠ መረጃ ይደውሉ 0939602927 ወይም 0963555552",
    },
    {
      question: "ኦንላይን ቀጠሮ ማስያዝ ይቻላል?",
      answer:
        "አዎ በቀጥታ በድረ-ገጻችን ላይ በመመዝገብ ቀጠሮ ማስያዝ ይችላሉ እና በአካል በመቅረብ ወይም በመደወል ቀጠሮ ማስያዝ ይችላሉ ለበለጠ መረጃ 0939602927 ወይም 0963555552 ይደውሉ። ኦንላይን በድረ-ገጻችን ላይ ቀጠሮ ካስያዙ፣ ማረጋገጫ እስኪደርስ ይጠብቁ፣ አንዴ ከተረጋገጠ በኋላ በኢሜይል እናሳውቅዎታለን። ",
    },
    {
      question: "ምን ዓይነት የላቦራቶሪ አገልግሎት ይሰጣሉ?",
      answer:
        "- የአዋቂዎች እና ህፃናት ሙሉ የላቦራቶሪ ምርመራ\n- አጠቃላይ ነጭ እና ቀይ የደም ሴል ምርመራ\n- የደም አይነት ምርመራ\n- የኢንፌክሽን ምርመራ\n- የጨቅላ ህፃናት እና የህፃናት ቢጫነት ምርመራ\n- የፎሌት መጠን ምርመራ\n- የአይረን መጠን ምርመራ\n- ቪታሚን ዲ መጠን ምርመራ\n- ቪታሚን ቢ 12 መጠን ምርመራ\n- የደም ንጥረ ነገሮች መጠን ምርመራ\n- የሆርሞን ምርመራዎች\n- የጉበት ስራ ምርመራ\n- ሄፓታይቲስ የጉበት ቫይረስ ምርመራ\n- የኩላሊት ስራ ምርመራ\n- የህፃናት ምግብ ፍላጎት መቀነስ ምርመራ\n- የወባ ምርመራ\n- የታይሮይድ ሆርሞን ምርመራ\n- የኮሌስትሮል ምርመራ\n- የስኳር ምርመራ\n- ጨጓራ ባክቴርያ ምርመራ\n- የሰገራ ማይክሮስኮፕ ምርመራ\n- የአንጀት እና ጨጉዋራ መድማት ምርመራ\n- የሽንት ምርመራ\n- የታይፎይድ እና ታይፈስ ምርመራ\n- የባክቴርያ እና ፈንገስ ምርመራ\n- የርሂ ምርመራ\n- የእርግዝና ምርመራ\n- የቲቢ አክታ ምርመራ",
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
              ? "ተደጋጋሚ ጥያቄዎች"
              : "Frequently Asked Questions"}
          </h2>
          <p className="text-base md:text-xl text-gray-600">
            {lang === "am"
              ? "በተደጋጋሚ ለሚጠየቁ ጥያቄዎች መልሶችን ያግኙ።"
              : "Find answers to common questions."}
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-4 sm:p-6 flex justify-between items-center group"
              >
                <div className="flex items-start w-full">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {faq.question}
                  </span>
                </div>

                {/* Animated Chevron */}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-7">
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
