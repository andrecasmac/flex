"use client";

import { useState } from "react";
import { ModalPartner } from "./modalPartner";
import { ModalTest } from "./modalTest";
import { ModalUpload } from "./modalUpload";
import { ModalErrorList } from "./modalErrorList";
import { ModalAddDoc } from "./modalAddDoc";
import { ModalAddPartner } from "./modalAddPartner";

interface ModalsProps {
  modalPartner?: boolean;
  modalAddDoc?: boolean;
  modalTest?: boolean;
  modalUpload?: boolean;
  modalErrorList?: boolean;
  modalAddPartner?: boolean;
}

export default function Modals({ modalPartner, modalAddDoc, modalTest, modalUpload, modalErrorList, modalAddPartner }: ModalsProps) {
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
      {modalAddPartner && (
        <ModalAddPartner
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Add Partner +"
        />
      )}
    </div>
  );
}
