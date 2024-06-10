"use client";
import { useContext } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../tables/table/data-table";
import { columnsModal } from "@/app/client/columns";
import ModalContext from "@/app/context/modalContext";
import { PartnerShipsClientContent } from "../../../types/TableTypes";
import { Partner } from "@/types/DbTypes";
import { useEffect, useState } from "react";
import { getAllPartnersAvailable } from "@/da/Partners/partner-da";

interface ModalAddPartnerships {
  ButtonContent: string;
  clientId: string;
}

export function ModalAddPartnerships({
  ButtonContent,
  clientId
}: ModalAddPartnerships) {

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //Variable that is shared with Modal View Documents
  const { isThisOpen, setisThisOpen } = useContext(ModalContext)

  useEffect(() => {
      const fetchData = async () => {
      try {
          const data = await getAllPartnersAvailable();
          setPartners(data);
      } catch (err) {
          setError('Failed to fetch data');
      } finally {
          setLoading(false);
      }
      };

      fetchData();
  }, []);

  if (loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>{error}</p>;
  }

  return (
    <Dialog open={isThisOpen} onOpenChange={setisThisOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} <Plus strokeWidth={1.5} /></Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:items-center sm:justify-center sm:max-w-[75%]">
        <DialogHeader className="flex sm:w-full sm:justify-center sm:items-center sm:text-center sm:text-white font-semibold">
          <DialogTitle className="">
            Add Partnership
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center pt-5 w-[85%]">
          {/*This is where we display the Table with the partners*/}
          <DataTable columns={columnsModal} data={partners} />
        </div>

        <DialogFooter className="felx items-center justify-center">
          <DialogClose asChild>
            {/*Button that closes this Modal*/}
            <Button size="lg" className="h-10">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
