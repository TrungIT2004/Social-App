'use client'

import { useState, useContext } from "react"
import {Search, Home, Users, PlaySquare, Store, Users2, Bell, Menu, MessageCircle } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DefaultProfilePicture from "./profilePicture"
import { redirect } from "next/navigation"

export default function MainMenu({userContext}: any) {
  // const [activeTab,  setActiveTab] = useState("home")
  // const { userContext } = useContext(StoreContext)

  return (
    <div className="flex h-14 mb-4 items-center justify-between px-4 border-b bg-background">
      {/* Left section */}
      <div className="flex items-center gap-2 min-w-[300px]">
        <Button variant="ghost" size="icon" className="rounded-full" onPointerDown={ () => redirect('/') }>
          <Image
            src="/facebook-logo.webp"
            alt="Facebook"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Button>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm trên Facebook"
            className="w-[240px] pl-9 bg-muted"
          />
        </div>
      </div>

      {/* Center section - Navigation */}
      <div className="flex items-center justify-center flex-1">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10`}
            onClick={() => redirect('/')}
          >
            <Home className={`w-6 h-6`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10`}
            onClick={() => redirect('/friends/requests')}
          >
            <Users className={`w-6 h-6`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10`}
            onClick={() => redirect('/')}
          >
            <PlaySquare className={`w-6 h-6`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10`}
            onClick={() => 1}
          >
            <Store className={`w-6 h-6`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10`}
            onClick={() => 1}
          >
            <Users2 className={`w-6 h-6`} />
          </Button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 min-w-[300px] justify-end">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-muted w-10 h-10"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-muted w-10 h-10"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-muted w-10 h-10"
        >
          <Bell className="w-5 h-5" />
        </Button>
        
          {/* <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          {!userContext?.profilepic ? <DefaultProfilePicture /> :
            <Image
              src={userContext?.profilepic}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          }

      </div>
    </div>
  )
}