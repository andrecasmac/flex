import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex gap-x-4">
      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <Link href="/examples/tables/table">Tabla normal</Link>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <Link href="/examples/tables/table-dnd">Tabla drag and drop</Link>
      </Button>
    </div>
  );
}
