"use client";

import { useState, useCallback } from "react";
import { ModalPartner } from "./modalPartner";
import { ModalTest } from "./modalTest";
import { ModalUpload } from "./modalUpload";
import { ModalErrorList } from "./modalErrorList";
import { ModalAddDoc } from "./modalAddDoc";
import { ModalSuccess } from "./modalSuccess";

import { ModalSave } from "./modalSave";
interface ModalsProps {
  modalPartner?: boolean;
  modalAddDoc?: boolean;
  modalTest?: boolean;
  modalUpload?: boolean;
  modalSuccess?: boolean;
  modalErrorList?: boolean;
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
  modalAddDoc,
  modalTest,
  modalUpload,
  modalErrorList,
  modalSave,
  onError,
  showError,
  onSave,
  ErrorData,
  showSuccess,
}: ModalsProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      {modalAddDoc && (
        <ModalAddDoc
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Add Document +"
        />
      )}
      {modalTest && (
        <ModalTest
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Modal vacio"
        />
      )}
      {modalErrorList && (
        <ModalErrorList
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Modal Lista Error"
        />
      )}
      {modalUpload && (
        <ModalUpload
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Subir Documento"
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
