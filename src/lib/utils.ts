import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const uploadImage = async (url: string, imageFile: File) => {
  try {
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": imageFile.type },
      body: imageFile,
    });

    const { storageId } = await result.json() as { storageId: string };

    return storageId;
  } catch (error) {
    throw error
  }
}