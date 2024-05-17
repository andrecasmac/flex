

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex flex-col items-center w-screen mx-auto pt-32">
        {children}
      </main>
    </>
  );
}
