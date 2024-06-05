"use server"
import { cornersOfRectangle } from "@dnd-kit/core/dist/utilities/algorithms/helpers";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

//Create segment
export async function createSegment(name:string, template:boolean, max:number, mandatory:string){
    try{
        const segment = await prisma.segment.create({
            data: {
                name: name,
                EDI_Document: {},
                max: max,
                mandatory: mandatory,
                template: template,
                rules: {}
            }
        });
        if(!segment){
            throw new Error("Failed to create segment");
        }
        return segment;
    } catch(error) {
        console.log("Error creating segment: ", error);
        throw error;
    }

}

//Read all segments
export async function readAllSegments(){
    try{
        const segments = await prisma.segment.findMany();
        if(!segments){
            throw new Error("Failed to fetch segments");
        }
        return segments;
    } catch(error) {
        console.log("Error fetching segments: ", error);
        throw error;
    }
};

//Read segment templates
export async function readAllSegmentsTemplates(template:boolean){
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
export async function updateSegmentName(id:string, name:string){
    try {
        const segment = await prisma.segment.update({
            where: {
                id:id
            },
            data: {
                name: name
            }
        });
        if(!segment){
            throw new Error("Failed to update segment");
        }
        return segment;
    } catch(error) {
        console.log("Error updating segment: ", error);
        throw error;
    }   
}

//Update segment rules
export async function updateSegmentRule(id:string, rule:Prisma.JsonObject){
    try{
        const segment = await prisma.segment.update({
            where:{
                id:id
            },
            data:{
                rules: rule
            }
        });
        if(!segment){
            throw new Error("Failed to update segment");
        }
        return segment;
    } catch(error) {
        console.log("Error updating segment: ", error);
    }
}

//Delete segment by id
export async function deleteSegmentById(id:string){
    try{
        const deletedSegment = await prisma.segment.delete({
            where:{
                id:id
            }
        });
        if(!deletedSegment){
            throw new Error("Failed to delete segment");
        }
        return deletedSegment;
    } catch(error) {
        console.log("Error deleting segment: ", error);
        throw error;
    }
}