import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();
  },
})

export const createUser = mutation({
  args: {
    clerk_userId: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    username: v.string(),
    email: v.string(),
    profile_pic: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerk_userId: args.clerk_userId,
      first_name: args.first_name,
      last_name: args.last_name,
      username: args.username,
      email: args.email,
      profile_pic: args.profile_pic
    });
  },
});

export const deleteUser = mutation({
  args: {
    clerk_userId: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.query("users").withIndex("byClerkId", q => q.eq("clerk_userId", args.clerk_userId)).first().then(user => {
      if (!user) {
        throw new Error("User not found");
      }

      return ctx.db.delete(user._id);
    });
  },
});