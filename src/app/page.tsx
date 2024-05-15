import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { AdminIcon, ClientIcon } from "../assets/clientsIcons";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[70%] max-md:w-[90%] transition-all ">
        <Card className=" bg-ligthBlue dark:bg-cyan-950 h-[40em] max-md:h-[45em] flex flex-col justify-center">
          <div>
            <div className="flex md:justify-around max-md:flex-col max-md:items-center max-md:justify-center h-full  max-md:space-y-3">
              <Card className=" rounded-2xl w-[70%] md:w-[35%] md:ms-[2.5em]">
                <div className="flex flex-col justify-center items-center ">
                  <p className="py-3  text-turquoise">Administrator</p>
                  <AdminIcon />
                  <div className="pb-3 pt-4">
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="shadow-sm"
                    >
                      <a href="/admin">Select</a>
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl w-[70%] md:w-[35%] md:me-[2.5em]">
                <div className="flex flex-col justify-center items-center ">
                  <p className="py-3 text-turquoise">Client</p>
                  <ClientIcon />
                  <div className="pb-3 pt-4">
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="shadow-sm"
                    >
                      <a href="/client">Select</a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>

      {/* <div className="pt-1">
        <Button asChild variant="default" size="sm" className="shadow-sm">
          <a href="/examples">Components</a>
        </Button>
      </div> */}
    </main>
  );
}
