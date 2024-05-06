import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-28">
      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl text-white active:scale-95 transition-all my-10"
      >
        <a href="/tables">Tablas</a>
      </Button>
    </main>
  );
}
