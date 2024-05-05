import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex min-h-screen justify-center w-[100%] mx-auto pt-28">
      <div className="py-10 flex gap-x-4">
        <Button
          asChild
          variant="default"
          size="lg"
          className="rounded-2xl text-white active:scale-95 transition-all"
        >
          <a href="tables/table">Tabla normal</a>
        </Button>

        <Button
          asChild
          variant="default"
          size="lg"
          className="rounded-2xl text-white active:scale-95 transition-all"
        >
          <a href="tables/table-dnd">Tabla drag and drop</a>
        </Button>
      </div>
    </main>
  );
}
