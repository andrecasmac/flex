"use client";

import { useState } from "react";
import { ModalAddDoc } from "./modalAddDoc";

interface ModalAddProps {
    modalAddDoc?: boolean;
}

export default function ModalAdd({ modalAddDoc }: ModalAddProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            {modalAddDoc && (
                <ModalAddDoc
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    ButtonContent="Add Document +"
                />
            )}
        </div>
    );
};