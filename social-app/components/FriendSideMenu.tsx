import { Users, UserPlus, UserCheck } from "lucide-react"
import Link from "next/link"
import { headers } from 'next/headers'


const FriendSideMenu = async () => {  
  const headerList = await headers()
  const pathName = headerList.get('X-Current-Path')

  console.log(pathName)

  return (
    <div className="w-64 min-h-screen bg-white border-r border-neutral-200 p-4">
      <div className="text-xl font-semibold mb-6 pl-2 text-neutral-900">Bạn bè</div>
        <nav>
          <Link
            href='/friends/requests'
            className={`flex items-center gap-3 px-2 py-3 rounded-lg transition-colors ${
            pathName === '/friends/requests'
            ? "bg-neutral-300 text-neutral-900"
              : "text-neutral-600 hover:bg-neutral-50"}`}>
          
            <UserPlus className="w-5 h-5" />
            <span>Lời mời kết bạn</span>
          
          </Link>
        
          <Link
            href='/friends/list'
            className={`flex items-center gap-3 px-2 py-3 rounded-lg transition-colors ${
            pathName === '/friends/list'
            ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-600 hover:bg-neutral-50"}`}>
          
            <Users className="w-5 h-5" />
            <span>Bạn bè</span>
          
          </Link>
        
          <Link
            href='/friends/send'
            className={`flex items-center gap-3 px-2 py-3 rounded-lg transition-colors ${
            pathName === '/friends/send'
            ? "bg-neutral-100 text-neutral-900"
              : "text-neutral-600 hover:bg-neutral-50"}`}>
          
            <UserCheck className="w-5 h-5" />
            <span>Lời mời đã gửi</span>
          
          </Link>
      </nav>
    </div>
  )
}

export default FriendSideMenu