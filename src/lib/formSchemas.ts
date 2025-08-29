import z from "zod";

export const postSchema = z.object({
  title: z.string().min(5).max(2000),
  location: z.string().min(5),
  tags: z.array(z.string()).min(1).max(5),
})