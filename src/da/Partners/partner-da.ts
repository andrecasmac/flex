"use server"
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

//Create partner
export async function createPartner(name:string, edi_version:string, delimiters:string, EOL:string, type_of_connection:string, PO_Test:JSON){
    const partner = await prisma.partner.create({
        data: {
            name: name,
            edi_version: edi_version,
            delimiters: delimiters,
            EOL: EOL,
            type_of_connection: type_of_connection,
            PO_Test: JSON.stringify(PO_Test),
            partnerships: {}
        }
    });
    return partner;
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
        throw error; // Rethrow the error after logging it
      };
}

//Read partner by id
export async function getPartnerById(id:string){
    const partner = await prisma.partner.findUnique({
        where: {id: id}
    });
    return partner;
}

//Update partner's name
export async function updatePartner(id:string, name:string){
    const updatedPartner = await prisma.partner.update({
        where: {
            id:id
        },
        data: {
            name: name
        }
    });
    return updatedPartner;
}

//Delete partner by id
export async function deletePartner(id:string){
    const deletedPartner = await prisma.partner.delete({
        where: {
            id:id
        }
    });
    return deletedPartner;
}