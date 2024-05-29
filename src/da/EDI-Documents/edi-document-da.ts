"use server"
import { PrismaClient, Segment } from "@prisma/client";
const prisma = new PrismaClient();

//Create EDI-Document
export async function createEDIdocument(type: string, template: boolean){
    try{
        const EDI_document = prisma.eDI_Document.create({
            data: {
                type: type,
                partner: {},
                template: template
            }
        });
        if(!EDI_document){
            throw new Error("Failed to create EDI_Document");
        }
        return EDI_document;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//Read all EDI-Documents
export async function getEDIdocuments(){
    try{
        const EDI_documents = prisma.eDI_Document.findMany();
        if(!EDI_documents){
            throw new Error("Failed to fetch EDI_Documents");
        }
        return EDI_documents;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//Read EDI-Document by ID
export async function getEDIdocumentsById(id: string){
    try {
        const EDI_document = prisma.eDI_Document.findUnique({
            where: {
                id: id
            }
        });
        if(!EDI_document){
            throw new Error("Failed to fetch EDI_Document");
        }
        return EDI_document;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//Read EDI-Document by partner_id
export async function getEDIdocumentsByPartnerId(Partner_id:string){
    try{
        const EDI_documents = prisma.eDI_Document.findMany({
            where: {
                partnerId: Partner_id
            }
        });
        if(!EDI_documents){
            throw new Error("Failed to fetch EDI_Documents");
        }
        return EDI_documents;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//Update EDI-Document type
export async function updateEDIdocumentType(id:string, type: string){
    try{
        const EDI_document = prisma.eDI_Document.update({
            where: {
                id:id
            },
            data: {
                type: type
            }
        })
        if(!EDI_document){
            throw new Error("Failed to update EDI_Document");
        }
        return EDI_document;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//Update EDI-document template
export async function updateEDIdocumentTemplate(id:string, template:boolean) {
    try{
        const EDI_document = prisma.eDI_Document.update({
            where: {
                id:id
            },
            data: {
                template: template
            }
        });
        if(!EDI_document){
            throw new Error("Failed to update EDI_Document");
        }
        return EDI_document;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

//Delete EDI-Document by id
export async function deleteEDIdocument(id: string){
    try{
        const EDI_document = prisma.eDI_Document.delete({
            where: {
                id: id
            }
        });
        if(!EDI_document){
            throw new Error("Failed to delete EDI_Document");
        }
        return EDI_document;
    } catch(error) {
        console.log(error);
        throw error;
    }
}