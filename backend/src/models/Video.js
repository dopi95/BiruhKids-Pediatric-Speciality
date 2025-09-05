import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ["youtube", "tiktok"]
  },
  title: {
    type: String,
    required: function() {
      return this.platform === "youtube";
    }
  },
  description: {
    type: String,
    required: function() {
      return this.platform === "youtube";
    }
  },
  url: {
    type: String,
    required: true
  },
  titleAm: {
    type: String,
    required: function() {
      return this.platform === "youtube";
    }
  },
  descriptionAm: {
    type: String,
    required: function() {
      return this.platform === "youtube";
    }
  },
  videoId: {
    type: String // For TikTok video ID
  }
}, {
  timestamps: true
});

// Extract YouTube video ID from URL
videoSchema.pre("save", function(next) {
  if (this.platform === "youtube" && this.url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = this.url.match(regExp);
    if (match && match[2].length === 11) {
      this.url = `https://www.youtube.com/embed/${match[2]}`;
    }
  } else if (this.platform === "tiktok" && this.url) {
    // Extract TikTok video ID
    const regExp = /\/video\/(\d+)/;
    const match = this.url.match(regExp);
    if (match && match[1]) {
      this.videoId = match[1];
    }
  }
  next();
});

export default mongoose.model("Video", videoSchema);