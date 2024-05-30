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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


interface ModalDeletePartnerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ButtonContent: string;
  itemName: string;
}

export function ModalDeletePartner({
    isOpen,
    setIsOpen,
    ButtonContent,
    itemName,
  }: ModalDeletePartnerProps) {
    const itemNameSize = itemName.length

    const formSchema = z.object({
      name: z.string()
      .includes(itemName, {message: "*Incorrect input",})
      .length(itemNameSize, {message: "*Incorrect input",}),
    });
    
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
      },
    });
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
      setIsOpen(false);
    }

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={event => event.preventDefault()}>{ButtonContent}</DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-white sm:text-center font-semibold">
              CONFIRM DELETE
            </DialogTitle>
          </DialogHeader>

          <div className="px-10 pt-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mx-7">
                <p className="text-gray-500 mb-5">Please type partner name exactly as shown below to confirm deletion.</p>
                <div className="flex items-center justify-center p-4 border border-primary rounded-lg">
                  <p className="text-primary text-2xl font-bold">{itemName}</p>
                </div>

                <div className="mt-9">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
      
                <DialogFooter className="pt-10">
                  <DialogClose asChild>
                    <Button size="sm" type="button" className="h-8 w-[40%]">
                      Cancel
                    </Button>
                  </DialogClose>
                  {}
                  <Button size="sm" type="submit" onClick={() => onSubmit} className="h-8 w-[40%]">
                    Delete
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    );
  }