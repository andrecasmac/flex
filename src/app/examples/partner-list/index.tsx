"use client"

import { useState } from "react";
import { ModalAddPartner } from "../modal/modalAddPartner";
import { ModalDeletePartner } from "../modal/modalDeletePartner";

interface ModalsPartnersProps {
  modalAddPartner?: boolean;
  modalDeletePartner?: boolean;
  selectedItemName?: string;
  itemId?: string;
}

export default function ModalsPartners({ modalAddPartner, modalDeletePartner, selectedItemName, itemId }: ModalsPartnersProps) {
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
      {modalDeletePartner && selectedItemName && itemId &&(
        <ModalDeletePartner
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent="Delete"
          itemName={selectedItemName}
          itemId={itemId}
        />
      )}
    </div>
  )
}