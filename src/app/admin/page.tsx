"use client"
import { PageTitle } from "@/components/page-title";
import { columns } from "./colums";
import { DataTable } from "./data-table-partner-list";
import ModalsPartners from "@/app/examples/modal";
import { getAllPartners } from "@/da/Partners/partner-da";
import { Partner } from "@/types/DbTypes";
import { useEffect, useState } from "react";

export default function Page() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getAllPartners();
            setPartners(data);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    
    return(
        <div className="flex flex-col w-full justify-center items-center">
            <PageTitle title="Partner's List" />
            <div className="w-[80%]">
                <div className="flex flex-row-reverse mb-5 ">
                    <ModalsPartners modalAddPartner={true}/>
                </div>
                <DataTable columns={columns} data={partners} />
            </div>
        </div>
    );
}