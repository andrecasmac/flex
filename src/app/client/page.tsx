'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router=useRouter();
  return (
    <div className="flex gap-x-4">
        <p>
        <Button onClick={() => router.push('/client/partnerships')}>Partnerships</Button>
        </p>
    </div>
  );
}
