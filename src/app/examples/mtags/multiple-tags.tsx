"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function MultipleTagsInput({
  PreviousTags,
}: {
  PreviousTags: string[];
}) {
  const [tags, setTags] = useState<string[]>(PreviousTags);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setTags(PreviousTags);
  }, [PreviousTags]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" || e.key === "," || e.key === " ") &&
      inputRef.current?.value.trim() !== ""
    ) {
      e.preventDefault();
      const inputElement = inputRef.current;
      if (inputElement) {
        const value = inputElement.value.trim();
        if (value && !tags.includes(value)) {
          setTags([...tags, value]);
          inputElement.value = "";
        }
        console.log(tags);
      }
    } else if (
      e.key === "Backspace" &&
      tags.length > 0 &&
      inputRef.current?.value === ""
    ) {
      e.preventDefault();
      removeTag(tags.length - 1);
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="tags-input">Multiple tags</Label>
      <div
        className={`flex flex-wrap gap-2 border border-turquoise dark:border-darkTurquoise bg-white dark:bg-cyan-950 rounded-xl p-2 ${
          isFocused ? "ring-2 ring-ring" : ""
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
              className="ml-1 -mr-1 h-4 w-4 rounded-full p-0.3 text-white hover:bg-inherit hover:text-slate-300 focus:outline "
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
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
          className="flex-1 bg-transparent outline-none border-none ring-none py-1"
          placeholder="Add..."
        />
      </div>
    </div>
  );
}
