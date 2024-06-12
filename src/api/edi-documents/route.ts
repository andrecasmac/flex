import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const segmentUpdateData = await request.json();

    try {
        const updatedDocument = await prisma.eDI_Document.update({
            where: { id: params.id },
            data: segmentUpdateData,
        });

        return NextResponse.json(updatedDocument);
    } catch (error) {
        console.error("Error updating EDI document:", error);
        return NextResponse.json({ error: "Failed to update EDI document" }, { status: 500 });
    }
}
