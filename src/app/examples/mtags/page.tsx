"use client";

import { PageTitle } from "@/components/page-title";
import MultipleTagsInput from "./multiple-tags";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

import Modals from "../modal";

const LsKey = "Tags";

export default function Page() {
  const [allTheTags, setAllTheTags] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const storedTags = localStorage.getItem(LsKey);
    if (storedTags) {
      setAllTheTags(JSON.parse(storedTags));
    }
  }, []);

  const handleSaveClick = async () => {
    try {
      localStorage.setItem(LsKey, JSON.stringify(allTheTags));
    } catch (error) {
      setError(error as Error);
    }
  };
  const handleError = (error: Error) => {
    console.log(error);
  };
  return (
    <>
      <PageTitle title="Multiple tags" />
      <div className="space-y-5 flex flex-col items-center w-[80%]">
        <MultipleTagsInput
          labelContent="Multiple Tags"
          tags={allTheTags}
          onTagsChange={setAllTheTags}
        />

        <div className="flex flex-col  items-center w-[50%]">
          <Modals modalSave onSave={handleSaveClick} onError={handleError} />
          <div className="py-10 text-[10px]">
            <pre>{JSON.stringify(allTheTags, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
