'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function ReactQueryProvider({ children }: any) {  
  console.log('Context')

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  )
}