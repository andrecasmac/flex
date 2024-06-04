'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/page-title";

export default function Page() {
    const router =useRouter();

    return (
        
        <div className="flex flex-col justify-center items-center">
            <div className="flex gap-x-4">
                <PageTitle title="Document Configuration" />
            </div>
            <div>
            <Button onClick={()=>router.push("./segment-template")}>Add Segment</Button>
            </div>
        </div>
    );
}