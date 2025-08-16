"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

function CustomTagInput({ fieldChange, value }: { fieldChange: () => void, value: string }) {
  const [inputValue, setInputValue] = useState(value || "")
  const [tags, setTags] = useState<string[]>([])

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div
      className="flex items-center gap-2 bg-[#1A1A1A] border-light focus-visible:ring-offset-1 focus:ring-offset-dark-2 text-white rounded-md"
    >
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "flex items-center gap-1 rounded-full bg-dark-5 px-3 py-1 text-sm"
            )}
          >
            {tag}
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </span>
        ))}
      </div>

      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          fieldChange()
          value = [...tags, e.target.value].join(" ")
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            addTag()
          }
        }}
        placeholder="Type something and press Enter"
        className="flex-1 bg-none border-none focus-visible:ring-0 focus-visible:outline-none"
      />
    </div>
  )
}

export default CustomTagInput