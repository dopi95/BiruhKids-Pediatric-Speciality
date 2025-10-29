import React, { useState, useEffect } from "react";
import { FaYoutube, FaTiktok } from "react-icons/fa";
import { getVideosByPlatform } from "../services/videoApi";
import { SEOHead } from '../components/SEO';
import { useSEO } from '../hooks/useSEO';
import { trackPageView, trackVideoInteraction } from '../utils/analytics';

const VideosPage = ({ lang = "En" }) => {
  const currentLang = lang === 'Am' ? 'am' : 'en';
  
  useSEO('videos', {}, currentLang);
  
  useEffect(() => {
    trackPageView(window.location.href, document.title);
  }, []);
  
  const translations = {
    En: {
      pageTitle: "Health Videos",
      pageSubtitle:
        "Educational health content, expert advice, and inspiring patient stories to help you on your wellness journey.",
      youtube: "YouTube",
      tiktok: "TikTok",
      stayUpdated: "Stay Updated with Our Latest Content",
      stayUpdatedDesc:
        "Subscribe to our channels to get the latest health tips, medical updates, and wellness content delivered directly to you.",
      youtubeChannel: "YouTube Channel",
      tiktokChannel: "TikTok Channel",
      noVideos: "No videos available at the moment. Please check back later.",
    },
    Am: {
      pageTitle: "የጤና ቪዲዮዎች",
      pageSubtitle:
        "በጤና ጉዞዎ ላይ እርስዎን ለማገዝ ትምህርታዊ የጤና ይዘት፣ የባለሙያ ምክር እና አነቃቂ የታካሚ ታሪኮች",
      youtube: "ዩቱብ",
      tiktok: "ቲክቶክ",
      stayUpdated: "ከአዳዲስ ይዘቶቻችን ጋር ይቆዩ",
      stayUpdatedDesc:
        "የጤና ምክሮች፣ የሕክምና ዝማኔዎች እና የጤና ይዘቶችን በቀጥታ ለማግኘት ቻናሎቻችንን ሰብስክራይብ ያድርጉ።",
      youtubeChannel: "ዩቱብ ቻናል",
      tiktokChannel: "ቲክቶክ ቻናል",
      noVideos: "በአሁኑ ጊዜ ምንም ቪዲዮዎች የሉም። እባክዎ ቆይተው ይመለሱ።",
    },
  };

  const t = translations[lang] || translations.En;

  const [platform, setPlatform] = useState("youtube");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVideos();
  }, [platform]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await getVideosByPlatform(platform);
      
      if (response.data && response.data.success) {
        setVideos(response.data.data);
        setError("");
      } else {
        setError(t.noVideos);
        setVideos([]);
      }
    } catch (err) {
      setError(t.noVideos);
      setVideos([]);
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (platform === "tiktok" && videos.length > 0) {
      const existingScript = document.getElementById("tiktok-embed-script");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.id = "tiktok-embed-script";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [platform, videos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={currentLang === 'am' ? 'የጤና ምክሮች እና ትምህርት | ብሩህኪድስ የህፃናት ክሊኒክ' : 'Health Videos & Education | BiruhKids Pediatric Clinic'}
        description={currentLang === 'am' ? 'በጤና ጉዞዎ ላይ እርስዎን ለማገዝ ትምህርታዊ የጤና ይዞት፣ የባለሙያ ምክር እና አነቃቂ የታካሚ ታሪኮች። የህፃናት ጤና ምክሮች፣ የህክምና ዝማኔዎች እና የጤና ይዞቶች።' : 'Educational health videos, expert pediatric advice, and wellness content from BiruhKids. Watch our YouTube and TikTok channels for children health tips, medical updates, and health education.'}
        keywords={currentLang === 'am' ? 'የጤና ምክሮች, የህፃናት ጤና ትምህርት, ብሩህኪድስ ምክሮች, የህፃናት ህክምና ምክሮች, የጤና ትምህርት' : 'health videos, pediatric education, BiruhKids videos, children health videos, medical education, YouTube health, TikTok health'}
        lang={currentLang}
      />
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Intro Section */}
      <div className="bg-blue-500 text-white text-center py-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {t.pageTitle}
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto">
          {t.pageSubtitle}
        </p>
      </div>

      {/* Platform Toggle */}
      <div className="flex justify-start mt-8 px-4">
        <div className="flex border rounded-full overflow-hidden shadow bg-white">
          <button
            onClick={() => setPlatform("youtube")}
            className={`px-6 py-2 font-semibold flex items-center gap-2 transition ${
              platform === "youtube"
                ? "bg-red-600 text-white"
                : "text-red-600 hover:bg-gray-200"
            }`}
          >
            <FaYoutube
              className={`w-5 h-5 ${
                platform === "youtube" ? "text-white" : "text-red-600"
              }`}
            />
            {t.youtube}
          </button>
          <button
            onClick={() => setPlatform("tiktok")}
            className={`px-6 py-2 font-semibold flex items-center gap-2 transition ${
              platform === "tiktok"
                ? "bg-black text-white"
                : "text-black hover:bg-gray-200"
            }`}
          >
            <FaTiktok
              className={`w-5 h-5 ${
                platform === "tiktok" ? "text-white" : "text-black"
              }`}
            />
            {t.tiktok}
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      {videos.length > 0 ? (
        <div
          className={`grid gap-6 px-4 sm:px-8 mt-10 flex-grow ${
            platform === "youtube"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {videos.map((video) => (
            <div
              key={video._id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl ${
                platform === "tiktok" ? "flex justify-center" : ""
              }`}
            >
              <div
                className={`w-full ${
                  platform === "youtube" ? "h-56 sm:h-64" : "max-w-[320px] mx-auto"
                }`}
              >
                {platform === "youtube" ? (
                  <iframe
                    className="w-full h-full"
                    src={video.url}
                    title={lang === "Am" ? video.titleAm : video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => trackVideoInteraction(video.title, 'view', currentLang)}
                  ></iframe>
                ) : (
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: `
                        <blockquote class="tiktok-embed" cite="${video.url}" data-video-id="${video.videoId}" style="max-width: 320px; min-width: 250px; margin: auto;">
                          <section></section>
                        </blockquote>
                      `,
                    }}
                  />
                )}
              </div>
              {platform === "youtube" && (
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {lang === "Am" ? video.titleAm : video.title}
                  </h2>
                  <p className="text-gray-700 text-sm">
                    {lang === "Am" ? video.descriptionAm : video.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaYoutube className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t.noVideos}
            </h3>
          </div>
        </div>
      )}

      {/* Stay Updated Section */}
      <div className="bg-[#FF7A1A] text-white text-center py-16 px-4 mt-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.stayUpdated}</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8">
          {t.stayUpdatedDesc}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://www.youtube.com/@ብሩህkids"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition flex items-center gap-2 justify-center"
          >
            <FaYoutube className="w-5 h-5 text-white" />
            {t.youtubeChannel}
          </a>
          <a
            href="https://www.tiktok.com/@biruhkids?_t=ZM-8zHeQeJllLk&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition flex items-center gap-2 justify-center"
          >
            <FaTiktok className="w-5 h-5 text-white" />
            {t.tiktokChannel}
          </a>
        </div>
      </div>
      </div>
    </>
  );
};

export default VideosPage;