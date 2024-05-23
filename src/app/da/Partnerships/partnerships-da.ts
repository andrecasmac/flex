"use server"
import { document, PrismaClient,Prisma } from "@prisma/client";
const prisma = new PrismaClient();

//Create partnership
export async function createPartnership(){
    const partnership = await prisma.associated_partner.create({
        data: {
            partner: {},
            uploaded_documents: {},
            client: {}
        }
    })
    return partnership;
}

//Read partnership
export async function getAllPartnerships(){
    const partnerships = await prisma.associated_partner.findMany();
    return partnerships;
}

//Read partnership by Id
export async function getPartnershipById(id:string){
    const partnership = await prisma.associated_partner.findUnique({
        where: {
            id:id
        }
    });
    return partnership;
}

//Update partnership uploaded documents
export async function updatePartnershipDocuments(id:string, document:document){
    const uploadedPartner = await prisma.associated_partner.update({
        where: {
            id:id
        },
        data: {
            uploaded_documents: {
                create: {
                    type: document.type,
                    json_document: document.json_document as Prisma.JsonObject,
                }
            },
        },
        include: {
            uploaded_documents: true
        }
    })
    return uploadedPartner;
}

//Delete partnership
export async function deletePartnership(id:string){
    const deletedPartnership = await prisma.associated_partner.delete({
        where: {
            id:id
        }
    })
    return deletedPartnership;
}