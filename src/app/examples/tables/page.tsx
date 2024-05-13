import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex gap-x-4">
      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl text-white active:scale-95 transition-all"
      >
        <a href="/examples/tables/table">Tabla normal</a>
      </Button>

      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl text-white active:scale-95 transition-all"
      >
        <a href="/examples/tables/table-dnd">Tabla drag and drop</a>
      </Button>
    </div>
  );
}
