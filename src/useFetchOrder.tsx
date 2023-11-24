import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

function fetchOrders(orderId: string) {
  return axios.get(`/api/orders/${orderId}`)
    .then((response: AxiosResponse<any>) => {
      if (response.data.status === 'ready') {
        return response.data
      } else {
        throw new Error('fetch error')
      }
    })
    .catch((e) => { console.error(e.message) });
}

export const useFetchOrder = (orderId: string) => {
  const [status, setStatus] = useState<string>('initialized');

  // queries
  const query = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetchOrders(orderId),
    retry: 10,
    refetchOnWindowFocus: false
  });
  const {status: queryStatus, error, data, isSuccess} = query;
  
  useEffect(() => {
    if (error) {
      setStatus('error')
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setStatus('ready')
    }
  }, [isSuccess]);

  return { status };
};
