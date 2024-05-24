"use client";

import { useState } from "react";
import { ModalPartner } from "./modalPartner";
import { ModalTest } from "./modalTest";
import { ModalUpload } from "./modalUpload";
import { ModalErrorList } from "./modalErrorList";
import { ModalAddDoc } from "./modalAddDoc";
import { ModalSuccess } from "./modalSuccess";

interface ModalsProps {
  modalPartner?: boolean;
  modalAddDoc?: boolean;
  modalTest?: boolean;
  modalUpload?: boolean;
  modalSuccess?: boolean;
  modalErrorList?: boolean;
}

export default function Modals({ modalPartner, modalAddDoc, modalTest, modalUpload, modalErrorList,modalSuccess }: ModalsProps) {
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
      {modalSuccess && (
        <ModalSuccess
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Modal Success"
        />
      )}
    </div>
  );
}
