// components/OnlineConsultation.jsx
import { motion } from "framer-motion";
import { FaVideo, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

export default function OnlineConsultation({ lang }) {
  const translations = {
    en: {
      title: "Online Consultation Available",
      description: `Can’t visit us in person? We now offer video call consultations so you can connect with our doctors from the comfort of your home.`,
      highlight: "video call consultations",
      connect: "For More Information Connect with us on",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
    },
    am: {
      title: "በመስመር ላይ ምክር ይገኛል",
      description: `በቀጥታ መምጣት ካልቻሉ፣ ከቤትዎ በቀላሉ ከሐኪሞቻችን ጋር በቪዲዮ ጥሪ ሊገናኙ ይችላሉ።`,
      highlight: "ቪዲዮ ጥሪ ምክር",
      connect: "ለተጨማሪ መረጃ ከእኛ ጋር ይገናኙ በ",
      whatsapp: "ዋትሳፕ",
      telegram: "ቴሌግራም",
    },
  };

  const t = translations[lang] || translations.en;

  return (
    <section className="bg-gradient-to-r from-[#007799] to-[#00aabb] text-white text-center py-12 px-6 lg:px-20 rounded-2xl shadow-lg mx-4 lg:mx-20 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FaVideo size={40} className="text-white" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-4">{t.title}</h2>

        {/* Description */}
        <p className="text-lg mb-8">
          {t.description.replace(t.highlight, "")}
          <span className="font-semibold"> {t.highlight}</span>
        </p>

        {/* Connect With Us */}
        <h3 className="text-xl font-semibold mb-6">{t.connect}</h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* WhatsApp */}
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all w-full sm:w-auto justify-center"
          >
            <FaWhatsapp size={22} /> <span>{t.whatsapp}</span>
          </motion.a>

          {/* Telegram */}
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            href="https://t.me/@doctorfasil/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transition-all w-full sm:w-auto justify-center"
          >
            <FaTelegramPlane size={22} /> <span>{t.telegram}</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
