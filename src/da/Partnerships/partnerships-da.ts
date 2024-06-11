"use server"
import { document, PrismaClient,Prisma, Partner, error } from "@prisma/client";
const prisma = new PrismaClient();

//Create partnership
export async function createPartnership(partnerId:string, clientId: string){
    try{
        const partnership = await prisma.partnership.create({
            data: {
                partnerId: partnerId,
                clientId: clientId,
                uploaded_documents: {}
            }
        })
        if(!partnership){
            throw new Error("Failed to create partnership")
        }
        return partnership;
    } catch(error) {
        console.log("Error creating partnership: ",error);
        throw error;
    }
}

//Read partnerships
export async function getAllPartnerships(){
    try{
        const partnerships = await prisma.partnership.findMany({
            include: {
                uploaded_documents: {
                    include: {
                        errors: true
                    }
                }
            }
        });
        if(!partnerships){
            throw new Error("Failed to fetch partnerships");
        }
        return partnerships;
    } catch(error) {
        console.log("Error fetching partnerships: ",error);
        throw error;
    }
}

//Read partnership by Id
export async function getPartnershipById(id:string){
    try{
        const partnership = await prisma.partnership.findUnique({
            where: {
                id:id
            }, 
            include: {
                uploaded_documents: {
                    include: {
                        errors: true
                    }
                },
                partner: {
                    include: {
                        EDI_documents:{
                            include: {
                                structure: true
                            }
                        }
                    }
                }
            }
        });
        if(!partnership){
            throw new Error("Failed to fetch partnership");
        }
        return partnership;
    } catch(error) {
        console.log("Error fetching partnership: ",error);
        throw error;
    }
}

//Update partnership uploaded documents
export async function updatePartnershipDocuments(id:string, document:document, errors:error){
    try{
        const uploadedPartner = await prisma.partnership.update({
            where: {
                id:id
            },
            data: {
                uploaded_documents: {
                    create: {
                        type: document.type,
                        json_document: document.json_document,
                        errors: {
                            createMany: {
                                data: errors
                            }
                        }
                    }
                },
            },
            include: {
                uploaded_documents: true
            }
        })
        if(!uploadedPartner){
            throw new Error("Failed to update partnership document");
        }
        return uploadedPartner;
    } catch(error) {
        console.log("Error updating partnership document: ", error);
        throw error;
    }
}

//Delete partnership
export async function deletePartnership(id:string){
    try{
        const deletedPartnership = await prisma.partner.delete({
            where: {
                id:id
            }
        })
        if(!deletedPartnership){
            throw new Error("Failed to delete partnership");
        }
        return deletedPartnership;
    } catch(error){
        console.log("Error deleting partnership: ", error);
        throw error;
    }
}