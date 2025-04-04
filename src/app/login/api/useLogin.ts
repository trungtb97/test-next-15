/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/app/constants";

// API endpoint
const getLogin = `${API_BASE_URL}/api/auth/login`;

// Fetcher function to call API
const fetcher = async (data: any) => {
  const response = await axios.post(getLogin, data);
  return response.data; // Trả về kết quả của API
};

const useLogin = () => {
  return useMutation({
    mutationKey: [getLogin],
    mutationFn: fetcher,
    onError: (error: any) => {
      console.log("Login Error:", error.message || "Unknown error");
    },
    onSuccess: (data) => {
      if (data?.message === "Login successful") {
        console.log("Login Success:", data);
      } else if (data?.message === "UserName or Password doesn't exactly") {
        console.log("Login Failed: Invalid username or password");
      }
    },
  });
};

export default useLogin;
