import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

async function run() {
  console.log("generating...");
  const { text, files } = await generateText({
    model: google("gemini-2.5-flash-image-preview"),
    providerOptions: {
      responseModalities: { modalities: ["TEXT", "IMAGE"] }
    },
    prompt: "Generate a photorealistic image of a tiny banana on a giant plate.",
  });

  console.log("Text output:", text);
  console.log("Generated image(s):", files);
}

export async function GET() {
  await run();
  return NextResponse.json({ message: "Hello, this is a GET response from the generate API." }, { status: 200 });
}