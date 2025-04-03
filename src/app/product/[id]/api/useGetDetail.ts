import { API_BASE_URL } from "@/app/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getDetail = (id: string) => `${API_BASE_URL}/api/product/${id}`;

const fetcher = (id: string) => axios.get(getDetail(id));

const useGetDetail = (id: string) => {
  return useQuery({
    queryKey: [getDetail(id), id],
    queryFn: () => fetcher(id),
    select: (data) => {
      return data?.data?.result;
    },
  });
};

export default useGetDetail;
