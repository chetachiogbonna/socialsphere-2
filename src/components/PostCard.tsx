"use client"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { Heart, MessageCircle, Bookmark } from "lucide-react"
import { Id } from "../../convex/_generated/dataModel"
import { convertToReadableDateString } from "@/lib/utils"

interface Post {
  _id: Id<"posts">
  _creationTime: number
  ownerId: Id<"users">
  title: string
  imageUrl: string
  imageId: string
  location: string
  tags: string[]
  likes: Id<"users">[]
  comments: {
    userId: Id<"users">
    text: string
    createdAt: number
  }[]
  saves: Id<"users">[]
  user?: {
    username: string
    profileImage: string
  }
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="bg-[#0a0a0a] text-white border border-neutral-800">
      <CardHeader className="flex flex-row items-center gap-3">
        {post.user?.profileImage && (
          <Image
            src={post.user.profileImage}
            alt={post.user.username}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold">{post.user?.username}</p>
          <p
            className="text-gray-600 text-xs"
          >
            {convertToReadableDateString(post._creationTime)}
            <span className="font-bold"> &bull; </span>
            {post.location}
          </p>
        </div>

      </CardHeader>
      <hr className="border-light w-[98%] mx-auto" />

      <div className="px-4 pb-2">
        <p className="text-sm">{post.title}</p>
      </div>

      <CardContent className="px-4">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={500}
          height={500}
          className="w-full h-auto object-cover rounded-2xl"
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-2 px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Heart className="w-6 h-6 cursor-pointer hover:text-red-500 transition" />
            <MessageCircle className="w-6 h-6 cursor-pointer hover:text-blue-400 transition" />
          </div>
          <Bookmark className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard;