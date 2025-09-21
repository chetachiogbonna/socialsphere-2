"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import usePostStore from "@/stores/usePostStore";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AIResponse, Post } from "@/types";
import { Id } from "../../convex/_generated/dataModel";
import useCurrentUserStore from "@/stores/useCurrentUserStore";
import { toast } from "sonner";

// Module-level variables - shared across all hook instances
let isGloballyProcessing = false;
let lastGlobalTranscript = "";
let currentProcessingPromise: Promise<any> | null = null;

export function useAIAction() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<AIResponse | null>(null);
  const [aiResponse, setAiResponse] = useState("");

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const { currentUser } = useCurrentUserStore();
  const { setPost } = usePostStore();

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  const toggleLikeMutation = useMutation(api.post.toggleLike);
  const toggleSaveMutation = useMutation(api.post.toggleSave);
  const handleComment = useMutation(api.post.comment);

  const processAI = useCallback(
    async (textInput: string): Promise<AIResponse> => {
      if (!textInput) {
        speak("Please provide an input!");
        return { action: "unsupported", message: "ok", response: "Please provide an input!" };
      }

      const res = await fetch("/talk-to-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: textInput, currentPage: pathname }),
      });
      const raw = await res.json();
      const parsed: AIResponse = JSON.parse(raw);

      const currentViewingPost = JSON.parse(localStorage.getItem("currentViewingPost") || "{}") as Post;

      if (pathname === "/" && ["navigate", "like_post", "unlike_post", "save_post", "unsave_post", "comment"].includes(parsed.action)) {

        const likePost = (userId: Id<"users">, type: "like_post" | "unlike_post") => {
          const likes = currentViewingPost.likes;
          const alreadyLiked = likes.includes(userId);

          if (type === "like_post") {
            if (alreadyLiked) {
              parsed.response = "This post is already liked!";
            } else {
              toggleLikeMutation({ postId: currentViewingPost._id, userId });
            }
            return;
          }

          if (type === "unlike_post") {
            if (alreadyLiked) {
              toggleLikeMutation({ postId: currentViewingPost._id, userId });
            } else {
              parsed.response = "The post you are trying to unlike is not liked!";
            }
          }
        }

        const savePost = (userId: Id<"users">, type: "save_post" | "unsave_post") => {
          const saves = currentViewingPost.saves;
          const alreadySaved = saves.includes(userId);

          if (type === "save_post") {
            if (alreadySaved) {
              parsed.response = "This post is already saved!";
            } else {
              toggleSaveMutation({ postId: currentViewingPost._id, userId });
            }
            return;
          }

          if (type === "unsave_post") {
            if (alreadySaved) {
              toggleSaveMutation({ postId: currentViewingPost._id, userId });
            } else {
              parsed.response = "The post you are trying to unsave is not saved!";
            }
          }
        }

        if (!currentUser) {
          toast.error("No user found.");
          return parsed;
        }

        switch (parsed.action) {
          case "like_post":
            likePost(currentUser._id, "like_post")
            break;
          case "unlike_post":
            likePost(currentUser._id, "unlike_post")
            break;
          case "save_post":
            savePost(currentUser._id, "save_post")
            break;
          case "unsave_post":
            savePost(currentUser._id, "unsave_post")
            break;
          case "comment":
            handleComment({
              comment: {
                userId: currentUser._id,
                text: parsed.message
              },
              postId: currentViewingPost._id
            })
            break;
        }
      }

      if (pathname === "/create-post" && parsed.action === "create_post" && ["navigate", "create_post"].includes(parsed.action)) {
        setPost({ title: parsed.title, location: parsed.location, tags: parsed.tags })
        console.log("creating post...")
      }

      if (parsed.action === "navigate") {
        if (parsed.destination === "post-details") {
          router.push(`/${parsed.destination}/${currentViewingPost._id}`);
        } else {
          router.push(`/${parsed.destination}`);
        }
      }

      if ("response" in parsed) {
        speak(parsed.response);
        setAiResponse(parsed.response);
      }

      setLastResponse(parsed);
      resetTranscript();
      return parsed;
    },
    [pathname, router, resetTranscript, toggleLikeMutation, toggleSaveMutation, handleComment, currentUser, setPost]
  );

  const runAI = useCallback(
    async (userInput?: string) => {
      const textInput = (userInput || transcript)?.trim();

      if (!textInput) {
        speak("Please provide an input!");
        return { response: "Please provide an input!" };
      }

      // Check if already processing
      if (isGloballyProcessing) {
        console.log("Module: Already processing, skipping...");
        return currentProcessingPromise || Promise.resolve({ response: "Already processing" });
      }

      // Check if same transcript
      if (textInput === lastGlobalTranscript) {
        console.log("Module: Already processed this transcript, skipping...");
        return Promise.resolve({ response: "Already processed" });
      }

      // Set global flags
      isGloballyProcessing = true;
      lastGlobalTranscript = textInput;
      setLoading(true);

      console.log("Module: Processing transcript:", textInput);

      currentProcessingPromise = processAI(textInput)
        .catch((err) => {
          console.error("AI action failed", err);
          const fallback: AIResponse = {
            action: "unsupported",
            message: "AI parsing failed",
            response: "Something went wrong, please try again.",
          };
          speak(fallback.response);
          return fallback;
        })
        .finally(() => {
          isGloballyProcessing = false;
          setLoading(false);
          currentProcessingPromise = null;
          // Reset after delay
          setTimeout(() => {
            lastGlobalTranscript = "";
          }, 1000);
        });

      return currentProcessingPromise;
    },
    [transcript, processAI]
  );

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: false, language: "en-US" });
  const stopListening = () => SpeechRecognition.stopListening();

  useEffect(() => {
    async function simulateSpeech(text: string, delay = 380) {
      const words = text.split(" ");
      console.log("talking...");
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      console.log("not talking...");
      setAiResponse("");
    }

    if (aiResponse) simulateSpeech(aiResponse);
  }, [aiResponse]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!transcript && !listening && !loading && !aiResponse) {
      intervalId = setInterval(() => {
        startListening();
      }, 1000);
    }

    if (!listening && !loading && !aiResponse && transcript && transcript.trim()) {
      console.log("Triggering module AI processing for:", transcript);
      runAI();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [transcript, listening, loading, aiResponse, runAI]);

  return {
    runAI,
    lastResponse,
    loading,
    transcript,
    listening,
    aiResponse,
    startListening,
    stopListening,
    resetTranscript
  };
}