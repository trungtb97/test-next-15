/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/app/constants";

const getLogin = `${API_BASE_URL}/api/auth/login`;

const fetcher = async (data: any) => {
  return axios.post(getLogin, data);
};

const useLogin = () => {
  return useMutation({
    mutationKey: [getLogin],
    mutationFn: fetcher,
    onError() {
      console.log("Failed");
    },
  });
};

export default useLogin;
