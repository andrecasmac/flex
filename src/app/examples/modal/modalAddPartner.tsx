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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createPartner } from "@/da/Partners/partner-da";
import * as fs from 'fs';
import { useState } from "react";

const formSchema = z.object({
  partner: z.string().min(1, {
    message: "*Please fill in Partner name",
  }),
  delimiter: z.string().min(1, {
    message: "*Select a Delimiter",
  }),
  connection_type: z.string().min(1, {
    message: "*Select Connection Type",
  }),
  edi_version: z.string().min(1, {
    message: "*Select EDI Version",
  }),
  description: z.string().min(1, {
    message: "*Add a description",
  }),
  eol: z.string().min(1, {
    message: "*Select an EOL",
  }),
  file: z
  .instanceof(File, {message: "*Please upload a file"})
  .refine((file) => file !== undefined, {message: "*Please upload a file"})
  .refine((file) => file?.name.endsWith(".txt"), {message: "*File must be .txt"}),
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

  const [content, setContent] = useState<JSON>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partner: "",
      delimiter: "",
      connection_type: "",
      edi_version: "",
      description: "",
      eol: "",
      file: undefined,
    },
  });

  const handleCreate = async (values: z.infer<typeof formSchema>) => {
    try {
        const name = values.partner;
        const edi_version = values.edi_version;
        const delimiters = values.delimiter;
        const EOL = values.eol;
        const type_of_connection = values.connection_type;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
              const text = event.target?.result as string;
              const jsonData = JSON.parse(text);
              setContent(jsonData);
          } catch(err) {
            console.log(err);
          }
        };
        const PO_Test = content as JSON;
        const hidden = true;

        const data = await createPartner(name, edi_version, delimiters, EOL, type_of_connection, PO_Test, hidden);

        if(!data){
          throw new Error("Failed to create Partner")
        }

        console.log(data);
    } catch (err) {
        throw err;
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    handleCreate(values);
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
                name="partner"
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

                <FormField
                  control={form.control}
                  name="delimiter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delimiters</FormLabel>
                      <FormControl>
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Delimiter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="*">*</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="connection_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connection Type</FormLabel>
                      <FormControl>
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Connection Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FTP">FTP</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="edi_version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EDI Version</FormLabel>
                      <FormControl>
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select EDI Version" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="X12 4010">X12 4010</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EOL</FormLabel>
                      <FormControl>
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select EOL" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="~">~</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={(event) => field.onChange(event.target.files?.[0])}  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
