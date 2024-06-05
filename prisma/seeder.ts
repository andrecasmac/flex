import { Prisma } from "@prisma/client"

const json_rules = {
    '1': { 
            mandatory: 'M',
            min: 2,
            max: 2,
            type: 'Int'
    },      
    '2':{ 
            mandatory: 'M',
            min: 10,
            max: 10,
            type: 'String'
    }, 
} as Prisma.JsonObject

export const client_seed = [{ //Client
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
                                            mandatory: "M",
                                            max: 1,
                                            rules: json_rules
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
        { //Client
            name: "MOPAR",
            partnerships: {
                create: { //associated_partner
                    partner: {
                        create: { //Partner
                            name: "AUTOZONE",
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
                                            mandatory: "M",
                                            max: 1,
                                            rules: json_rules
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
        }
    ]