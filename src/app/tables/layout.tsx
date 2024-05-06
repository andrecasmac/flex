import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen justify-center w-[100%] mx-auto pt-28">
      {children}
    </main>
  );
}
