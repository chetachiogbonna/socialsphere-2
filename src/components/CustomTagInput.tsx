"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type CustomTagInputProps = {
  fieldChange: (tags: string[]) => void
  value: string[]
}

function CustomTagInput({ fieldChange, value }: CustomTagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [tags, setTags] = useState<string[]>(value || [])

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()]
      setTags(newTags)
      fieldChange(newTags)
      setInputValue("")
    }
  }

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag)
    setTags(newTags)
    fieldChange(newTags)
  }

  return (
    <div className="flex items-center gap-2 bg-[#1A1A1A] border-light text-white rounded-md p-2">
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
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            addTag()
          }
        }}
        placeholder="Type something and press Enter"
        className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:outline-none"
      />
    </div>
  )
}

export default CustomTagInput