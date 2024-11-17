// import {
//   Search,
//   Home,
//   Users,
//   PlaySquare,
//   Store,
//   Users2,
//   Bell,
//   Menu,
//   MessageCircle,
// } from "lucide-react"
// import Image from "next/image"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// export default function Component() {
//   return (
//     <div className="flex h-14 items-center justify-between px-4 border-b bg-background">
//       {/* Left section */}
//       <div className="flex items-center gap-2 min-w-[300px]">
//         <Button variant="ghost" size="icon" className="rounded-full">
//           <Image
//             src="/placeholder.svg?height=40&width=40"
//             alt="Facebook"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//         </Button>
//         <div className="relative">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Tìm kiếm trên Facebook"
//             className="w-[240px] pl-9 bg-muted"
//           />
//         </div>
//       </div>

//       {/* Center section - Navigation */}
//       <div className="flex items-center justify-center flex-1">
//         <div className="flex items-center">
//           <Button
//             variant="ghost"
//             size="lg"
//             className="h-14 px-10 border-b-2 border-primary"
//           >
//             <Home className="w-6 h-6 text-primary" />
//           </Button>
//           <Button variant="ghost" size="lg" className="h-14 px-10">
//             <Users className="w-6 h-6 text-muted-foreground" />
//           </Button>
//           <Button variant="ghost" size="lg" className="h-14 px-10">
//             <PlaySquare className="w-6 h-6 text-muted-foreground" />
//           </Button>
//           <Button variant="ghost" size="lg" className="h-14 px-10">
//             <Store className="w-6 h-6 text-muted-foreground" />
//           </Button>
//           <Button variant="ghost" size="lg" className="h-14 px-10">
//             <Users2 className="w-6 h-6 text-muted-foreground" />
//           </Button>
//         </div>
//       </div>

//       {/* Right section */}
//       <div className="flex items-center gap-2 min-w-[300px] justify-end">
//         <Button
//           variant="secondary"
//           size="icon"
//           className="rounded-full bg-muted w-10 h-10"
//         >
//           <Menu className="w-5 h-5" />
//         </Button>
//         <Button
//           variant="secondary"
//           size="icon"
//           className="rounded-full bg-muted w-10 h-10"
//         >
//           <MessageCircle className="w-5 h-5" />
//         </Button>
//         <Button
//           variant="secondary"
//           size="icon"
//           className="rounded-full bg-muted w-10 h-10"
//         >
//           <Bell className="w-5 h-5" />
//         </Button>
//         <Button
//           variant="secondary"
//           size="icon"
//           className="rounded-full bg-muted w-10 h-10 p-0"
//         >
//           <Image
//             src="/placeholder.svg?height=40&width=40"
//             alt="Profile"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//         </Button>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from "react"
import {
  Search,
  Home,
  Users,
  PlaySquare,
  Store,
  Users2,
  Bell,
  Menu,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [activeTab, setActiveTab] = useState("home")
  return (
    <div className="flex h-14 items-center justify-between px-4 border-b bg-background">
      {/* Left section */}
      <div className="flex items-center gap-2 min-w-[300px]">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Image
            src="/placeholder.svg?height=40&width=40"
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
            className={`h-14 px-10 ${activeTab === "home" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <Home className={`w-6 h-6 ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10 ${activeTab === "friends" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("friends")}
          >
            <Users className={`w-6 h-6 ${activeTab === "friends" ? "text-primary" : "text-muted-foreground"}`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10 ${activeTab === "video" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("video")}
          >
            <PlaySquare className={`w-6 h-6 ${activeTab === "video" ? "text-primary" : "text-muted-foreground"}`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10 ${activeTab === "marketplace" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("marketplace")}
          >
            <Store className={`w-6 h-6 ${activeTab === "marketplace" ? "text-primary" : "text-muted-foreground"}`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`h-14 px-10 ${activeTab === "groups" ? "border-b-2 border-primary" : ""}`}
            onClick={() => setActiveTab("groups")}
          >
            <Users2 className={`w-6 h-6 ${activeTab === "groups" ? "text-primary" : "text-muted-foreground"}`} />
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
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-muted w-10 h-10 p-0"
        >
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Button>
      </div>
    </div>
  )
}