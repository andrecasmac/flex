import { EDI_Document } from "./DbTypes"

export type SegmentTemplatesContent={
    name: string,
    max:number,
}

export type PartnerShipsClientContent={
    id:string,
    name:string,
    status:string,
    edi:string,
    connection:string,
}

export type ModalViewDocumentsContent={
    id:string,
    name:string,
    mandatory:string,
}

export type PartnerShipClientTableContent= EDI_Document & {
    status: string,
    partnershipId: string
}