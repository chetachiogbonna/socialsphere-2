import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Id } from "../../convex/_generated/dataModel"
import { Heart, MessageCircle, Bookmark } from "lucide-react"

interface Post {
  _id: Id<"posts">;
  _creationTime: number;
  ownerId: Id<"users">;
  title: string;
  imageUrl: string;
  imageId: string;
  location: string;
  tags: string[];
  likes: Id<"users">[];
  comments: {
    userId: Id<"users">;
    text: string;
    createdAt: number;
  }[];
  saves: Id<"users">[];
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="w-full max-w-lg bg-dark-2 border border-dark-4 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg font-semibold text-gray-100 truncate">
          {post.title}
        </CardTitle>
        <span className="text-xs text-gray-400">{new Date(post._creationTime).toLocaleDateString()}</span>
      </CardHeader>

      {/* Image */}
      <CardContent className="p-0">
        <div className="relative w-full h-80">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>

      {/* Tags */}
      <CardContent className="px-4 py-2 flex flex-wrap gap-2">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-dark-4 text-gray-300 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </CardContent>

      {/* Footer: Likes / Comments / Saves */}
      <CardFooter className="flex items-center justify-between px-4 py-3 border-t border-dark-4">
        <div className="flex items-center gap-4 text-gray-300">
          <button className="flex items-center gap-1 hover:text-pink-500 transition">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{post.likes.length}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-400 transition">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments.length}</span>
          </button>
        </div>
        <button className="hover:text-yellow-400 transition text-gray-300">
          <Bookmark className="w-5 h-5" />
        </button>
      </CardFooter>
    </Card>
  )
}

export default PostCard