import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

function getMessage(status: string) {
  return status === 'ready' ? 'Please click the button when you have arrived. One of our friendly staff will bring your order to you.' : 'We are preparing your order...';
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
  }, [orderId])

  return (
    <div>
      <h2>Direct To Boot</h2>
      <p>{getMessage(status)}</p>
      <button disabled={status !== 'ready'}>I'm here</button>
    </div>
  );
};
