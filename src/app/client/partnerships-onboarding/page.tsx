import React from 'react';
import { PageTitle } from "@/components/page-title";
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import partnershipsData from "./partnershipsData.json";
import Badge from '@/components/badge';
import { DataTable } from '@/app/examples/tables/table/data-table';
import { columns } from './columns'
import { PartnerShipClientTableContent } from '../../../../types/TableTypes';
import { Button } from '@/components/ui/button';
const data: PartnerShipClientTableContent[] = [
  {
    id: "2",
    document_name: "EDI 855 PO",
    mandatory:"Optional",
    status: "Complete",
    validated: true,
    file: ""
  },
  {
    id:"3",
    document_name: "EDI 856 PO",
    mandatory:"Optional",
    status: "Pending",
    validated: false,
    file: ""
  }
]
export default function PartnershipsOnboarding({searchParams/*Parameters we receive from Partnerhsips Page*/}:{
  searchParams :{
  id:string,
  name:string,
  status:string,
  edi: string,
  connection:string
  }
}) {
  
  const rowName=searchParams.name
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PageTitle title={rowName+" "+"Partnership"} />
      <div className="flex w-[80%] justify-end pt-5 pb-5">
                    {/*This is the Modal that adds partnerships*/}
                    <Button>Download PO Test</Button>
                </div>
      <div className="w-[80%] overflow-auto border rounded-xl">
        <DataTable columns={columns} data={data}></DataTable>
      </div>
    </div>
  );
}
