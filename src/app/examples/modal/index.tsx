"use client";

import { useState } from "react";
import { ModalPartner } from "./modalPartner";
import { ModalTest } from "./modalTest";
import { ModalUpload } from "./modalUpload";

interface ModalsProps {
  modalPartner?: boolean;
  modalTest?: boolean;
  modalUpload?: boolean;
}

export default function Modals({ modalPartner, modalTest, modalUpload }: ModalsProps) {
  const [isOpen, setIsOpen] = useState(false);
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
      {modalUpload && (
        <ModalUpload
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Subir Documento"
        />
      )}
    </div>
  );
}
