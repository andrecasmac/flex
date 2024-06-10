"use client";
import { useContext,useState } from "react";
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
import { Partner } from "@/types/DbTypes";

interface ModalViewDocuments {
  ButtonContent: string;
  PartnerShipRowInfo: Partner;
}
//Local Data
const data: ModalViewDocumentsContent[] = [
  {
    id: '1',
    name: 'EDI 850 Purchase Order',
    mandatory: '',
  },
  {
    id: '2',
    name: 'EDI 860 Purchase Order Change Request',
    mandatory: 'Optional',
  },
  {
    id: '3',
    name: 'EDI 855 Purchase Order Acknowledgment',
    mandatory: 'Mandatory',
  },
  {
    id: '4',
    name: 'EDI 856 Ship Notice/Manifest',
    mandatory: 'Mandatory',
  },
  {
    id: '5',
    name: 'EDI 810 Invoice',
    mandatory: 'Mandatory',
  },
  {
    id: '6',
    name: 'EDI 820 Payment Order/Remittance Advice',
    mandatory: 'Optional',
  },

]



export function ModalViewDocuments({
  ButtonContent,
  PartnerShipRowInfo,
}: ModalViewDocuments) {
  //Variable that is shared with Modal Add Partnership
  const {isThisOpen,setisThisOpen}=useContext(ModalContext)

  //Variable that defines if the ModalViewDocuments is open
  const [isModalOpen, setIsModalOpen] = useState(false)

  //Function that handles onClick of the Button 'Confirm'
  function handleConfirm(){
    //It closes both Modal Add Partnerships and Modal View Documents
    setisThisOpen(false)
    setIsModalOpen(false)
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
          <DataTable columns={columnsViewDocouments} data={data} />
        </div>
        <DialogFooter className="flex items-center justify-center">
          <DialogClose asChild>
            {/*Button that closes this Modal*/}
            <Button size="lg" className="flex h-10">
              Cancel
            </Button>
          </DialogClose>
          {/*Button that closes both Modals*/}
          <Button onClick={()=>handleConfirm()} size="lg" className="flex h-10">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
