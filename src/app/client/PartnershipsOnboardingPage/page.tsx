import React from 'react';
import { PageTitle } from "@/components/page-title";
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import partnershipsData from "./partnershipsData.json";
import Badge from '@/components/badge';

export default function PartnershipsOnboarding() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <PageTitle title="{} Partnership" />
      <div className="w-[80%] overflow-auto border rounded-xl">
        <Table className="max-sm:text-sm text-base md:text-lg">
          <TableHeader className="bg-turquoise dark:bg-cyan-950">
            <TableRow className="">
              <TableHead></TableHead>
              <TableHead className="text-center">Documents</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead className="text-center">Downloads</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partnershipsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell></TableCell>
                <TableCell className="font-medium">{item.document_name}</TableCell>
                {/* Integrar el componente Badge en la columna de status */}
                <TableCell className="px-20 text-center">
                  <Badge label={item.status || "-"} />
                </TableCell>
                <TableCell className="px-20 text-center">{item.validated ? "Validated" : "Pending Validation"}</TableCell>
                <TableCell className="w-[8%]"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
