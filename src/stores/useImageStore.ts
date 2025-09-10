import { create } from "zustand";

interface ImageStore {
  imageFile: File | null;
  setImageFile: (imageFile: File | null) => void;
  imageUrl: string | null;
  setImageUrl: (imageUrl: string) => void;
}

const useImageStore = create<ImageStore>((set) => ({
  imageFile: null,
  setImageFile: (imageFile) => set({ imageFile }),
  imageUrl: null,
  setImageUrl: (imageUrl) => set({ imageUrl }),
}));

export default useImageStore;