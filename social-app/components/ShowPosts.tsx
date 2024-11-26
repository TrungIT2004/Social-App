'use client'
import { useState, useRef } from 'react'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { ProfileBadge } from './ProfileBadge'

export default function ShowPosts({ userContext }: any) {
  const queryClient = useQueryClient()
  const textInputRef = useRef<any>(null)
  const filesInputRef = useRef<any>(null)
  const [comments, setComments] = useState([
    { id: 1, author: 'Jane Doe', content: 'Great post! Thanks for sharing.' },
    { id: 2, author: 'John Smith', content: 'I couldn\'t agree more. Well said!' }
  ])
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/v1/posts', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userContext?.accessToken}`,
          'X-User-ID': userContext?.userid
        }
      })
      const newPosts = await res.json()
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      return newPosts
    }
  })
  const createReactionMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('http://localhost:3000/v1/post-reactions', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${userContext?.accessToken}`,
          "X-User-ID": userContext?.userid
        },
        body: JSON.stringify(data)
      })
      const reaction = await res.json()
      console.log('Set React')
      return reaction
    },
    onMutate: (data: any) => {
      const postQueryData: any = queryClient.getQueryData(['posts'])
      const updatedPosts = postQueryData.map((post: any) => {
        if (post.postid === data.postid) {
          return {...post, userhasliked: true, reaction_count: Number(post.reaction_count)+1}
        }
        return post
      })
      console.log(updatedPosts)
      queryClient.setQueryData(['posts'], updatedPosts)
    }, 
    onSettled: (reaction: any) => {
      const postQueryData: any = queryClient.getQueryData(['posts'])
      const updatedPosts = postQueryData.map((post: any) => {
        if (post.postid === reaction.postid) {
          return {...post, userhasliked: reaction.postreactionid, reaction_count: Number(post.reaction_count)}
        }
        return post
      })
      console.log(updatedPosts)
      queryClient.setQueryData(['posts'], updatedPosts)
    }
  })
  const deleteReactionMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`http://localhost:3000/v1/post-reactions/${data?.postreactionid}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${userContext?.accessToken}`,
            "X-User-ID": userContext?.userid
          },
          body: JSON.stringify({ ownerid: data?.ownerid})
        }
      )
      const deletedReaction = await res.json()
      return deletedReaction
    },
    onMutate: (data: any) => {
      console.log(data)
      const postQueryData: any = queryClient.getQueryData(['posts'])
      const updatedPosts = postQueryData.map((post: any) => {
        if (post.userhasliked === data.postreactionid) {
          return {...post, userhasliked: false, reaction_count: Number(post.reaction_count)-1}
        }
        return post
      })
      console.log(updatedPosts)
      queryClient.setQueryData(['posts'], updatedPosts)
    }
  })
  const handleCreateReaction = (userid: string, postid: string, reaction: string) => {
    createReactionMutation.mutate({userid, postid, reaction})
  }
  const handleDeleteReaction = (postid: string, postreactionid: string, ownerid: string) => {
    deleteReactionMutation.mutate({postreactionid, ownerid})
  }
  const timeAgo = (date: Date) => {
    return moment(date).fromNow()
  }
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log(textInputRef?.current?.value)
    const text = textInputRef?.current?.value
    const files = filesInputRef?.current?.files
    console.log(text, files)
    
  }
  console.log('Home Page')
  return (
    <div className='w-[50%]'>
        {postQuery.data?.map((post: any) => {
        return (
          <Card className="w-full max-w-2xl mx-auto" key={post.postid}>
            <CardHeader className="flex flex-row items-center gap-4">
              <ProfileBadge 
                imageUrl={post.profilepic} 
                name={post.username}
                userid={post.userid}
                status="online"
                userContext={userContext}
                mutualFriends={[]}
              />
              <div>
                <h2 className="text-lg font-semibold">{post.username}</h2>
                <p className="text-sm text-gray-500">{timeAgo(post.created_at)}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                {post.description}
              </p>
              
              {post.media[0] &&
                <div className="relative w-full h-64">
                  <Image
                    src={post.media[0]}
                    alt="Post media"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              }
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div className="flex items-center justify-between w-full text-gray-500">
                <span>
                  {Number(post.reaction_count)} Likes
                </span>
                <span>{post.comment_count} comments</span>
              </div>
              <div className="flex items-center justify-between w-full border-y border-gray-200 py-2">
                <Button variant="ghost" className="flex-1" onClick={() => post.userhasliked ? handleDeleteReaction(post.postid, post.userhasliked, 'b9ce88c5-ae71-401b-9a2a-b485a3a4a8a8') : handleCreateReaction('b9ce88c5-ae71-401b-9a2a-b485a3a4a8a8', post.postid, 'Like')}>
                  <Heart className={`mr-2 h-4 w-4 ${post.userhasliked ? 'fill-red-500 text-red-500' : ''}`} />
                  Like
                </Button>
                <Button variant="ghost" className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Comment
                </Button>
                <Button variant="ghost" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              <div className="w-full space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-100 rounded-lg p-2">
                      <p className="font-semibold">{comment.author}</p>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleComment} className="flex w-full gap-2">
                <ProfileBadge 
                  imageUrl={post?.profilepic || "/placeholder.svg"}
                  name={post?.username || "User"}
                  userid={post?.userid}
                  userContext={userContext}
                  status="online"
                />
                <div className="flex flex-col w-full gap-2 border border-black-900 rounded-full p-2">
                  <Input
                    ref={textInputRef}
                    placeholder="Write a comment..."
                    className="flex-1 border-none outline-none"
                  />
                  <Input ref={filesInputRef} type="file" name='media' />
                </div>
                <Button type="submit">Post</Button>
              </form>
            </CardFooter>
          </Card>
        )
        })}
      </div>
  )
}