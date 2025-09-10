"use client";

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import PostCard from '@/components/PostCard';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { useEffect } from 'react';

async function run() {
  console.log("generating...");
  const { text, files } = await generateText({
    apiKey: "AIzaSyDpx_CfMOzXCeBvFnsBLkZy7KxLPCFa25k",
    model: google("gemini-2.5-flash-image-preview",),
    providerOptions: {
      responseModalities: { modalities: ["TEXT", "IMAGE"] }
    },
    prompt: "Generate a photorealistic image of a tiny banana on a giant plate.",
  });

  console.log("Text output:", text);
  console.log("Generated image(s):", files);
}

export default function Home() {
  const posts = useQuery(api.post.getAllPosts)

  useEffect(() => {
    run();
  }, []);

  return (
    <section className="flex justify-center items-center pb-20">
      <div className="flex flex-col gap-10 w-[500px]">
        {posts?.map(post => <PostCard key={post._id} post={post} />)}
      </div>
    </section>
  );
}
