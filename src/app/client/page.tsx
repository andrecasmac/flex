'use client'
import { useEffect, useState } from "react";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/app/examples/tables/table/data-table";
import { columns } from "@/app/client/columns"
import ModalContextProvider from "@/app/context/modalContextProvider";
import { ModalAddPartnerships } from "@/app/examples/modal/modalAddPartnership";
import { PartnerShipsClientContent } from "../../types/TableTypes";
import { getPartnersOfClient } from "@/da/Clients/client-da";
import { partnership } from "@/types/DbTypes";

const data: PartnerShipsClientContent[] = [
    {
        id: "1",
        name: "Amazon",
        status: "Complete",
        edi: "X12 4010",
        connection: "FTP",
    },
    {
        id: "2",
        name: "Partnership 2",
        status: "In Process",
        edi: "X12 4010",
        connection: "...",
    },
    {
        id: "3",
        name: "Partnership 3",
        status: "In Process",
        edi: "X12 4010",
        connection: "...",
    },
    {
        id: "4",
        name: "Partnership 4",
        status: "In Process",
        edi: "X12 4010",
        connection: "...",
    },

]

export default function Page({searchParams/*Parameters we receive from Partnerhsips Page*/}:{
    searchParams :{
    id:string
    }
    }) {

    const [partnerships, setPartnerships] = useState<partnership[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getPartnersOfClient(searchParams.id);
            const filteredData = data.partnerships
            setPartnerships(filteredData);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [searchParams.id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <PageTitle title="Partnerships" />
            <ModalContextProvider>
                <div className="flex w-[80%] justify-end pt-5">
                    {/*This is the Modal that adds partnerships*/}
                    <ModalAddPartnerships ButtonContent="Add Parternship" clientId={searchParams.id}/>
                </div>
                <div className="flex w-[75%] justify-center items-center pt-5">
                    {/*This is where we display the Table with the Partnerships*/}
                    <DataTable columns={columns} data={partnerships} />
                </div>
            </ModalContextProvider>
        </div>
    )
}