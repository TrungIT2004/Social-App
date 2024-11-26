'use client'

import * as React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Camera, Users, Smile, MapPin, Gift, MoreHorizontal, X, Globe, Lock, UserCircle2, Image as ImageIcon } from "lucide-react"
import DefaultProfilePicture from "./profilePicture"

export default function Component({userContext}: any) {
  // const { userContext } = React.useContext(StoreContext)
  const [privacy, setPrivacy] = React.useState("Chỉ mình tôi")
  const [images, setImages] = React.useState<File[]>([])
  const privacyRef = React.useRef<HTMLButtonElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    setImages(prevImages => [...prevImages, ...Array.from(files)])
  }

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const handleCreatePostMutation = useMutation({
      mutationFn: async (formData: any) => {
        const res = await fetch('http://localhost:3000/v1/posts', {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${userContext?.accessToken}`,
            'X-User-ID': `${userContext.userid}`
          },
          body: formData
        })

        const newPost = await res.json()
        return newPost
    },
    onSuccess: async (newPost: any) => {
      const postlist = queryClient.getQueryData(['posts'])
      // console.log(postlist)
      // queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.setQueryData(['posts'], (old: any) => [...old, newPost])
      }
    })

  const handleCreatePost = async () => {
    console.log(`Userid: ${userContext.userid}`)
    console.log(`Privacy: ${privacyRef?.current?.textContent}`)
    console.log(`Text: ${textareaRef?.current?.value}`)
    console.log(`Images: ${images}`)

    const data = {
      userid: userContext.userid,
      description: textareaRef?.current?.value,
      media: images
    }

    const description: any = textareaRef?.current?.value

    const formData = new FormData();
    formData.append('userid', userContext.userid);
    formData.append('description', description)

    // Append each image to the FormData object
    images.forEach(image => {
      formData.append('media', image, image.name); // Assuming 'image.name' is the filename
    });

    // const res = await fetch('http://localhost:3000/v1/posts', {
    //   method: "POST",
    //   headers: {
    //     'Authorization': `Bearer ${userContext?.accessToken}`,
    //     'X-User-ID': `${userContext.userid}`
    //   },
    //   body: formData
    // })

    handleCreatePostMutation.mutate(formData)

    // const newPost = await res.json()
    // console.log(newPost)

    // return newPost
  }

  return (
    <div className="w-full max-w-2xl mb-4 mx-auto bg-background/80 backdrop-blur-sm">
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-full max-w-xl rounded-lg bg-background p-4 shadow">
            <div className="flex gap-2">
              <div className="h-10 w-10 shrink-0">
                <DefaultProfilePicture />
              </div>
              <button className="w-full rounded-full bg-muted px-4 text-left text-sm text-muted-foreground hover:bg-accent">
                Mình ơi, bạn đang nghĩ gì thế?
              </button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="sm:text-center">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">Tạo bài viết</DialogTitle>
              {/* <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => document.querySelector('dialog')?.close()}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button> */}
            </div>
          </DialogHeader>
          <div className="flex items-center gap-2 pt-4">
            <div className="h-10 w-10 shrink-0">
              <DefaultProfilePicture />
            </div>
            <div>
              <div className="font-semibold">Minh Trung</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button ref={privacyRef} variant="outline" size="sm" className="h-6 text-xs">
                    {privacy}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPrivacy("Chỉ mình tôi")}>
                    <Lock className="mr-2 h-4 w-4" />
                    <span>Chỉ mình tôi</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPrivacy("Bạn bè")}>
                    <UserCircle2 className="mr-2 h-4 w-4" />
                    <span>Bạn bè</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPrivacy("Công khai")}>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Công khai</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Textarea
            className="min-h-[120px] resize-none border-0 p-0 text-lg focus-visible:ring-0"
            placeholder="Mình ơi, bạn đang nghĩ gì thế?"
            ref={textareaRef}
          />
          <div
            className="mt-4 rounded-lg border-2 border-dashed border-gray-300 p-4 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              multiple
              accept="image/*"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mx-auto"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Thêm ảnh
            </Button>
            <p className="mt-2 text-sm text-gray-500">hoặc kéo và thả ảnh vào đây</p>
          </div>
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="h-24 w-full rounded object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="rounded-lg border p-3">
            <div className="text-sm">Thêm vào bài viết của bạn</div>
            <div className="mt-2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <Camera className="h-5 w-5 text-green-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <Users className="h-5 w-5 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <Smile className="h-5 w-5 text-yellow-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <MapPin className="h-5 w-5 text-red-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <Gift className="h-5 w-5 text-teal-500" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button className="w-full" size="lg" onPointerDown={handleCreatePost} disabled={handleCreatePostMutation.isPending}>
            Đăng
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

