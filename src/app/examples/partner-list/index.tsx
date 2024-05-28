"use client"

import { useState } from "react";
import { ModalAddPartner } from "./modalAddPartner";

interface ModalsPartnersProps {
  modalAddPartner?: boolean;
}

export default function ModalsPartners({ modalAddPartner }: ModalsPartnersProps) {
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
    </div>
  )
}