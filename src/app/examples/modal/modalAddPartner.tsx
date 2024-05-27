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

const formSchema = z.object({
  content: z.string().min(1, {
    message: "*Please fill in all data",
  }),
});

interface ModalAddPartnerProps {
  ButtonContent: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function ModalAddPartner({
  ButtonContent,
  isOpen,
  setIsOpen,
}: ModalAddPartnerProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            PARTNER
          </DialogTitle>
        </DialogHeader>

        <div className="px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trading Partner Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                    <FormLabel>Delimiters</FormLabel>
                    <FormControl>
                    <Input />
                    </FormControl>
                </div>

                <div>
                    <FormLabel>Connection Type</FormLabel>
                    <FormControl>
                    <Input />
                    </FormControl>
                </div>

                <div>
                    <FormLabel>EDI Version</FormLabel>
                    <FormControl>
                    <Input />
                    </FormControl>
                </div>

                <div>
                    <FormLabel>Document Description</FormLabel>
                    <FormControl>
                    <Input />
                    </FormControl>
                </div>

                <div>
                    <FormLabel>EOL</FormLabel>
                    <FormControl>
                    <Input />
                    </FormControl>
                </div>

                <div>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                    <Input />
                    </FormControl>
                </div>
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
