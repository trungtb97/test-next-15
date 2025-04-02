/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "@/app/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getProduct = `${API_BASE_URL}/api/product`;

const fetcher = async (params?: any) => {
  const response = await axios.get(getProduct, params);
  return response.data;
};

const useGetProduct = (params?: any) => {
  return useQuery({
    queryKey: [getProduct, params],
    queryFn: () => fetcher(params),
    select: (data: any) => {
      return data;
    },
  });
};

export default useGetProduct;
