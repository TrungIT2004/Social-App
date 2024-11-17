'use client'

import Link from "next/link"
import LoginForm from "@/components/LoginForm"
import { useContext } from "react"
import { StoreContext } from "../providers/ReactQueryProvider"
import Loading from "../loading/page"
import Footer from "@/components/footer"

export default function Login() {
  const { userContext } = useContext(StoreContext)

  console.log('Login')

  return (
    <>
      {userContext?.accessToken ? <Loading/> :
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <div className="flex-grow p-4">
            <div className="mx-auto max-w-[396px] space-y-6 pt-[92px]">
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-[#0866ff] text-[40px] font-bold leading-tight">facebook</h1>
                <p className="text-center text-lg text-gray-700">
                  Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                </p>
              </div>

              <LoginForm />

              <div className="text-center text-sm">
                <Link href="#" className="font-bold hover:underline">
                  Tạo Trang
                </Link>
                {' '}dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
              </div>
            </div>
          </div>

          <Footer />
        </div>
      }
    </>
  )
}