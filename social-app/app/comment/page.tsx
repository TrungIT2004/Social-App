'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MoreHorizontal,
  SmilePlus,
  ThumbsUp,
  MessageCircle,
  Share2,
  ChevronDown,
  Star
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  edited?: boolean
  reactions?: string[]
  replies?: Comment[]
}

export default function Component() {
  const [sortBy, setSortBy] = useState("relevant")

  const comments: Comment[] = [
    {
      id: "1",
      author: "Duy Đức",
      content: "Vô bệnh viện từ trẻ con đến thú cưng đều khỏe khi đến công 😅🤣",
      timestamp: "1 tuần",
      likes: 266,
      reactions: ["👍", "😆"],
      replies: [
        {
          id: "2",
          author: "Phan Tú",
          content: "Hứa Nguyễn đến nơi là khỏe ngay, tui cx từng y v chủ yếu là sợ chích với ghét hỏi nhiều quá",
          timestamp: "3 ngày",
          likes: 3,
          reactions: ["😆"],
          edited: true
        },
        {
          id: "3",
          author: "Nam Phương",
          content: "Duy Đức hứ đang to nè, vào lum ngay kẻo trễ https://s.net.vn/6Gtm",
          timestamp: "3 ngày",
          likes: 0
        }
      ]
    },
    {
      id: "4",
      author: "Kiếp Phong Trần",
      content: "Hình như mấy con cún này nó biết đọc chữ hay sao ấy😅 lần chở nó đi tới trước tiệm thú y là nó có thái độ kỳ muốn vào.con chớ đi đâu nó cũng đi hết.😭",
      timestamp: "6 ngày",
      likes: 56,
      reactions: ["👍", "😆"]
    },
    {
      id: "5",
      author: "Yến Nhi",
      content: "Mấy ông bá như chị t vậy à chời :))",
      timestamp: "1 tuần",
      likes: 50,
      reactions: ["😆", "👍"],
      edited: true
    },
    {
      id: "6",
      author: "Lucas Long Otis",
      content: "Đang bệnh đặt tới đây tự nhiên hết bệnh luôn :))",
      timestamp: "1 tuần",
      likes: 48,
      reactions: ["😆", "👍"]
    },
    {
      id: "7",
      author: "红妆",
      content: "Tình trạng chung từ người đến thú cưng 😅.. cún nhà tui cũng thế gần đến cổng thú y là thui, nhảy xe chạy ko cần biết chủ ở đâu luôn",
      timestamp: "6 ngày",
      likes: 24,
      reactions: ["😆", "👍"]
    },
    {
      id: "8",
      author: "Trần Thị Hồng Hạnh",
      content: "Mèo nhà em cũng vậy, vừa thấy xe là nhảy lên giường nằm im thin thít, ko chịu ra 😂",
      timestamp: "5 ngày",
      likes: 15,
      reactions: ["😆"]
    },
    {
      id: "9",
      author: "Nguyễn Thị Thanh Thảo",
      content: "Mèo nhà mình thì khác, cứ đến giờ là tự động chui vào lồng, ngoan lắm 😊",
      timestamp: "4 ngày",
      likes: 10,
      reactions: ["👍", "❤️"]
    },
    {
      id: "10",
      author: "Lê Văn Tùng",
      content: "Chó mèo nhà mình thì lại thích đi bác sĩ, có khi còn đòi đi 😂",
      timestamp: "3 ngày",
      likes: 8,
      reactions: ["😮", "😆"]
    },
    {
      id: "11",
      author: "Phạm Thị Hương",
      content: "Mình cũng vậy, cứ đến gần phòng khám là tim đập thình thịch 😅",
      timestamp: "2 ngày",
      likes: 20,
      reactions: ["👍", "😆"]
    },
    {
      id: "12",
      author: "Trần Văn Nam",
      content: "Bác sĩ thú y giỏi quá, vừa nhìn thấy là hết bệnh luôn 😂",
      timestamp: "1 ngày",
      likes: 30,
      reactions: ["😆", "👍"]
    },
    {
      id: "13",
      author: "Nguyễn Thị Lan",
      content: "Mèo nhà mình thông minh lắm, biết trốn dưới gầm giường khi nghe tiếng xe 😹",
      timestamp: "12 giờ",
      likes: 5,
      reactions: ["😆"]
    },
    {
      id: "14",
      author: "Đặng Văn Quang",
      content: "Chó mèo còn sợ bác sĩ, huống chi là người 😅",
      timestamp: "6 giờ",
      likes: 2,
      reactions: ["👍"]
    }
  ]

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex gap-2 ${isReply ? 'ml-12' : ''}`}>
      <Avatar className="h-8 w-8 shrink-0">
        <Image
          src="/placeholder.svg?height=32&width=32"
          alt={`${comment.author}'s avatar`}
          width={32}
          height={32}
        />
      </Avatar>
      <div className="flex-1">
        <div className="bg-[#3A3B3C] rounded-2xl px-3 py-2">
          <div className="font-semibold">{comment.author}</div>
          <div className="text-sm whitespace-pre-wrap">
            {comment.content}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span>{comment.timestamp}</span>
          <span className="hover:underline cursor-pointer">Thích</span>
          <span className="hover:underline cursor-pointer">Phản hồi</span>
          {comment.edited && <span>Đã chỉnh sửa</span>}
          {comment.likes > 0 && (
            <span className="flex items-center">
              <span className="flex -space-x-1">
                {comment.reactions?.map((reaction, index) => (
                  <span
                    key={index}
                    className="inline-block w-4 h-4 bg-[#2374E1] rounded-full text-white flex items-center justify-center text-[10px]"
                  >
                    {reaction}
                  </span>
                ))}
              </span>
              <span className="ml-1">{comment.likes}</span>
            </span>
          )}
        </div>
        {comment.replies?.map((reply) => (
          <CommentComponent key={reply.id} comment={reply} isReply />
        ))}
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 shrink-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <div className="max-w-[500px] bg-[#242526] text-white p-4 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-700 pb-2">
        <Button
          variant="ghost"
          className="text-sm text-gray-400 hover:text-white"
          onClick={() => setSortBy("relevant")}
        >
          <span>Phù hợp nhất</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2 items-center">
        <Avatar className="h-8 w-8 shrink-0">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="Your avatar"
            width={32}
            height={32}
          />
        </Avatar>
        <div className="flex-1 flex items-center bg-[#3A3B3C] rounded-full px-3 py-1.5">
          <input
            type="text"
            placeholder="Viết bình luận..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="text-gray-400 h-8 w-8 shrink-0">
              <SmilePlus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}