'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PageTitle } from "@/components/page-title";
import Link from "next/link";
export default function Page() {
    const router = useRouter();

    return (

        <div className="flex flex-col justify-center items-center">
            <div className="flex gap-x-4">
                <PageTitle title="Document Configuration" />
            </div>
            <div>
                <Link href={"./segment-template/"}>
                    <Button>Add Segment</Button>
                </Link>
            </div>
        </div>
    );
}