import { PageTitle } from "@/components/page-title";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableCaption } from "@/components/ui/table"
import partnershipsData from "./partnershipsData.json"

import { useEffect, useState } from "react";

/*function PartnershipsOnboarding() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      setData(partnershipsData);
    }, []);*/
  

export default function PartnershipsOnboarding() {
  return (
    <div>
      <PageTitle title="{} Partnership" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell><TableHeader>Documents</TableHeader></TableCell>
            <TableCell><TableHeader>Status</TableHeader></TableCell>
            <TableCell><TableHeader>Actions</TableHeader></TableCell>
            <TableCell><TableHeader>Download</TableHeader></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
        </TableBody>
      </Table>
    </div>

    
  );
}
