/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "@/app/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCategory = `${API_BASE_URL}/api/product/getAllCategory`;

const fetcher = async (params?: any) => {
  const response = await axios.get(getCategory, params);
  return response.data;
};

const useGetCategory = (params?: any) => {
  return useQuery({
    queryKey: [getCategory, params],
    queryFn: () => fetcher(params),
    select: (data: any) => {
      return data?.result;
    },
  });
};

export default useGetCategory;
