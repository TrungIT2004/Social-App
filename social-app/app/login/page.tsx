import Link from "next/link"
import LoginForm from "@/components/LoginForm"
import Loading from "../loading/page"
import Footer from "@/components/footer"
import { cookies } from 'next/headers'
import { getUserContext } from "../getUserContext"
import { redirect } from "next/navigation"

export default async function Login() {
  const cookieStore = await cookies()
  const refreshToken: string = cookieStore.get('refreshToken')?.value || ''

  const userContext = await getUserContext(refreshToken)

  if (userContext?.accessToken) {
    redirect('/')
  } 

  console.log('Login')

  return (
    <>
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
    </>
  )
}