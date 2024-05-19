"use client";

import { useState, useCallback } from "react";
import { ModalPartner } from "./modalPartner";
import { ModalTest } from "./modalTest";

import { ModalSave } from "./modalSave";
interface ModalsProps {
  modalPartner?: boolean;
  modalTest?: boolean;
  modalSave?: boolean;
  onSave?: () => Promise<void>; // Callback for saving
  onError?: (error: Error) => void;
}

export default function Modals({
  modalPartner,
  modalTest,
  modalSave,
  onSave, // Callback for saving
  onError,
}: ModalsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // const handleSave = useCallback(async () => {
  //   try {
  //     await onSave?.(); // Espera a que se complete la promesa
  //     setIsOpen(false); // Cierra el modal solo si la operación fue exitosa
  //   } catch (error) {
  //     onError?.(error as Error); // Llama al callback de error si ocurre alguno
  //   }
  // }, [onSave, onError]);

  const handleSave = useCallback(() => {
    onSave?.(); // Call the onSave function if provided
    setIsOpen(false); // Close the modal after saving
  }, [onSave]);

  return (
    <div>
      {modalPartner && (
        <ModalPartner
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Modal"
        />
      )}
      {modalTest && (
        <ModalTest
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Modal vacio"
        />
      )}
      {modalSave && (
        <ModalSave
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Save"
          onSave={handleSave}
        />
      )}
    </div>
  );
}
