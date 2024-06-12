import { Istok_Web } from "next/font/google";
import Return from "./return";

const IstokWeb = Istok_Web({ subsets: ["latin"], weight: "400" });

interface PropsTitle {
  title: string;
}

export function PageTitle({ title }: PropsTitle) {
  return (
    <>
      <div
        className={`flex justify-between w-[80%] border-b border-turquoise dark:border-darkTurquoise pb-4 mb-10 ${IstokWeb.className}`}
      >
        <h1 className="text-[3rem]">{title}</h1>
        <div className="flex pt-3">
          <Return />
        </div>
      </div>
    </>
  );
}
