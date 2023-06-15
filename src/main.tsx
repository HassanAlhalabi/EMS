import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App'
import ErrorBoundary from './components/error-boundries';
import { AuthProvider } from './contexts/auth-context'
import { LayoutContextProvider } from './contexts/layout-context';
import { LocalizeProvider } from './contexts/localize-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LayoutContextProvider>
        <LocalizeProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </AuthProvider>
        </LocalizeProvider>
      </LayoutContextProvider>
    </ErrorBoundary>  
  </React.StrictMode>
)