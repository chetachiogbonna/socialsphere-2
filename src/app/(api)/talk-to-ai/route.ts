import { talkToAI } from "@/actions/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { input, currentPage } = await req.json();
  const result = await talkToAI(input, currentPage);
  return NextResponse.json(result);
}