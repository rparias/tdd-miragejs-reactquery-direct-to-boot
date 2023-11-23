import './App.css';
import {DirectToBoot} from './DirectToBoot';
import {createMockServer} from './createMockServer';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

createMockServer();

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <DirectToBoot orderId='long-order'/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
