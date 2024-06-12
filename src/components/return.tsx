"use client"
import { Button } from "./ui/button";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Return() {
    const router=useRouter();
    return(
        <Button onClick={(()=>router.back())}>
            <Undo2 />
        </Button>
    )
}

