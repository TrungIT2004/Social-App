'use client'

import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const StoreContext = createContext<any>(null)

export default function StoreContextProvider({ children }: any) {
  const router = useRouter()
  const [userContext, setUserContext] = useState<any>({})

  useEffect( () => {
    const getNewUserContext = async () => {
      if (!userContext) {
        const res = await fetch('http://localhost:3000/v1/users/refresh', {
          method: "POST",
          credentials: 'include'
        })

        const newUserContext = await res.json()
        console.log(newUserContext)

        if (newUserContext?.accessToken) {
          setUserContext(newUserContext)
          router.push('/')
        } else {
          router.push('/login') 
        }
      }
      else if (userContext?.accessToken) {
        router.push('/')
      }
    }

    getNewUserContext()
  }, [])

    console.log('Context')
  // console.log(userContext)

  return (
    <StoreContext.Provider value={{ userContext, setUserContext }}>
        {children}       
    </StoreContext.Provider>
  )}