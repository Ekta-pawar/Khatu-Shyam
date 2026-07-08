import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const getGalleryItems = (type) => {
  return axios.get(`${API_BASE}/gallery`, {
    params: type ? { type } : undefined,
  });
};
