/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/app/constants";

const getRegister = `${API_BASE_URL}/api/auth/register`;

const fetcher = async (data: any) => {
  return axios.post(getRegister, data);
};

const useRegister = () => {
  return useMutation({
    mutationKey: [getRegister],
    mutationFn: fetcher,
    onError() {
      console.log("Failed");
    },
  });
};

export default useRegister;
