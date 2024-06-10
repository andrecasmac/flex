"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updatePartnerDocuments } from "@/da/Partners/partner-da";
import { EDI_Document } from "@/types/DbTypes";

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Must input the name of Document",
  }),
});

interface ModalAddDocProps {
  ButtonContent: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  partnerId: string;
}

export function ModalAddDoc({
  ButtonContent,
  isOpen,
  setIsOpen,
  partnerId
}: ModalAddDocProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleUpdate = async (values:z.infer<typeof formSchema>, id:string) => {
    try{
      const partnerId = id;
      const name = values.content;
      const document = {
        type: name,
        template: false,
        mandatory: true,
        structure: {}
      };
      const data = updatePartnerDocuments(partnerId, document);
      if(!data){
        throw new Error("Failed to update edi document")
      }
    } catch (error) {

    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    handleUpdate(values, partnerId)
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-xl">{ButtonContent} </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-white sm:text-center font-semibold">
            ADD DOCUMENT
          </DialogTitle>
        </DialogHeader>

        <div className="px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                <p className="text-sm text-gray-400">“Document Configuration”</p>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button size="sm" type="button" className="h-8 w-[40%]">
                    Cancel
                  </Button>
                </DialogClose>

                {}
                <Button
                  size="sm"
                  type="submit"
                  onClick={() => onSubmit}
                  className="h-8 w-[40%]"
                >
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
