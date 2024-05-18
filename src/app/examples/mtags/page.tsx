"use client";

import { PageTitle } from "@/components/page-title";
import MultipleTagsInput from "./multiple-tags";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const LsKey = "Tags";

export default function Page() {
  const [allTheTags, setAllTheTags] = useState<string[]>([]);

  // carga las tags desde localStorage
  useEffect(() => {
    const storedTags = localStorage.getItem(LsKey);
    if (storedTags) {
      setAllTheTags(JSON.parse(storedTags));
    }
  }, []);

  const handleSaveClick = () => {
    localStorage.setItem(LsKey, JSON.stringify(allTheTags));

    // window.location.reload();
  };

  return (
    <>
      <PageTitle title="Multiple tags" />
      <div className="space-y-5 flex flex-col items-center w-[80%]">
        <MultipleTagsInput
          labelContent="Multiple Tags"
          PreviousTags={allTheTags}
          SaveTags={setAllTheTags}
        />

        <div className="flex flex-col w-[50%]">
          <Button variant={"default"} onClick={handleSaveClick}>
            Save (console.log)
          </Button>

          <div className="py-10 text-[10px]">
            <pre>{JSON.stringify(allTheTags, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
