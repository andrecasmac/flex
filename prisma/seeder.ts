// import { Prisma } from "@prisma/client"
import * as edi_schema from "@/lib/855_schema.json"

export const client_seed = [{ //Client
            name: "Mario",
            partnerships: {
                create: { //associated_partner
                    partner: {
                        create: { //Partner
                            name: "Tec",
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
                                        data: edi_schema
                                    }
                                }
                            }
                        }
                    },
                    uploaded_documents: {}
                }
            }
        }
    ]