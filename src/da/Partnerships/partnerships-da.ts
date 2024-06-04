"use server"
import { document, PrismaClient,Prisma, Partner } from "@prisma/client";
import { error } from "console";
const prisma = new PrismaClient();

//Create partnership
export async function createPartnership(){
    try{
        const partnership = await prisma.associated_partner.create({
            data: {
                partner: {},
                uploaded_documents: {},
                client: {}
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
        const partnerships = await prisma.associated_partner.findMany({
            include: {
                partner: {
                    include: {
                        EDI_documents: {
                            include: {
                                structure: true,
                                partner: true
                            }
                        }
                    }
                },
                uploaded_documents: {
                    include: {
                        errors: true
                    }
                },
                client: true
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
        const partnership = await prisma.associated_partner.findUnique({
            where: {
                id:id
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
export async function updatePartnershipDocuments(id:string, document:document){
    try{
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
        const deletedPartnership = await prisma.associated_partner.delete({
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