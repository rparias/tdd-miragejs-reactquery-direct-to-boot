import './App.css';
import { DirectToBoot } from './DirectToBoot';
import { createMockServer } from './createMockServer';

createMockServer();

function App() {
  return (
    <div className="app">
      <DirectToBoot orderId='order-id' />
    </div>
  );
}

export default App;
