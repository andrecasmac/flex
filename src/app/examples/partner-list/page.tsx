"use client"
import { PageTitle } from "@/components/page-title";
import { promises as fs } from 'fs';
import { Button } from "@/components/ui/button";
import { columns } from "./colums";
import { DataTable } from "./data-table-partner-list";
import { getAllPartners } from "@/da/Partners/partner-da";
import { Partner } from "../../../../types/DbTypes";
import ModalsPartners from ".";
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
        <>
            <PageTitle title="Partner's List" />
            <div className="w-[80%]">
                <div className="flex flex-row-reverse mb-5 gap-5">
                    <ModalsPartners modalAddPartner={true} />
                </div>
                <DataTable columns={columns} data={partners} />
            </div>
        </>
    );
}