"use client"

import { useState } from "react";
import { ModalAddPartner } from "./modalAddPartner";
import { ModalDeletePartner } from "./modalDeletePartner";

interface ModalsPartnersProps {
  modalAddPartner?: boolean;
  modalDeletePartner?: boolean;
}

export default function ModalsPartners({ modalAddPartner, modalDeletePartner }: ModalsPartnersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {modalAddPartner && (
        <ModalAddPartner
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Add Partner +"
        />
      )}
      {modalDeletePartner && (
        <ModalDeletePartner
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Delete"
        />
      )}
    </div>
  )
}