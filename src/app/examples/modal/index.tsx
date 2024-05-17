"use client";

import { useState } from "react";
import { ModalPartner } from "./modalPartner";
import { ModalTest } from "./modalTest";
import { ModalErrorList } from "./modalErrorList";

interface ModalsProps {
  modalPartner?: boolean;
  modalTest?: boolean;
  modalErrorList?: boolean;
}

export default function Modals({ modalPartner, modalTest,modalErrorList }: ModalsProps) {
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
      {modalErrorList && (
        <ModalErrorList
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Modal Lista Error"
        />
      )}
    </div>
  );
}
