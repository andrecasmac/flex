import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen items-center w-[100%] mx-auto pt-28 ">
      <div className="py-10">
        <Button
          variant="outline"
          size="sm"
          className="rounded-2xl bg-turquesa border-turquesaOscuro text-white hover:border-turquesaOscuro hover:text-turquesaOscuro active:scale-95 transition-all"
        >
          aaa
        </Button>
      </div>

      <div className="w-[80%] overflow-hidden rounded-xl">
        <Table>
          <TableHeader className=" bg-turquesa dark:bg-cyan-950">
            <TableRow className="">
              <TableHead className="w-[200px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>

            <TableRow className=" bg-neutral-400/10">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}


