export interface TagConfig {
    code: string;
}

export interface Segmento {
    id: string;
    codigo: string;
    dataType: string;
    minUso: string | undefined;
    uso: string;
    maxUso: string | undefined;
    config: TagConfig[]; // Update config to hold TagConfig objects
}

export interface Segment {
    id: string;
    name: string
    mandatory: boolean;
    max: number;
    template: boolean;
    segment_rules: {
        [rule_number: string]: {
            mandatory: boolean;
            min: number;
            max: number;
            type: "ID" | "AN" | "DT" | "TM" | "SE" | "N0";
            oneOf?: string[]
            isEqual?: string;
            hasFormat?: string;
        }
    }
}

export interface TagRule {
    code: string;
}

export interface ConfigRows {
    id:string
    oneOf?: string[]
    isEqual?: string;
    hasFormat?: string;
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
