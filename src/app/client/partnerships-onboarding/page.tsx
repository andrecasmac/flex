"use client"
import React, { useEffect, useState } from 'react';
import { PageTitle } from "@/components/page-title";
import { DataTable } from '@/app/examples/tables/table/data-table';
import { columns } from './columns'
import { PartnerShipClientTableContent } from '../../../types/TableTypes';
import { Button } from '@/components/ui/button';
import { partnership } from '@/types/DbTypes';
import { getPartnershipById } from '@/da/Partnerships/partnerships-da';

export default function PartnershipsOnboarding({searchParams/*Parameters we receive from Partnerhsips Page*/}:{
  searchParams :{
  id:string,
  name:string
  }
}) {

  const partnershipId = searchParams.id;
  const [partnerships, setPartnerships] = useState<partnership>();
  const [dataPacket, setDataPacket] = useState<PartnerShipClientTableContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchData = async () => {
      try {
          const unfilteredData = await getPartnershipById(partnershipId);
          setPartnerships(unfilteredData);
          const ediDocuments = unfilteredData.partner.EDI_documents;
          const uploadedDocuments = unfilteredData.uploaded_documents;
          const filteredData = ediDocuments.map(ediDoc => {
            const uploadedDoc = uploadedDocuments.find(doc => doc.type === ediDoc.type);
            return{
              ...ediDoc,
              status: uploadedDoc ? uploadedDoc.status : "Pending",
              partnershipId: partnershipId
            };
          });
          setDataPacket(filteredData);
      } catch (err) {
          setError('Failed to fetch data');
      } finally {
          setLoading(false);
      }
      };

      fetchData();
  }, [partnershipId]);

  if (loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>{error}</p>;
  }
  
  const rowName=searchParams.name

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <PageTitle title={rowName+" "+"Partnership"} />
      <div className="flex w-[80%] justify-end pt-5 pb-5">
                    {/*This is the Modal that adds partnerships*/}
                    <Button>Download PO Test</Button>
                </div>
      <div className="w-[80%] overflow-auto border rounded-xl">
        <DataTable columns={columns} data={dataPacket}></DataTable>
      </div>
    </div>
  );
}
