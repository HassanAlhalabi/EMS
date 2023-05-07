import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryFunction, QueryClientProvider } from 'react-query';
import * as Sentry from "@sentry/react";

import App from './App'
import ErrorBoundary from './components/error-boundries';
import { AuthProvider } from './contexts/auth-context'
import { LayoutContextProvider } from './contexts/layout-context';
import { LocalizeProvider } from './contexts/localize-context';
import { baseURL, get } from './http';

// Sentry.init({
//   dsn: "https://085c43920ef34114ac1d2eb5899452c6@o4505124861247488.ingest.sentry.io/4505124864000000",
//   integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

// Default Query Function
const defaultQueryFn:  QueryFunction = async ({ queryKey }) => {
  const { data } = await get(
    `${baseURL}${queryKey[0]}`,
  )
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10,
      refetchOnWindowFocus: false,
      retry: 0,
      queryFn: defaultQueryFn
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