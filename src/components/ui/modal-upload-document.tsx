"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from '@radix-ui/react-dialog';
import Dropzone from "@/components/ui/dropzone"

const ModalUpload = () => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button
                    variant="default"
                    size="lg"
                    className="rounded-2xl active:scale-95 transition-all button"
                >
                    Upload your document
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/20" />
                <Dialog.Content className="bg-white fixed rounded-md p-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow w-3/4">

                    <div className="flex items-center justify-center p-2 h-72">
                        <Dropzone />
                    </div>

                    <div className="flex justify-around p-2 w-full mt-7">

                        <Dialog.Close asChild>
                            <Button variant="default" size="lg" className="rounded-2xl active:scale-95 transition-all button mx-10 min-w-52">
                                Cancel
                            </Button>
                        </Dialog.Close>

                        <Dialog.Close asChild>
                            <Button variant="default" size="lg" className="rounded-2xl active:scale-95 transition-all button mx-10 min-w-52">
                                Validate
                            </Button>
                        </Dialog.Close>

                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default ModalUpload;