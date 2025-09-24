// components/OnlineConsultation.jsx
import { motion } from "framer-motion";
import { FaVideo, FaTelegramPlane, FaPhone } from "react-icons/fa";

export default function OnlineConsultation({ lang }) {
  const translations = {
    en: {
      title: "Online Consultation Available",
      paidNote: "⚠️ Paid Service",
      description: `Can’t visit us in person? We now offer video call consultations so you can connect with our doctors from the comfort of your home.`,
      highlight: "video call consultations",
      connect: "For more information and to know about payment details, connect with us",
      call: "Call Us",
      telegram: "Telegram",
    },
    am: {
      title: "ኦንላይን አገልግሎት እንሰጣለን",
      paidNote: "⚠️ በክፍያ የሚሰጥ አገልግሎት",
      description: `በቀጥታ መምጣት ካልቻሉ፣ ከቤትዎ በቀላሉ ከሐኪሞቻችን ጋር በቪዲዮ ጥሪ ሊገናኙ ይችላሉ።`,
      highlight: "ቪዲዮ ጥሪ ምክር",
      connect: "ለተጨማሪ መረጃ እና ስለ ክፍያ ዝርዝር ለማወቅ ከእኛ ጋር ይገናኙ",
      call: "ይደውሉልን",
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
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>

        {/* Paid Note */}
        <p className="inline-block bg-yellow-400 text-black text-sm font-semibold px-4 py-1 rounded-full mb-6">
          {t.paidNote}
        </p>

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
          {/* Call */}
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            href="tel:+251963555552"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all w-full sm:w-auto justify-center"
          >
            <FaPhone size={22} /> <span>{t.call}</span>
          </motion.a>

          {/* Telegram */}
          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            href="https://t.me/doctorfasil/"
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
