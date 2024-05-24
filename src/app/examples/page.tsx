import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-4">
      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/tables">Tablas</a>
      </Button>
      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/toggle">Toggle</a>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/modal">Modal</a>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <Link href="/examples/mtags">Multiple Tags</Link>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/batches">Batches</a>
      </Button>
      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/dropdown">Dropdown</a>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/document-list">Document List</a>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/partner-list">Partner List</a>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/segment-config">Create Segment</a>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl active:scale-95 transition-all"
      >
        <a href="/examples/DA">Data Access</a>
      </Button>
    </div>
  );
}
