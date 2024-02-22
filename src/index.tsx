import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus : false, //default: true
      refetchOnMount : true, //default: true
      refetchOnReconnect : true, //default: true
      staleTime : 0, //default: 0
      cacheTime : 60 * 5 * 1000  //default: 5분 (60 * 5 * 1000)
    },
  },
})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
