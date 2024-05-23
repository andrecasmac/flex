"use client"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pt-20">
      <Button
        asChild
        variant="default"
        size="lg"
        className="rounded-2xl text-white active:scale-95 transition-all"
      >
        <a href="/examples">Examples</a>
      </Button>
    </main>
  );
}
