import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useFetchOrder = (orderId: string) => {
  const [status, setStatus] = useState<string>('initialized');

  useEffect(() => {
    axios.get(`/api/orders/${orderId}`)
      .then((response: AxiosResponse<any>) => {
        if (response.data.status === 'ready') {
          setStatus('ready');
        }
      })
      .catch(() => setStatus('error'));
  }, [orderId]);

  return { status };
};
