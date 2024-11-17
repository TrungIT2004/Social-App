import { Search, MoreVertical } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DefaultProfilePicture from "@/components/profilePicture"

export default function Component() {
  const sponsors = [
    {
      image: "/placeholder.svg?height=100&width=100",
      title: "💻 Laptop Dell - Mua Trả Chậm 0% Lãi Suất",
      url: "thegioididong.com"
    },
    {
      image: "/placeholder.svg?height=100&width=100",
      title: "Bánh Hóa An Nhiên",
      url: "bachhoaannhien.com"
    }
  ]

  const contacts = [
    { name: "Son Da Le", online: false },
    { name: "Pham Phú", online: true },
    { name: "Hieu Le", online: true },
    { name: "Huynh Minh Thuan", online: true },
    { name: "Phung Tuấn", online: true },
    { name: "Nguyễn Minh Phúc", online: true },
    { name: "Bảo Ngân", online: true },
    { name: "Ha Hoàng", online: true },
    { name: "An Phan", online: true },
    { name: "Vũ Quỳnh Trang", online: true }
  ]

  return (
    <div className="w-full max-w-xs bg-background text-foreground p-4 flex flex-col gap-6">
      <div className="space-y-4">
        <h2 className="text-sm font-medium">Được tài trợ</h2>
        <div className="grid gap-4">
          {sponsors.map((sponsor, index) => (
            <Card key={index} className="p-2 flex gap-3">
              <Image
                src={sponsor.image}
                alt={sponsor.title}
                width={100}
                height={100}
                className="rounded-lg w-[100px] h-[100px] object-cover"
              />
              <div className="flex flex-col justify-between py-1">
                <p className="text-sm font-medium leading-tight">{sponsor.title}</p>
                <p className="text-xs text-muted-foreground">{sponsor.url}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Người liên hệ</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-1">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
            >
              <div className="relative">
                <DefaultProfilePicture />
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <span className="text-sm">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}