import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextprovider } from './context/userContext';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <UserContextprovider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UserContextprovider>
  </BrowserRouter>,
);
