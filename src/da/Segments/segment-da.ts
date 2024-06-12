"use server"
import { PrismaClient, Prisma } from "@prisma/client";
import { tree } from "next/dist/build/templates/app-page";
const prisma = new PrismaClient();

//Create segment
export async function createSegment(name: string, template: boolean, max: number, mandatory: boolean, isLoop: boolean, EDI_Id: string, rules: Prisma.JsonObject) {
    try {
        const segment = await prisma.segment.create({
            data: {
                name: name,
                EDI_Document: {
                    connect: {
                        id: EDI_Id,
                    }
                },
                max: max,
                mandatory: mandatory,
                template: template,
                rules: {},
                isLoop: isLoop
            }
        });
        if (!segment) {
            throw new Error("Failed to create segment");
        }
        return segment;
    } catch (error) {
        console.log("Error creating segment: ", error);
        throw error;
    }
}

//Read all segments
export async function readAllSegments() {
    try {
        const segments = await prisma.segment.findMany();
        if (!segments) {
            throw new Error("Failed to fetch segments");
        }
        return segments;
    } catch (error) {
        console.log("Error fetching segments: ", error);
        throw error;
    }
};

//Read segment templates
export async function getAllSegmentsTemplates(template:boolean){
    try{
        const segments = await prisma.segment.findMany({
            where: {
                template: template
            }
        });
        if(!segments){
            throw new Error("Failed to fetch segments");
        }
        return segments
    } catch(error) {
        console.log("Error fetching segments: ", error);
        throw error;
    }
}

//Update segment name
export async function updateSegmentName(id: string, name: string) {
    try {
        const segment = await prisma.segment.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });
        if (!segment) {
            throw new Error("Failed to update segment");
        }
        return segment;
    } catch (error) {
        console.log("Error updating segment: ", error);
        throw error;
    }
}

//Update segment rules
export async function updateSegmentRule(id: string, rule: Prisma.JsonObject) {
    try {
        const segment = await prisma.segment.update({
            where: {
                id: id
            },
            data: {
                rules: rule
            }
        });
        if (!segment) {
            throw new Error("Failed to update segment");
        }
        return segment;
    } catch (error) {
        console.log("Error updating segment: ", error);
    }
}


// read segment by id
export async function readSegmentByEDIDocumentId(EDI_Id: string) {
    try {
        const findSegment = await prisma.segment.findMany({
            where: {
                EDI_DocumentId: EDI_Id
            },
            select: {
                id: true,
                name: true,
            }
        });

        if (!findSegment) {
            throw new Error("Failed to read segment");
        }
        return findSegment;
    } catch (error) {
        console.log("Error reading segment: ", error);
        throw error;
    }
}


export async function readSegmentById(id: string) {
    try {
        const findSegment = await prisma.segment.findUnique({
            where: {
                id: id
            }
        });
        if (!findSegment) {
            throw new Error("Failed to read segment");
        }
        return findSegment;
    } catch (error) {
        console.log("Error reading segment: ", error);
        throw error;
    }
}


//Delete segment by id
export async function deleteSegmentById(id: string) {
    try {
        const deletedSegment = await prisma.segment.delete({
            where: {
                id: id
            }
        });
        if (!deletedSegment) {
            throw new Error("Failed to delete segment");
        }
        return deletedSegment;
    } catch (error) {
        console.log("Error deleting segment: ", error);
        throw error;
    }
}

// read segment by id
// export async function readSegmentByEDIDocumentIdAddData(EDI_Id: string) {
//     try {
//         const findSegment = await prisma.segment.findMany({
//             where: {
//                 EDI_DocumentId: EDI_Id
//             },
//         });
//         if (!findSegment || findSegment.length === 0) {
//             throw new Error("No segments found");
//         }
//         return findSegment;
//     } catch (error) {
//         console.log("Error reading segment: ", error);
//         throw error;
//     }
// }