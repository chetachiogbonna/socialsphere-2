import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    ownerId: v.id("users"),
    title: v.string(),
    imageUrl: v.string(),
    imageId: v.string(),
    location: v.string(),
    tags: v.array(v.string())
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("posts", {
      ownerId: args.ownerId,
      title: args.title,
      imageUrl: args.imageUrl,
      imageId: args.imageId,
      tags: args.tags,
      location: args.location,
      likes: [],
      comments: [],
      saves: []
    });
  },
});

export const getAllPosts = query({
  handler: async (ctx) => {
    return await ctx.db.query("posts").collect();
  },
})