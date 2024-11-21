'use client'

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { UserPlus, X } from "lucide-react"

export function FriendRequestCardFooter({ userContext, requestid, senderid }: any) {
  const router = useRouter()

  const acceptFriendRequestMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:3000/v1/friends/accept-request', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${userContext?.accessToken}`,
          'X-User-ID': userContext?.userid,
        },
        body: JSON.stringify({requestid, senderid, receiverid: userContext.userid })
      })

      return await res.json()
    },
    onSettled: () => {
      router.refresh()
    }
  })

  const deleteFriendRequestMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/v1/friends/${requestid}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${userContext?.accessToken}`,
          'X-User-ID': userContext?.userid
        },
        body: JSON.stringify({senderid: userContext?.userid})
      })

      const deletedFriendRequest= await res.json()
      return deletedFriendRequest
    },
    onSettled: () => {
      router.refresh()
    }
  }) 

  return (
    <div className="flex flex-col gap-2 mt-auto">
      <button onPointerDown={ () => { acceptFriendRequestMutation.mutate() } } className="w-full px-4 py-2 rounded-md bg-[#2374E1] hover:bg-[#1B64C9] text-white transition-colors duration-200 flex items-center justify-center">
        <UserPlus className="h-4 w-4 mr-2" />
          Chấp nhận
      </button>
        
      <button onPointerDown={ () => { deleteFriendRequestMutation.mutate() } } className="w-full px-4 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300 text-gray-700 transition-colors duration-200 flex items-center justify-center">
        <X className="h-4 w-4 mr-2" />
        Hủy
      </button>
    </div>
  )
}