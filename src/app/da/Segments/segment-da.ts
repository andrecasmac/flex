"use server"
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

//Create segment
export async function createSegment(name:string, template:boolean){
    const segment = await prisma.segment.create({
        data: {
            name: name,
            EDI_Document: {},
            template: template,
            rules: {}
        }
    });
    return segment;
}

//Read all segments
export async function readAllSegments(){
    const segments = await prisma.segment.findMany();
    return segments;
};

//Read segment templates
export async function readAllSegmentsTemplates(template:boolean){
    const segments = await prisma.segment.findMany({
        where: {
            template: template
        }
    });
    return segments
}

//Update segment name
export async function updateSegmentName(id:string, name:string){
    const segment = await prisma.segment.update({
        where: {
            id:id
        },
        data: {
            name: name
        }
    });
    return segment;
}

//Update segment rules
export async function updateSegmentRule(id:string, rule:Prisma.JsonArray, _RuleId:string){
    const segment = await prisma.segment.update({
        where:{
            id:id
        },
        data:{
            rules: rule
        }
    });
    return segment;
}

//Delete segment by id
export async function deleteSegmentById(id:string){
    const deletedSegment = await prisma.segment.delete({
        where:{
            id:id
        }
    });
    return deletedSegment;
}