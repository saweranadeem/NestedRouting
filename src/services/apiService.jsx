import axios from "axios";

const BASEURL = "https://api.myswitchin.com/api";

// Get token from localStorage (or sessionStorage)
const token = localStorage.getItem("authToken"); // Ensure the token is stored during login

export const getApi = async (endpoint) => {
  try {
    const res = await axios.get(`${BASEURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Attach token
        // "Content-Type": "application/json",
      },
    });
    return res.data; // ✅ Return API data
  } catch (error) {
    console.error("Error in fetching data:", error.response?.data || error);
    throw error; // ✅ Handle errors properly
  }
};
export const createApi = async (endpoint, data) => {
  try {
    const res = await axios.post(`${BASEURL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in fetching API", error);
    // throw new Error("Error occurred while creating promotion.");
  }
};
export const updateApi = async (endpoint, data) => {
  try {
    const res = await axios.post(`${BASEURL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in fetching API", error);
    // throw new Error("Error occurred while creating promotion.");
  }
};


export const deleteApi = async (endpoint) => {
  try {
    const res = await axios.delete(`${BASEURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error in deleting API", error);
    throw new Error("Error occurred while deleting the promotion.");
  }
};
