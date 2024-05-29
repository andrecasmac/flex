"use client"

import { useState } from "react";
import { ModalAddPartner } from "./modalAddPartner";
import { ModalDeletePartner } from "./modalDeletePartner";

interface ModalsPartnersProps {
  modalAddPartner?: boolean;
  modalDeletePartner?: boolean;
  selectedItemName?: string;
}

export default function ModalsPartners({ modalAddPartner, modalDeletePartner, selectedItemName }: ModalsPartnersProps) {
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
      {modalDeletePartner && selectedItemName &&(
        <ModalDeletePartner
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Delete"
          itemName={selectedItemName}
        />
      )}
    </div>
  )
}