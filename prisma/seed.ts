import { Clients } from './Clients'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const result = await prisma.client.create({
        data: { //Client
            name: "TP-LINK",
            partnerships: {
                create: { //associated_partner
                    partner: {
                        create: { //Partner
                            name: "AMAZON",
                            edi_version: "X12",
                            delimiters: "*",
                            EOL: "~",
                            type_of_connection: "FTP",
                            PO_Test: {},
                            EDI_documents: {
                                create: { //EDI_document
                                    type: "855",
                                    template: false,
                                    structure: {
                                        create: { //segment
                                            name: "ISA",
                                            template: false,
                                            rules: {
                                                        "1": { 
                                                                mandatory: "M",
                                                                min: 2,
                                                                max: 2,
                                                                type: "Int"
                                                        },      
                                                        "2":{ 
                                                                mandatory: "M",
                                                                min: 10,
                                                                max: 10,
                                                                type: "String"
                                                        }, 
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    uploaded_documents: {
                        create: { //document
                            type: "855",
                            json_document: {},
                            errors: { 
                                create: { //error
                                    code: "EMISA1",
                                    message: "Missing ISA01"
                                }
                            }
                        }
                    }
                }
            }
        },
        include: {
            partnerships: {
                include: {
                    partner: {
                        include: {
                            EDI_documents: {
                                include: {
                                    structure: true
                                },
                            },
                        },
                    },
                    uploaded_documents: {
                        include: {
                            errors: true,
                        },
                    },
                },
            },
        },
    })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})