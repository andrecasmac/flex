"use client";

import { PageTitle } from "@/components/page-title";
import MultipleTagsInput from "../../../components/multiple-tags";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

import Modals from "../modal";

const LsKey = "Tags";

export default function Page() {
  const [allTheTags, setAllTheTags] = useState<string[]>([]); // useState para las tags
  const [error, setError] = useState<Error | null>(null); // useState para posibles errores al añadir tags
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedTags = localStorage.getItem(LsKey); // get de las tags
    if (storedTags) {
      setAllTheTags(JSON.parse(storedTags));
    }
  }, []);

  const handleSaveClick = async () => {
    try {
      // throw new Error("mal mal mal");
      localStorage.setItem(LsKey, JSON.stringify(allTheTags)); // guardar las tags
      setShowSuccess(true); // marcar success como true
      setShowError(false); // marcar error como false
    } catch (error) {
      setError(error as Error); // cuando hay un error setError
      setShowSuccess(false); // marcar success como false
      setShowError(true); // marcar error como true
    } finally {
      setIsModalOpen(true); // abrir modal
    }
  };
  return (
    <>
      <PageTitle title="Multiple tags" />
      <div className="space-y-5 flex flex-col items-center w-[80%]">
        <MultipleTagsInput // llamamos al componente y le pasamos sus tags
          labelContent="Multiple Tags"
          tags={allTheTags}
          onTagsChange={setAllTheTags}
        />

        <div className="flex flex-col  items-center w-[50%]">
          <Modals // modal para guardar los datos
            modalSave // tipo de modal
            onSave={handleSaveClick} // guardar al darle click
            onError={setError} // mardar el error
            showSuccess={showSuccess} // mardar estado showSuccess
            showError={showError} // mandar estado showError
            isOpen={isModalOpen} // abrir el modal
            ErrorData={error} // mandar el mensaje de error
            setIsOpen={setIsModalOpen}
          />
          <div className="py-10 text-[10px]">
            <pre>{JSON.stringify(allTheTags, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
