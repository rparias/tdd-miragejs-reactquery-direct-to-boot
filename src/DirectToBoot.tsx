import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getMessage } from "./utils";

const createButton = (status: string) => {
  switch(status) {
    case 'initialized':
      return <button disabled>I'm here</button>
    case 'ready':
      return <button>I'm here</button>
    case 'error':
      return <button>04 23 33</button>
  }
}

export const DirectToBoot = ({ orderId }: { orderId: string; }) => {
  const [status, setStatus] = useState<string>('initialized')

  useEffect(() => {
    axios.get(`/api/orders/${orderId}`)
      .then((response: AxiosResponse<any>) => {
        if(response.data.status === 'ready') {
          setStatus('ready')
        }
      })
      .catch(() => setStatus('error'))
  }, [orderId])

  return (
    <div>
      <h2>Direct To Boot</h2>
      <p>{getMessage(status)}</p>
      {createButton(status)}
    </div>
  );
};
