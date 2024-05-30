"use client";

import { useState, useRef, useCallback, KeyboardEvent } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MultipleTagsInputProps {
  labelContent?: string;
  tags: string[]; // Receives the tags from the parent
  onTagsChange: (newTags: string[]) => void; // Callback to update tags
}

export default function MultipleTagsInput({
  labelContent,
  tags,
  onTagsChange,
}: MultipleTagsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null); // referencia del input
  const [isFocused, setIsFocused] = useState(false); // focus del input

  const handleKeyDown = useCallback(
    // callback del input
    (e: KeyboardEvent<HTMLInputElement>) => {
      const value = inputRef.current?.value.trim(); // const que guarda la informacion input

      if (
        // si se preciona enter, coma o espacio y que el elemento no se encuentra
        (e.key === "Enter" || e.key === "," || e.key === " ") &&
        value &&
        !tags.includes(value)
      ) {
        e.preventDefault();
        onTagsChange([...tags, value]); // llama a la funcion para añadir un nuevo valor a los tags
        inputRef.current!.value = ""; // resetea el intput
      }
      // si se preciona backspace
      else if (e.key === "Backspace" && tags.length && !value) {
        e.preventDefault();
        onTagsChange(tags.slice(0, -1)); // borra el ultimo elemnto de la lista
      }
    },
    // Indica que esta función debe actualizarse si tags o onTagsChange cambian
    [tags, onTagsChange]
  );

  return (
    <div className="flex flex-col space-y-2 w-full">
      {labelContent && <Label htmlFor="tags-input">{labelContent}</Label>}
      <div
        className={`flex flex-wrap gap-2 border border-input dark:border-darkBlueMarine bg-white dark:bg-card rounded-md py-1.5 ps-2 ${
          isFocused ? "ring-1 ring-ring dark:ring-cyan-950" : ""
        }`}
        onClick={() => inputRef.current?.focus()} // focus al imput
      >
        {/* mapeo de los tags */}
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-sm bg-turquoise dark:bg-darkBlueMarine px-2 py-1 text-sm font-medium text-white"
          >
            {tag}
            <Button
              type="button"
              variant={"ghost"}
              className="ml-1 -mr-1 h-4 w-4 rounded-full p-0.3 text-white hover:bg-inherit hover:text-slate-300 focus:outline"
              onClick={
                (e) => {
                  e.stopPropagation();
                  onTagsChange(tags.filter((_, i) => i !== index));
                } // borrar el tag correspondiente al index
              }
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
          className="flex-1 w-2 py-1 bg-transparent outline-none border-none ring-none rounded-md"
          placeholder="Add..."
          aria-label="Add new tag"
        />
      </div>
    </div>
  );
}
