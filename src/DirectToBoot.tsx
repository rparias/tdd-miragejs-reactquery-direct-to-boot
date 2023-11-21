import { getMessage } from "./utils";
import { useFetchOrder } from "./useFetchOrder";

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
  const { status } = useFetchOrder(orderId)

  return (
    <div>
      <h2>Direct To Boot</h2>
      <p>{getMessage(status)}</p>
      {createButton(status)}
    </div>
  );
};
