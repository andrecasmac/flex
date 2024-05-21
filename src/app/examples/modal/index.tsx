"use client";

import { useState, useCallback } from "react";
import { ModalPartner } from "./modalPartner";
import { ModalTest } from "./modalTest";

import { ModalSave } from "./modalSave";
interface ModalsProps {
  modalPartner?: boolean;
  modalTest?: boolean;
  modalSave?: boolean;
  onSave?: () => Promise<void>;
  onError?: (error: Error) => void;
  ErrorData?: Error | null;
  showSuccess?: boolean;
  showError?: boolean;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function Modals({
  modalPartner,
  modalTest,
  modalSave,
  onSave,
  onError,
  showSuccess,
  showError,
  ErrorData,
  isOpen,
  setIsOpen = () => {},
}: ModalsProps) {
  const handleSave = useCallback(async () => {
    try {
      await onSave?.();
      console.log("exito");
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onSave, onError]);

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
          setIsOpen={setIsOpen}
          ButtonContent="Save"
          onSave={handleSave}
          showError={showError}
          ErrorData={ErrorData}
          showSuccess={showSuccess}
        />
      )}
    </div>
  );
}
