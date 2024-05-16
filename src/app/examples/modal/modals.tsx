"use client";

import { useState } from "react";
import { ModalPartner } from "./modalPartner";

interface ModalsProps {
  modalPartner?: boolean;
  ButtonContent: string;
}

export default function Modals({ modalPartner, ButtonContent }: ModalsProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {modalPartner && (
        <ModalPartner
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ButtonContent={ButtonContent}
        />
      )}
    </div>
  );
}
