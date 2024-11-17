'use client'

import {
  Users,
  Bookmark,
  Clock,
  Users2,
  PlaySquare,
  Store,
  Newspaper,
  Calendar,
  ChevronDown,
  ChevronUp,
  Coins,
  Gamepad2,
  PenLine,
  Monitor,
  MessageCircle,
  Gift,
  Flag,
  BarChart3,
  Leaf,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  const [isExpanded, setIsExpanded] = useState(false)

  const mainMenuItems = [
    { icon: Users, label: "Bạn bè", suffix: "(13 người online)", color: "text-blue-500" },
    { icon: Bookmark, label: "Đã lưu", color: "text-purple-500" },
    { icon: Clock, label: "Kỷ niệm", color: "text-blue-500" },
    { icon: Users2, label: "Nhóm", color: "text-blue-500" },
    { icon: PlaySquare, label: "Video", color: "text-blue-500" },
    { icon: Store, label: "Marketplace", color: "text-blue-500" },
    { icon: Newspaper, label: "Bảng feed", color: "text-blue-500" },
    { icon: Calendar, label: "Sự kiện", color: "text-red-500" },
  ]

  const expandedMenuItems = [
    { icon: Coins, label: "Chiến dịch gây quỹ", color: "text-yellow-500" },
    { icon: Gamepad2, label: "Chơi game", color: "text-blue-500" },
    { icon: PenLine, label: "Đơn đặt hàng và thanh toán", color: "text-blue-500" },
    { icon: Monitor, label: "Hoạt động gần đây với quảng cáo", color: "text-blue-500" },
    { icon: MessageCircle, label: "Messenger", color: "text-blue-500" },
    { icon: MessageCircle, label: "Messenger Kids", color: "text-blue-500" },
    { icon: PlaySquare, label: "Reels", color: "text-pink-500" },
    { icon: Gift, label: "Sinh nhật", color: "text-red-500" },
    { icon: Flag, label: "Trang", color: "text-orange-500" },
    { icon: BarChart3, label: "Trình quản lý quảng cáo", color: "text-blue-500" },
    { icon: Leaf, label: "Trung tâm khoa học khí hậu", color: "text-green-500" },
    { icon: PlaySquare, label: "Video chơi game", color: "text-blue-500" },
  ]

  const shortcuts = [
    {
      image: "/placeholder.svg?height=40&width=40",
      label: "IUH - Đại học Công nghiệp TP. Hồ Chí Minh",
    },
    {
      image: "/placeholder.svg?height=40&width=40",
      label: "Magic Swap Puzzle",
    },
  ]

  const footerLinks = [
    "Quyền riêng tư",
    "Điều khoản",
    "Quảng cáo",
    "Lựa chọn quảng cáo",
    "Cookie",
    "Xem thêm",
    "Meta © 2024",
  ]

  console.log('Side Menu')

  return (
    <div className="w-[360px] bg-background text-foreground p-2 flex flex-col gap-1">
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 h-14 px-2"
      >
        <Image
          src="/placeholder.svg?height=36&width=36"
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full"
        />
        <span className="font-semibold">Minh Trung</span>
      </Button>

      {mainMenuItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          className="w-full justify-start gap-3 h-11 px-2"
        >
          <item.icon className={`w-6 h-6 ${item.color}`} />
          <span>{item.label}</span>
          {item.suffix && (
            <span className="text-muted-foreground text-sm ml-1">
              {item.suffix}
            </span>
          )}
        </Button>
      ))}

      {isExpanded && expandedMenuItems.map((item, index) => (
        <Button
          key={`expanded-${index}`}
          variant="ghost"
          className="w-full justify-start gap-3 h-11 px-2"
        >
          <item.icon className={`w-6 h-6 ${item.color}`} />
          <span>{item.label}</span>
        </Button>
      ))}

      <Button
        variant="ghost"
        className="w-full justify-start gap-3 h-11 px-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
        <span>{isExpanded ? "Ẩn bớt" : "Xem thêm"}</span>
      </Button>

      <Separator className="my-2" />

      <div className="space-y-1">
        <h2 className="font-semibold px-2 py-1">Lối tắt của bạn</h2>
        {shortcuts.map((shortcut, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start gap-3 h-11 px-2"
          >
            <Image
              src={shortcut.image}
              alt={shortcut.label}
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-sm">{shortcut.label}</span>
          </Button>
        ))}
      </div>

      <div className="mt-auto px-2 py-4">
        <p className="text-xs text-muted-foreground flex flex-wrap gap-x-2">
          {footerLinks.map((link, index) => (
            <span key={index} className="hover:underline cursor-pointer">
              {link}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}