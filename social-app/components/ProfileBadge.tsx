'use client'

import { useMutation, useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DefaultProfilePicture from "./profilePicture"

interface ProfileBadgeProps {
  imageUrl?: string
  name?: string
  userid: string
  userContext: any
  mutualFriends?: string[]
  status?: "online" | "offline"
}

export const ProfileBadge = ({ imageUrl='', name='', userid, userContext, mutualFriends = [], status = "offline" }: ProfileBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const {data, isLoading} = useQuery({
    queryKey: [`friend-requests/${userid}`],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/v1/friends/check-req', {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${userContext?.accessToken}`,
          'X-User-ID': userContext?.userid,
          'X-User2-ID': userid
        },
      })

      return await res.json()
    }
  })

  console.log(data)

  const sendFriendRequestMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:3000/v1/friends/send-request', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${userContext?.accessToken}`,
          'X-User-ID': userContext?.userid
        },
        body: JSON.stringify({
          senderid: userContext?.userid,
          receiverid: userid,
          status: "pending"
        })
      })

      return await res.json()
    }
  })
    
  return (
    <div className="relative inline-block z-50 group">
      <div className="relative">
        <Avatar className="h-12 w-12 border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-105">
          <AvatarImage src={imageUrl} alt={name} />
          {!imageUrl && <DefaultProfilePicture />}
        </Avatar>
        {status === "online" && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        )}
      </div>

      {/* Invisible area to maintain hover */}
      <div 
        className="absolute -inset-4 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      {isHovered && (
        <div 
          className="absolute left-0 top-[calc(100%-5px)] z-50 animate-fade-in"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-72 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={imageUrl} alt={name} />
                {!imageUrl && <DefaultProfilePicture />}
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900">{name}</h3>
                {mutualFriends.length >= 0 && (
                  <p className="text-sm text-gray-500">
                    {mutualFriends.length} mutual friends including{" "}
                    {mutualFriends[0]}
                    {mutualFriends.length > 1 ? " and others" : ""}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onPointerDown={ () => sendFriendRequestMutation.mutate() } className="flex-1 rounded-md bg-[#0866FF] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#0756D3]">
                {!data 
  ? 'Kết bạn' 
  : (data.status === 'accepted' 
    ? 'Bạn bè' 
    : (data.status === 'pending' && data.senderid === userContext?.userid 
      ? 'Đã gửi lời mời' 
      : (data.status === 'pending' && data.receiverid === userContext?.userid 
        ? 'Phản hồi' 
        : '')))}

              </button>
              <button className="flex-1 rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200">
                Nhắn tin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}