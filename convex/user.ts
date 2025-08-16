import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    clerk_userId: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    username: v.string(),
    email: v.string(),
    created_at: v.number()
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("users", {
      clerk_userId: args.clerk_userId,
      first_name: args.first_name,
      last_name: args.last_name,
      username: args.username,
      email: args.email,
      created_at: args.created_at
    });
    // do something with `taskId`
  },
});