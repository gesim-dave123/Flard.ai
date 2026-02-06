import axiosInstance from "./axiosConfig.js";
// import { showToast } from "../components/toast/ShowToast";
import backendConnection from "./backendConnection.js";

// api/flashcards.js
export const generateFlashCards = async (file) => {
  try {
    console.log("Preparing FormData for:", file.name);
    
    // Create FormData object
    const formData = new FormData();
    // Use "file" as the key, matching upload.single("file") in your route
    formData.append("file", file);

    const response = await axiosInstance.post(
      `${backendConnection()}/api/users/uploadFile`, // Updated to match your route.js
      formData,
      {
        headers: { 
          "Content-Type": "multipart/form-data" // Axios actually sets this automatically with FormData
        },
        withCredentials: true,
      }
    );
    console.log("Successfully sent to the backend");

    if (response.status === 201 || response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Upload Error:", error.response?.data || error.message);
    return null;
  }
};