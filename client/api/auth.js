import axiosInstance from "./axiosConfig.js";
// import { showToast } from "../components/toast/ShowToast";
import backendConnection from "./backendConnection.js";

export const login = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${backendConnection()}/api/users/login`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );

    if (response.status === 200) {
    //   showToast(response.data.message, "success");
      return {
        success: response.data.success,
        // token: response.data.token,
        role: response.data.role,
      };
    }
  } catch (error) {
    if (error.response) {
        console.error("Login error response:", error.response);
    //   showToast(error.response.data.message || "Login failed", "error");
    } else if (error.request) {
        console.error("Login error request:", error.request);
    //   showToast("No response from server", "error");
    } else {
        console.error("Login error:", error.message);
    //   showToast("An unexpected error occurred", "error");
    }
    return null;
  }
};
