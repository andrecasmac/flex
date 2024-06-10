"use server"
import { EDI_Document } from "@/types/DbTypes";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

//Create partner
export async function createPartner(name:string, edi_version:string, delimiters:string, EOL:string, type_of_connection:string, PO_Test:JSON, hidden: boolean){
    try{
        const partner = await prisma.partner.create({
            data: {
                name: name,
                edi_version: edi_version,
                delimiters: delimiters,
                EOL: EOL,
                type_of_connection: type_of_connection,
                PO_Test: JSON.stringify(PO_Test),
                hidden: hidden
            }
        });
        if(!partner){
            throw new Error("Failed to create partner");
        }
        return partner;
    } catch(error) {
        console.log("Error creating partner: ", error);
        throw error;
    }
}

//Read all partners
export async function getAllPartners(){
    try {
        const partners = await prisma.partner.findMany({
          include: {
            EDI_documents: {
                include: {
                    structure: true
                }
            }
          }
        });
        if (!partners) {
          throw new Error("Failed to fetch data");
        }
        return partners;
      } catch (error) {
        console.error('Error fetching clients:', error);
        throw error; 
      };
}

//Read all partners
export async function getAllPartnersAvailable(){
    try {
        const partners = await prisma.partner.findMany({
            where:{
                hidden: true
            },
            include: {
                EDI_documents: {
                    include: {
                        structure: true
                    }
                }
            }
        });
        if (!partners) {
          throw new Error("Failed to fetch data");
        }
        return partners;
      } catch (error) {
        console.error('Error fetching clients:', error);
        throw error; 
      };
}

//Read partner by id
export async function getPartnerById(id:string){
    try{
        const partner = await prisma.partner.findUnique({
            where: {id: id},
            include: {
                EDI_documents: {
                    include: {
                        structure: true
                    }
                }
              }
        });
        if(!partner){
            throw new Error("Failed to fetch partner");
        }
        return partner;
    } catch(error) {
        console.log("Error fetching partner: ", error);
        throw error;
    }
}

//Update partner's name
export async function updatePartner(id:string, name:string){
    try{
        const updatedPartner = await prisma.partner.update({
            where: {
                id:id
            },
            data: {
                name: name
            }
        });
        if(!updatedPartner){
            throw new Error("Failed to update partner");
        }
        return updatedPartner;
    } catch(error) {
        console.log("Error updating partner's name: ",error);
        throw error;
    }
}

//Create or connect edi document
export async function updatePartnerDocuments(id:string, EdiDocument: any){
    try {
        const updatedPartner = await prisma.partner.update({
            where: {
                id: id
            },
            data: {
                EDI_documents: {
                    create: {
                        type: EdiDocument.type,
                        template: false,
                        mandatory: EdiDocument.mandatory,
                        structure: EdiDocument.structure?.length > 0 ? {
                            create: EdiDocument.structure.map((segment: { name: any; mandatory: any; max: any; template: any; rules: any; }) => ({
                                name: segment.name,
                                mandatory: segment.mandatory,
                                max: segment.max,
                                template: segment.template,
                                rules: segment.rules
                            }))
                        } : {},
                    }
                }
            },
            include: {
                EDI_documents: {
                    include: {
                        structure: true
                    }
                }
            }
        })
        if(!updatedPartner){
            throw new Error("Failed to add edi document");
        }
    } catch(error) {
        console.log("Error adding EDI_Document: ", error);
        throw error;
    }
}

//Delete partner by id
export async function deletePartner(id:string){
    try{
        const deletedPartner = await prisma.partner.delete({
            where: {
                id:id
            }
        });
        if(!deletedPartner){
            throw new Error("Failed to delete partner");
        }
        return deletedPartner;
    } catch(error) {
        console.log("Error deleting partner: ",error);
        throw error;
    }
}