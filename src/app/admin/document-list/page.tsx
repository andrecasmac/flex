"use client"

import { PageTitle } from "@/components/page-title";
import { promises as fs } from 'fs';
import { Button } from "@/components/ui/button";
import { columns } from "./colums";
import { DataTable } from "./data-table-doc-list";
import Modals from "@/app/examples/modal";
import { getPartnerById } from "@/da/Partners/partner-da";
import { EDI_Document, Partner } from "@/types/DbTypes";
import { useEffect, useState } from "react";

export default function Page({searchParams/*Parameters we receive from Partnerhsips Page*/}:{
    searchParams :{
    id:string
    }
  }) {
    const partnerId = searchParams.id;
    const [partners, setPartners] = useState<Partner>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getPartnerById(partnerId);
            setPartners(data);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [partnerId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const data = partners?.EDI_documents as EDI_Document[]

    return(
        <div className="flex flex-col w-full justify-center items-center">
            <PageTitle title={partners?.name + " Documents"} />
            <div className="w-[80%]">
                <div className="flex flex-row-reverse mb-5 ">
                    <Modals modalAddDoc={true} partnerId={partnerId}/>
                </div>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}