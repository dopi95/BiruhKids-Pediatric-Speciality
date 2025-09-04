export default function GoogleMap({ lang }) {
    const translations = {
        en: {
            findUs: "Find Us on the Map",
        },
        am: {
            findUs: "በካርታ ላይ ያግኙን",
        },
    };

    return (
        <section className="py-16 px-6 lg:px-20 text-center">
            <h2 className="text-2xl font-bold mb-6">
                {translations[lang]?.findUs || translations.en.findUs}
            </h2>
            <div className="w-full h-96 relative">
                <a
                    href="https://maps.app.goo.gl/JTYwvp7FoZiGTFid8?g_st=atm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label="Open in Google Maps"
                ></a>

                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.3220851553685!2d38.71731500118866!3d9.004851719423158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c434913883%3A0xf2ec78865f0cae3!2sBiruh%20Kids%20Pediatrics%20Speciality%20Clinic!5e0!3m2!1sen!2set!4v1756447113051!5m2!1sen!2set"
                    className="w-full h-full rounded-xl border-0 shadow-lg"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </section>
    );
}
