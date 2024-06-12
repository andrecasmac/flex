"use client";
import { useContext,useEffect,useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import ModalContext from "@/app/context/modalContext";
import { Button } from "@/components/ui/button";
import { columnsViewDocouments } from "@/app/client/columns";
import { PartnerShipsClientContent, ModalViewDocumentsContent } from "../../../types/TableTypes";
import { DataTable } from "../tables/table/data-table";
import { EDI_Document, Partner } from "@/types/DbTypes";
import { getEDIdocumentsByPartnerId } from "@/da/EDI-Documents/edi-document-da";
import { createPartnership } from "@/da/Partnerships/partnerships-da";
import { useSearchParams } from "next/navigation";

interface ModalViewDocumentsProps {
  ButtonContent: string;
  PartnerShipRowInfo: Partner;
}

export function ModalViewDocuments({
  ButtonContent,
  PartnerShipRowInfo
}: ModalViewDocumentsProps) {

  const searchParams = useSearchParams();
  const clientId = searchParams.get('id') as string;
  const [ediDocuments, setEdiDocuments] = useState<EDI_Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //Variable that is shared with Modal Add Partnership
  const {isThisOpen,setisThisOpen}=useContext(ModalContext)

  //Variable that defines if the ModalViewDocuments is open
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
      const fetchData = async () => {
      try {
          const data = await getEDIdocumentsByPartnerId(PartnerShipRowInfo.id);
          setEdiDocuments(data);
      } catch (err) {
          setError('Failed to fetch data');
      } finally {
          setLoading(false);
      }
      };

      fetchData();
  }, [PartnerShipRowInfo.id]);

  if (loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>{error}</p>;
  }

  const handleConnection = async (partnerId:string, clientId:string) => {
    try {
      const partnership = await createPartnership(partnerId, clientId);
      if(!partnership){
        throw new Error("Failed to create partnership");
      }
      return partnership;
    } catch(error) {
      console.log("Error creating connection: ", error);
      throw error;
    }
  }

  //Function that handles onClick of the Button 'Confirm'
  function handleConfirm(id:string){
    //It closes both Modal Add Partnerships and Modal View Documents
    handleConnection(PartnerShipRowInfo.id,id);
    setisThisOpen(false);
    setIsModalOpen(false);
  }
  return (

    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{ButtonContent} </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col sm:items-center sm:justify-center sm:max-w-[75%]">
        <DialogHeader className="flex sm:w-full sm:justify-center sm:items-center sm:text-center sm:text-white font-semibold">
          <DialogTitle className="">
            {/*This is where we display the name of the Partnership*/}
            {PartnerShipRowInfo ? <>{PartnerShipRowInfo.name}</> : null} EDI Files
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center pt-2">
          {/*This is where we display the EDI and Delimeters*/}
          EDI Version: {PartnerShipRowInfo ? <>{PartnerShipRowInfo.edi_version}</> : null} Delimeters(*,{'>'},~)
        </div>
        <div className="flex items-center w-[70%] justify-center pt-2">
          {/*This is where we display the Table with the Documents*/}
          <DataTable columns={columnsViewDocouments} data={ediDocuments} />
        </div>
        <DialogFooter className="flex items-center justify-center">
          <DialogClose asChild>
            {/*Button that closes this Modal*/}
            <Button size="lg" className="flex h-10">
              Cancel
            </Button>
          </DialogClose>
          {/*Button that closes both Modals*/}
          <Button onClick={()=>handleConfirm(clientId)} size="lg" className="flex h-10">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
