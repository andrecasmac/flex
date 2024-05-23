"use server"
import { PrismaClient, Segment } from "@prisma/client";
const prisma = new PrismaClient();

//Create EDI-Document
export async function createEDIdocument(){
    const EDI_document = prisma.eDI_Document.create({
        data: {
            type: "810",
            partner: {}
        }
    });
    return EDI_document;
}

//Read all EDI-Documents
export async function getEDIdocuments(){
    const EDI_documents = prisma.eDI_Document.findMany();
    return EDI_documents;
}

//Read EDI-Document by ID
export async function getEDIdocumentsById(id: string){
    const EDI_document = prisma.eDI_Document.findUnique({
        where: {
            id: id
        }
    });
    return EDI_document;
}

//Read EDI-Document by partner_id
export async function getEDIdocumentsByPartnerId(Partner_id:string){
    const EDI_documents = prisma.eDI_Document.findMany({
        where: {
            partnerId: Partner_id
        }
    });
    return EDI_documents;
}

//Update EDI-Document type
export async function updateEDIdocumentType(id:string, type: string){
    const EDI_document = prisma.eDI_Document.update({
        where: {
            id:id
        },
        data: {
            type: type
        }
    })
    return EDI_document;
}

//Update EDI-document template
export async function updateEDIdocumentTemplate(id:string, template:boolean) {
    const EDI_document = prisma.eDI_Document.update({
        where: {
            id:id
        },
        data: {
            template: template
        }
    });
    return EDI_document;
}

//Delete EDI-Document by id
export async function deleteEDIdocument(id: string){
    const EDI_document = prisma.eDI_Document.delete({
        where: {
            id: id
        }
    });
    return EDI_document;
}