export const Clients = [
    { //Client
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
                                            create: [ //rules
                                                {
                                                    code: "ISA01",
                                                    validation: {
                                                        create: { //validation
                                                            mandatory: "M",
                                                            min: 2,
                                                            max: 2,
                                                            type: "Int"
                                                        }
                                                    }
                                                },
                                                {
                                                    code: "ISA02",
                                                    validation: {
                                                        create: { //validation
                                                            mandatory: "M",
                                                            min: 10,
                                                            max: 10,
                                                            type: "String"
                                                        }
                                                    }
                                                }
                                            ]
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
    }
]