import { PrismaClient } from '@prisma/client'
// import { client_seed } from './seeder'
// import * as edi_schema from '../src/lib/855_schema.json'
const prisma = new PrismaClient()

async function main() {
        await prisma.partner.create({
            data: {
                name: "Mario",
                edi_version: "X12",
                delimiters: "*",
                EOL: "~",
                type_of_connection: "FTP",
                PO_Test: "{}",
                hidden: true,
                EDI_documents: {
                    create: {
                        type: "EDI 855",
                        template: false,
                        mandatory: true,
                        structure: {
                            createMany: {
                                data: [
                                    {
                                        "name": "ISA",
                                        "mandatory": true,
                                        "max": 1,
                                        "template": false,
                                        "isLoop": false,
                                        "rules": {
                                            "1": {
                                                "mandatory": true,
                                                "min": 2,
                                                "max": 2,
                                                "type": "ID",
                                                "oneOf": [
                                                    "00"
                                                ]
                                            },
                                            "2": {
                                                "mandatory": true,
                                                "min": 10,
                                                "max": 10,
                                                "type": "AN"
                                            },
                                            "3": {
                                                "mandatory": true,
                                                "min": 2,
                                                "max": 2,
                                                "type": "ID",
                                                "oneOf": [
                                                    "00"
                                                ]
                                            },
                                            "4": {
                                                "mandatory": true,
                                                "min": 10,
                                                "max": 10,
                                                "type": "AN"
                                            },
                                            "5": {
                                                "mandatory": true,
                                                "min": 2,
                                                "max": 2,
                                                "type": "ID",
                                                "oneOf": [
                                                    "ZZ"
                                                ]
                                            },
                                            "6": {
                                                "mandatory": true,
                                                "min": 15,
                                                "max": 15,
                                                "type": "AN"
                                            },
                                            "7": {
                                                "mandatory": true,
                                                "min": 2,
                                                "max": 2,
                                                "type": "ID",
                                                "oneOf": [
                                                    "ZZ"
                                                ]
                                            },
                                            "8": {
                                                "mandatory": true,
                                                "min": 15,
                                                "max": 15,
                                                "type": "AN"
                                            },
                                            "9": {
                                                "mandatory": true,
                                                "min": 6,
                                                "max": 6,
                                                "type": "DT"
                                            },
                                            "10": {
                                                "mandatory": true,
                                                "min": 4,
                                                "max": 4,
                                                "type": "TM"
                                            },
                                            "11": {
                                                "mandatory": true,
                                                "min": 1,
                                                "max": 1,
                                                "type": "SE"
                                            },
                                            "12": {
                                                "mandatory": true,
                                                "min": 5,
                                                "max": 5,
                                                "type": "ID",
                                                "oneOf": [
                                                    "00400"
                                                ]
                                            },
                                            "13": {
                                                "mandatory": true,
                                                "min": 9,
                                                "max": 9,
                                                "type": "N0"
                                            },
                                            "14": {
                                                "mandatory": true,
                                                "min": 1,
                                                "max": 1,
                                                "type": "ID",
                                                "oneOf": [
                                                    "0"
                                                ]
                                            },
                                            "15": {
                                                "mandatory": true,
                                                "min": 1,
                                                "max": 1,
                                                "type": "ID",
                                                "oneOf": [
                                                    "P"
                                                ]
                                            },
                                            "16": {
                                                "mandatory": true,
                                                "min": 1,
                                                "max": 1,
                                                "type": "SE"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            include: {
                EDI_documents: {
                    include: {
                        structure: true
                    }
                }
            }
        })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})