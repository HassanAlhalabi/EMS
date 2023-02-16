import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryFunction } from 'react-query';
import { QueryClientProvider } from 'react-query'
import App from './App'
import { AuthProvider } from './contexts/auth-context'
import { baseURL, get } from './http';


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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)