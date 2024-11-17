'use client'

import { createContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loading from '../loading/page'

export const queryClient = new QueryClient()
export const StoreContext = createContext<any>(null);

export default function ReactQueryProvider({ children }: any) {
  const router = useRouter()
  const pathName = usePathname()
  const [userContext, setUserContext] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getNewUserContext = async () => {
      console.log('Context useEffect')
     
      const res = await fetch('http://localhost:3000/v1/users/refresh', {
        method: "POST",
        credentials: 'include'
      })

      const newUserContext = await res.json() 
      setIsLoading(false)

      if (!newUserContext?.accessToken && pathName === '/login') {
        return
      }

      if (!newUserContext?.accessToken && pathName === '/signup') {
        return 
      }

      if (!newUserContext?.accessToken) {
        router.push('/login')
        return 
      }

      if (newUserContext?.accessToken) {
        setUserContext(newUserContext)

        if (pathName === '/login') {
          router.push('/')
          return 
        } else {
          // router.push(pathName)
          return
        }
      } 
    }
    

    getNewUserContext()
  }, []) 
  
  console.log('Context')

  return (
    <>
      {isLoading ? <Loading /> :
        <QueryClientProvider client={queryClient}>
          <StoreContext.Provider value={{ userContext, setUserContext }}>
            {children}
          </StoreContext.Provider>
        </QueryClientProvider>
      }
    </>
  )
}