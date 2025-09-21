import { Post } from "@/types";
import { create } from "zustand";

interface PostStore {
  imageFile: File | null;
  post: Pick<Post, "title" | "location" | "tags"> | null;
  setPost: (post: Pick<Post, "title" | "location" | "tags">) => void;
  setImageFile: (imageFile: File | null) => void;
  imageUrl: string | null;
  setImageUrl: (imageUrl: string) => void;
}

const usePostStore = create<PostStore>((set) => ({
  imageFile: null,
  post: null,
  setPost: (post) => set({ post }),
  setImageFile: (imageFile) => set({ imageFile }),
  imageUrl: null,
  setImageUrl: (imageUrl) => set({ imageUrl }),
}));

export default usePostStore;