'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Reaction {
  emoji: string
  label: string
  color: string
}

export default function Component() {
  const [showReactions, setShowReactions] = useState(false)
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null)

  const reactions: Reaction[] = [
    { emoji: "👍", label: "Thích", color: "text-[#2374E1]" },
    { emoji: "❤️", label: "Yêu thích", color: "text-[#F33E58]" },
    { emoji: "😆", label: "Haha", color: "text-[#F7B125]" },
    { emoji: "🥰", label: "Thương thương", color: "text-[#F7B125]" },
    { emoji: "😮", label: "Wow", color: "text-[#F7B125]" },
    { emoji: "😢", label: "Buồn", color: "text-[#F7B125]" },
    { emoji: "😠", label: "Phẫn nộ", color: "text-[#E9710F]" },
  ]

  return (
    <div className="relative inline-block">
      <Popover open={showReactions} onOpenChange={setShowReactions}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex-1 text-gray-400 hover:text-white hover:bg-transparent gap-2",
              selectedReaction && selectedReaction.color
            )}
            onMouseEnter={() => setShowReactions(true)}
          >
            {selectedReaction ? (
              <span className="text-xl">{selectedReaction.emoji}</span>
            ) : (
              <ThumbsUp className="h-5 w-5" />
            )}
            {selectedReaction ? selectedReaction.label : "Thích"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-fit p-2 bg-[#242526] border-none shadow-xl"
          onMouseLeave={() => setShowReactions(false)}
          sideOffset={5}
        >
          <div className="flex gap-1">
            {reactions.map((reaction) => (
              <button
                key={reaction.label}
                className="group relative p-2 hover:-translate-y-2 transition-all duration-200"
                onClick={() => {
                  setSelectedReaction(reaction)
                  setShowReactions(false)
                }}
              >
                <span className="text-2xl transform transition-transform group-hover:scale-125">
                  {reaction.emoji}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 px-2 py-1 bg-black rounded text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {reaction.label}
                </span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}