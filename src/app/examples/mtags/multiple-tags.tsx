"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function MultipleTagsInput({
  PreviousTags = [],
  SaveTags,
  labelContent,
}: {
  // typado de las props
  labelContent?: string;
  PreviousTags?: string[] | null;
  SaveTags: (newTags: string[]) => void;
}) {
  const [tags, setTags] = useState<string[]>(PreviousTags ?? []); // useState para almacenar las etiquetas
  const inputRef = useRef<HTMLInputElement>(null); // referecia al campo de entrada

  const [isFocused, setIsFocused] = useState(false); // useState para cambier el css cuando es focus

  useEffect(() => {
    // useEffect que actualiza las etiquetas cuando cuando cambian los tags para poder guardarlas
    SaveTags(tags);
  }, [tags, SaveTags]);

  useEffect(() => {
    setTags(PreviousTags || []); // Actualizar tags si PreviousTags cambia
  }, [PreviousTags]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // funcion para manejar el input
    if (
      // si se preciona el enter, como o espacio y que el intup no este vacio
      (e.key === "Enter" || e.key === "," || e.key === " ") &&
      inputRef.current?.value.trim() !== ""
    ) {
      e.preventDefault(); // prevent defalt de inputs
      const inputElement = inputRef.current; // current input
      if (inputElement) {
        const value = inputElement.value.trim(); // obtiene el valor y lo recorta
        if (value && !tags.includes(value)) {
          // si el valor no es nulo y no esta diplicado
          setTags([...tags, value]); // agrega una nueva tag
          inputElement.value = ""; // limpia la entrada
        }
      }
    } else if (
      e.key === "Backspace" && // si se preciona backspace
      tags.length > 0 && // no hay etiquetas
      inputRef.current?.value === "" // y el input esta vacio
    ) {
      e.preventDefault(); // prevent defalt de inputs
      removeTag(tags.length - 1); // elimina la ultima etiqueta
    }
    return tags;
  };

  const removeTag = (index: number) => {
    // funcion para borrar una etiqueda
    setTags(tags.filter((_, i) => i !== index));
  };

  function allTags() {
    // funcion para debugear
    console.log(tags);
  }

  return (
    <div className="flex flex-col space-y-2 w-[50%]">
      <Label htmlFor="tags-input">{labelContent}</Label>
      <div
        className={`flex flex-wrap gap-2 border border-turquoise dark:border-darkTurquoise bg-white dark:bg-cyan-950 rounded-xl p-2 ${
          isFocused ? " ring-1 ring-ring" : ""
        }`}
        onClick={() => inputRef.current?.focus()} // focus al input cuando se hace click a este div
      >
        {/* mapeo de los tags */}
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
                // e.stopPropagation(); // evita que el boton se propague al contenedor
                removeTag(index); // borra el tag al hacer click al boton
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
          className="flex-1 bg-transparent outline-none border-none ring-none py-1 rounded-md"
          placeholder="Add..."
        />
      </div>
    </div>
  );
}
