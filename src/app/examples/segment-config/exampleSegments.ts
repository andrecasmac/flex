export const example = [
    {
        "name": "ISA",
        "mandatory": true,
        "max": 1,
        "template": false,
        "segment_rules": {
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
                //"isEqual": "AMAZON         "
            },
            "9": {
                "mandatory": true,
                "min": 6,
                "max": 6,
                "type": "DT",
                //"hasFormat": "YYMMDD"
            },
            "10": {
                "mandatory": true,
                "min": 4,
                "max": 4,
                "type": "TM",
                //"hasFormat": "HHMM"
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
                "type": "SE",
                //"isEqual": ">"
            }
        }
    },
    {
        "name": "GS",
        "mandatory": true,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": true,
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "PR"
                ]
            },
            "2": {
                "mandatory": true,
                "min": 2,
                "max": 15,
                "type": "AN"
            },
            "3": {
                "mandatory": true,
                "min": 2,
                "max": 15,
                "type": "AN",
                //"isEqual": "AMAZON"
            },
            "4": {
                "mandatory": true,
                "min": 8,
                "max": 8,
                "type": "DT",
                //"hasFormat": "CCYYMMDD"
            },
            "5": {
                "mandatory": true,
                "min": 4,
                "max": 8,
                "type": "TM",
                //"hasFormat": "HHMM"
            },
            "6": {
                "mandatory": true,
                "min": 1,
                "max": 9,
                "type": "N0"
            },
            "7": {
                "mandatory": true,
                "min": 1,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "X"
                ]
            },
            "8": {
                "mandatory": true,
                "min": 1,
                "max": 12,
                "type": "AN",
                "oneOf": [
                    "004010"
                ]
            }
        }
    },
    {
        "name": "ST",
        "mandatory": true,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": true,
                "min": 3,
                "max": 3,
                "type": "ID",
                "oneOf": [
                    "855"
                ]
            },
            "2": {
                "mandatory": true,
                "min": 4,
                "max": 9,
                "type": "AN"
            }
        }
    },
    {
        "name": "BAK",
        "mandatory": true,
        "max": 1,
        "segment_rules": {
            "1": {
                "mandatory": false,
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "00"
                ]
            },
            "2": {
                "mandatory": true,
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "AC",
                    "AD",
                    "ZZ"
                ]
            },
            "3": {
                "mandatory": true,
                "min": 2,
                "max": 22,
                "type": "AN"
                //"isEqual": "" -- ??? -- PO number
            },
            "4": {
                "mandatory": true,
                "min": 8,
                "max": 8,
                "type": "DT",
                //"hasFormat": "CCYYMMDD"
            }
        }
    },
    // LOOP PENDIENTE
    {
        "name": "PO1",
        "mandatory": true,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": false,
                "min": 1,
                "max": 20,
                "type": "AN"
            },
            "2": {
                "mandatory": true,
                "min": 1,
                "max": 15,
                "type": "R"
                //"isEqual": "" -- ?? -- Quantity of item in PO
            },
            "3": {
                "mandatory": true,
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "CA",
                    "EA",
                    "UN"
                ]
            },
            "4": {
                "mandatory": true,
                "min": 1,
                "max": 17,
                "type": "R",
                //"isPositive": true  || "isHigherThan": 0
            },
            "5": {
                "mandatory": true,
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "NT"
                ]
            },
            "6": {
                "mandatory": true,
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "BP",
                    "EA",
                    "EN",
                    "IB",
                    "MG",
                    "UA",
                    "UK",
                    "UP",
                    "VN",
                    "VP"
                ]
            },
            "7": {
                "mandatory": true,
                "min": 1,
                "max": 48,
                "type": "AN"
            }
        }
    },
    {
        "name": "CTP",
        "mandatory": false,
        "max": 1, // ??????????????????????????
        "template": false,
        "segment_rules": {
            /*  "1": {
                "mandatory": false,
                "min": 0,
                "max": 0,
            }, */
            "1": {
                "mandatory": true,
                "min": 3,
                "max": 3,
                "type": "ID",
                "oneOf": [
                    "DPR",
                    "LPR",
                    "NET",
                    "SLP"
                ]
            },
            "2": {
                "mandatory": true,
                "min": 1,
                "max": 17,
                "type": "R"
            },
            "3": {
                "mandatory": true,
                "min": 1,
                "max": 15,
                "type": "R"
            },
            "4": {
                "mandatory": true,
                //"type": "Comp", --- ?????????????
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "CA",
                    "EA",
                    "UN"
                ]
            },
            "5": {
                "mandatory": true,
                "min": 3,
                "max": 3,
                "type": "ID",
                "oneOf": [
                    "DIS"
                ]
            },
            "6": {
                "mandatory": true,
                "min": 1,
                "max": 10,
                "type": "R"
            }
        }
    },
    // LOOP PENDIENTE
    {
        "name": "ACK",
        "mandatory": true,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": true,
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "BP",
                    "IA",
                    "IB",
                    "IQ",
                    "IR",
                    "R2",
                    "R3"
                ]
            },
            "2": {
                "mandatory": true,
                "min": 1,
                "max": 15,
                "type": "R"
                //"isPositive": true  || "isHigherThan": 0
            },
            "3": {
                "mandatory": true,
                "min": 2,
                "max": 2,
                "type": "ID",
                "oneOf": [
                    "CA",
                    "EA",
                    "UN"
                ]
            },
            "4": {
                "mandatory": false,
                "min": 3,
                "max": 3,
                "type": "ID",
                "oneOf": [
                    "068"
                ]
            },
            "5": {
                "mandatory": false,
                "min": 8,
                "max": 8,
                "type": "DT",
                //"hasFormat": "CCYYMMDD"
            }
        }
    },
    {
        "name": "DTM",
        "mandatory": false,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": true,
                "min": 3,
                "max": 3,
                "type": "ID",
                "oneOf": [
                    "067"
                ]
            },
            "2": {
                "mandatory": true,
                "min": 8,
                "max": 8,
                "type": "DT",
                //"hasFormat": "CCYYMMDD"
            }
        }
    },
    // LOOP PENDIENTE
    {
        "name": "CTT",
        "mandatory": false,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": false,
                "min": 1,
                "max": 6,
                "type": "N0"
                //"isPositive": true  || "isHigherThan": 0
            },
            "2": {
                "mandatory": false,
                "min": 1,
                "max": 10,
                "type": "R",
                //"isSumOf": "" -- ?? -- Quantities of each PO1 segment
            }
        }
    },
    {
        "name": "SE",
        "mandatory": true,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": true,
                "min": 1,
                "max": 10,
                "type": "N0"
            },
            "2": {
                "mandatory": true,
                "min": 4,
                "max": 9,
                "type": "AN"
            }
        }
    },
    {
        "name": "GE",
        "mandatory": true,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": true,
                "min": 1,
                "max": 6,
                "type": "N0"
            },
            "2": {
                "mandatory": true,
                "min": 1,
                "max": 9,
                "type": "N0"
                //"isEqual": "" -- ?? -- data element GS06
            }
        }
    },
    {
        "name": "IEA",
        "mandatory": true,
        "max": 1,
        "template": false,
        "segment_rules": {
            "1": {
                "mandatory": true,
                "min": 1,
                "max": 5,
                "type": "N0"
            },
            "2": {
                "mandatory": true,
                "min": 9,
                "max": 9,
                "type": "N0"
            }
        }
    },
]