'use client'

// import { useContext, useEffect } from 'react'
// import { StoreContext } from '@/app/providers/ReactQueryProvider'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from 'next/navigation'

const schema = yup.object().shape({
  email: yup.string().email('Email must be a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
})
 

export default function LoginForm() {
  // const { userContext, setUserContext } = useContext(StoreContext)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const handleLoginMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('http://localhost:3000/v1/users/signin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })

      let userContext = await res.json()
      console.log(userContext)
      return userContext
    },
    onSettled: (data) => {
      console.log(data)
      // setUserContext(data)
      router.push('/')
    }
  })

  const handleLogin = (data: any) => {
    handleLoginMutation.mutate(data)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-4">
        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <Input 
            type="text" 
            placeholder="Email hoặc số điện thoại"
            className="h-12 text-base"
            {...register("email")}
          />
          <p className='text-red-600'>{errors.email?.message}</p>
                
          <Input 
            type="password" 
            placeholder="Mật khẩu"
            className="h-12 text-base"
            {...register("password")}
          />
          <p className='text-red-600'>{errors.password?.message}</p>
                
          <Button className="w-full bg-[#0866ff] hover:bg-[#0866ff]/90 h-12 text-[17px] font-bold">
            Đăng nhập
          </Button>
          

          <div className="text-center">
            <Link href="#" className="text-[#0866ff] text-sm hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
                
          <hr className="my-5" />
                
          <div className="flex justify-center">
            <Button className="bg-[#42b72a] hover:bg-[#42b72a]/90 h-12 px-4 text-[17px] font-bold">
              <Link href='/signup'>Tạo tài khoản mới</Link>
            </Button>
          </div>
        </form>
      </CardContent> 
    </Card>
    )
}