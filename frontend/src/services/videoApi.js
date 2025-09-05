import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const videoApi = axios.create({
  baseURL: `${API_BASE_URL}/videos`,
});

export const getAllVideos = () => videoApi.get("/");
export const getVideosByPlatform = (platform) => videoApi.get(`/platform/${platform}`);
export const getVideo = (id) => videoApi.get(`/${id}`);
export const createVideo = (videoData) => videoApi.post("/", videoData);
export const updateVideo = (id, videoData) => videoApi.put(`/${id}`, videoData);
export const deleteVideo = (id) => videoApi.delete(`/${id}`);

export default videoApi;