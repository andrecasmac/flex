import { boolean } from "zod";

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
        }
    }
]

export interface Segment {
    id: string;
    mandatory: boolean;
    max: number;
    template: boolean;
    segment_rules: {
        [rule_number: string]: {
            mandatory: boolean;
            min: number;
            max: number;
            type: "ID" | "AN" | "DT" | "TM" | "SE" | "N0";
            oneOf?: TagRule[];
            isEqual?: string;
            hasFormat?: string;
        }
    }
}

export const optionsType: IDropdown[] = [
    {
        id: "type",
        label: "ID",
    },
    {
        id: "type",
        label: "AN",
    },
    {
        id: "type",
        label: "DT",
    },
    {
        id: "type",
        label: "TM",
    },
    {
        id: "type",
        label: "SE",
    },
    {
        id: "type",
        label: "N0",
    },
];



export interface TagRule {
    code: string;
}



// interface SegmentRules {
//     rule: < ruleNumer, [],>
// }


export interface Segmento {
    id: string;
    codigo: string;
    dataType: string;
    minUso: string | undefined;
    uso: string;
    maxUso: string | undefined;
    config: TagRule[]; // Update config to hold TagConfig objects
}

export interface ConfigRows {
    // Interface for a dynamic tag row
    id: string; // Unique ID for each tag row
    tags: string[]; // Tags for this row
    config: string;
}

export interface IDropdown {
    id: string;
    label: string;
}

export const optionsUsage: IDropdown[] = [
    {
        id: "usage",
        label: "M",
    },
    {
        id: "usage",
        label: "O",
    },
    {
        id: "usage",
        label: "P",
    },
];

export const optionsConfig: IDropdown[] = [
    {
        id: "config",
        label: "is one of",
    },
    {
        id: "config",
        label: "has format",
    },
];

