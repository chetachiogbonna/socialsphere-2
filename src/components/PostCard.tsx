import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Id } from "../../convex/_generated/dataModel";

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
    <Card className="w-full max-w-lg min-h-[500px] bg-dark-3 border-0">
      <CardHeader>
        <CardTitle>
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={400}
          height={300}
          className="rounded-md mb-4 w-full h-auto"
        />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {post.tags.map(tag => {
          return tag.split(" ").map((tg, index) => {
            return (
              <span key={index}>#{tg}</span>
            )
          })
        })}
      </CardFooter>
    </Card >
  )
}

export default PostCard