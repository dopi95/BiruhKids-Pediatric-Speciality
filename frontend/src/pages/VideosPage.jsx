import React, { useState, useEffect } from "react";

const VideosPage = () => {
  const [platform, setPlatform] = useState("youtube");

  // Repeat YouTube video 3 times
  const youtubeVideos = Array(3).fill({
    id: Math.random(),
    title: "Health Tips Video",
    description: "Educational health content for your wellness journey.",
    // autoplay=0 ensures video does NOT start automatically, mute=0 ensures sound is on
    url: "https://www.youtube.com/embed/lz5jpt_k7nA?autoplay=0&mute=0",
  });

  // Repeat TikTok video 3 times
  const tiktokVideos = Array(3).fill({
    id: Math.random(),
    url: "https://www.tiktok.com/@biruhkids/video/7402191353947393286",
    idOnly: "7402191353947393286",
  });

  const videos = platform === "youtube" ? youtubeVideos : tiktokVideos;

  // Load TikTok embed script whenever platform changes to TikTok
  useEffect(() => {
    if (platform === "tiktok") {
      const existingScript = document.getElementById("tiktok-embed-script");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.id = "tiktok-embed-script";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [platform]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Intro Section */}
      <div className="bg-[#007799] text-white text-center py-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Health Videos</h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto">
          Educational health content, expert advice, and inspiring patient stories
          to help you on your wellness journey.
        </p>
      </div>

      {/* Platform Toggle (Switch Style, Left Side) */}
      <div className="flex justify-start mt-8 px-4">
        <div className="flex border rounded-full overflow-hidden shadow bg-white">
          <button
            onClick={() => setPlatform("youtube")}
            className={`px-6 py-2 font-semibold transition ${
              platform === "youtube"
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            YouTube
          </button>
          <button
            onClick={() => setPlatform("tiktok")}
            className={`px-6 py-2 font-semibold transition ${
              platform === "tiktok"
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            TikTok
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div
        className={`grid gap-6 px-4 sm:px-8 mt-10 flex-grow ${
          platform === "youtube"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        }`}
      >
        {videos.map((video, index) => (
          <div
            key={index}
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
                  src={video.url} // autoplay=0, mute=0
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <blockquote class="tiktok-embed" cite="${video.url}" data-video-id="${video.idOnly}" style="max-width: 320px; min-width: 250px; margin: auto;">
                        <section></section>
                      </blockquote>
                    `,
                  }}
                />
              )}
            </div>
            {platform === "youtube" && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-700 text-sm">{video.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stay Updated Section */}
      <div className="bg-[#FF7A1A] text-white text-center py-16 px-4 mt-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Stay Updated with Our Latest Content
        </h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8">
          Subscribe to our channels to get the latest health tips, medical updates, and wellness content delivered directly to you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://www.youtube.com/@ብሩህkids"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
          >
            YouTube Channel
          </a>
          <a
            href="https://www.tiktok.com/@biruhkids?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition"
          >
            TikTok Channel
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
