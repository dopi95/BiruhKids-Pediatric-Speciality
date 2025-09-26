import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const videoApi = axios.create({
  baseURL: `${API_BASE_URL}/videos`,
});

// Add request interceptor to include auth token
videoApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
videoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getAllVideos = () => videoApi.get("/");
export const getVideosByPlatform = (platform) => videoApi.get(`/platform/${platform}`);
export const getVideo = (id) => videoApi.get(`/${id}`);
export const createVideo = (videoData) => videoApi.post("/", videoData);
export const updateVideo = (id, videoData) => videoApi.put(`/${id}`, videoData);
export const deleteVideo = (id) => videoApi.delete(`/${id}`);

export default videoApi;