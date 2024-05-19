"use client";

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MultipleTagsInputProps {
  labelContent?: string;
  tags: string[];  // Receives the tags from the parent
  onTagsChange: (newTags: string[]) => void; // Callback to update tags
}

export default function MultipleTagsInput({
  labelContent,
  tags,
  onTagsChange,
}: MultipleTagsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const value = inputRef.current?.value.trim();

      if (
        (e.key === "Enter" || e.key === "," || e.key === " ") &&
        value &&
        !tags.includes(value)
      ) {
        e.preventDefault();
        onTagsChange([...tags, value]); // Notify parent of change
        inputRef.current!.value = "";
      } else if (e.key === "Backspace" && tags.length && !value) {
        e.preventDefault();
        onTagsChange(tags.slice(0, -1)); // Notify parent of change
      }
    },
    [tags, onTagsChange] // Include onTagsChange as a dependency
  );


  return (
    <div className="flex flex-col space-y-2 w-[35%]">
      {labelContent && <Label htmlFor="tags-input">{labelContent}</Label>}
      <div
        className={`flex flex-wrap gap-2 border border-turquoise dark:border-darkTurquoise bg-white dark:bg-cyan-950 rounded-xl p-2 ${
          isFocused ? "ring-1 ring-ring" : ""
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-md bg-turquoise dark:bg-darkTurquoise px-2 py-1 text-sm font-medium text-white"
          >
            {tag}
            <Button
              type="button"
              variant={"ghost"}
              className="ml-1 -mr-1 h-4 w-4 rounded-full p-0.3 text-white hover:bg-inherit hover:text-slate-300 focus:outline"
              onClick={() => onTagsChange(tags.filter((_, i) => i !== index))} // Notify parent of change
            >
              <X />
            </Button>
          </span>
        ))}
        <input
          id="tags-input"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 w-2 bg-transparent outline-none border-none ring-none py-1 rounded-md"
          placeholder="Add..."
          aria-label="Add new tag"
        />
      </div>
    </div>
  );
}
