import { Istok_Web } from "next/font/google";

const IstokWeb = Istok_Web({ subsets: ["latin"], weight: "400" });

interface PropsTitle {
  title: string;
}

export function PageTitle({ title }: PropsTitle) {
  return (
    <>
      <div
        className={`flex justify-start w-[80%] border-b border-turquoise dark:border-darkTurquoise pb-4 mb-10 ${IstokWeb.className}`}
      >
        <h1 className="text-6xl">{title}</h1>
      </div>
    </>
  );
}
