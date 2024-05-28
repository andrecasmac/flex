import { PageTitle } from "@/components/page-title";
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from "@/components/ui/table"
import partnershipsData from "./partnershipsData.json"

import { useEffect, useState } from "react";

/*function PartnershipsOnboarding() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      setData(partnershipsData);
    }, []);*/
  

export default function PartnershipsOnboarding() {
  return (
    <>
      <PageTitle title="{} Partnership" />
      <div className="w-[80%] overflow-auto border rounded-xl">
          <Table className="max-sm:text-sm text-base md:text-lg">
            <TableHeader className="bg-turquoise dark:bg-cyan-950">
              <TableRow className="">
                <TableHead></TableHead>
                <TableHead className="text-center">Documents</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
                <TableHead className="text-center">Download</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell className="font-medium ">
                </TableCell>
                <TableCell className=" px-20">
                </TableCell>
                <TableCell className=" px-20">
                </TableCell>
                <TableCell className="w-[8%]">
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
    </>
  );
}
