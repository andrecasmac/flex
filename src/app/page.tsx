"use client"
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";

import Link from "next/link";

import { AdminIcon, ClientIcon } from "../assets/clientsIcons";


export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="h-[60%] w-[80%] max-md:h-[78%]">
        <Card className="bg-ligthBlue dark:bg-cyan-950 h-full flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 w-full justify-center gap-x-3 px-4 max-md:flex max-md:flex-col max-md:gap-y-4">
            <div className=" flex justify-center items-center">
              <Card className="p-3 flex flex-col justify-center items-center md:w-[65%] max-md:w-[80%] md:h-[90%] md:ms-[3em]">
                <p className="pb-3 text-turquoise">Admin</p>
                <AdminIcon />

                <div className="pt-4">
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="shadow-sm"
                  >
                    <a href="/admin">Select</a>
                  </Button>
                </div>
              </Card>
            </div>

            <div className=" flex justify-center items-center">
              <Card className="p-3 flex flex-col justify-center items-center md:w-[65%] max-md:w-[80%] md:h-[90%] md:me-[3em]">
                <p className="pb-3 text-turquoise">Client</p>

                <ClientIcon />

                <div className="pt-4">
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="shadow-sm"
                  >
                    <Link href={{pathname: "/client", query: {
                      id:"665136131277e5b9ce47e849"
                    }}}>Select</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
      <Button asChild variant="default" size="sm" className="shadow-sm">
          <a href="/examples">Components</a>
      </Button>
    </main>
  );
}
