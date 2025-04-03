/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "@/app/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAuthor = `${API_BASE_URL}/api/product/getAllAuthor`;

const fetcher = async (params?: any) => {
  const response = await axios.get(getAuthor, params);
  return response.data;
};

const useGetAuthor = (params?: any) => {
  return useQuery({
    queryKey: [getAuthor, params],
    queryFn: () => fetcher(params),
    select: (data: any) => {
      return data?.result;
    },
  });
};

export default useGetAuthor;
