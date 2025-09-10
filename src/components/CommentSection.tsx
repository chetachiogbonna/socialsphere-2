import { LucideSendHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Post } from "@/types";

function CommentSection({ post }: { post: Post }) {
  return (
    <form className="w-full flex gap-2 justify-center items-center">
      <div className="w-10 h-10 rounded-full">
        <Image
          width={40}
          height={40}
          className="rounded-full bg-gray-900"
          src={post.user?.profileImage!}
          alt="profile pic"
        />
      </div>
      <div className="flex items-center border-[1.5px] border-light w-[87%] rounded-md">
        <Input
          required
          className="h-8 bg-dark-5 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Leave a reply..."
          type="text"
        />
      </div>

      <button
        type="submit"
      >
        <LucideSendHorizontal
          color="#3C404B"
        />
      </button>
    </form >
  )
}

export default CommentSection;