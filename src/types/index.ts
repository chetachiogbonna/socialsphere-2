import { Id } from "../../convex/_generated/dataModel"

export interface User {
  _id: Id<"users">;
  _creationTime: number;
  clerk_userId: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_pic: string;
}

export interface Post {
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
  user: {
    username: string
    profileImage: string
    clerkId: string
  }
}