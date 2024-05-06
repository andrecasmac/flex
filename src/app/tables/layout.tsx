import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex justify-center w-screen mx-auto pt-20">
        {children}
      </main>
    </>
  );
}
