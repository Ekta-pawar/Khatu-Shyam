import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const createEnquiry = (data) => {
  return axios.post(`${API_BASE}/enquiry/create`, data);
};

export const createSponsor = (data) => {
  return axios.post(`${API_BASE}/sponsor/create`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getSponsors = () => {
  return axios.get(`${API_BASE}/sponsor`);
};
