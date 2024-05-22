
export interface Segment {
    id: string;
    name: string;
    mandatory: boolean;
    max: number;
    template: boolean;
    segment_rules: {
        [rule_number: string]: {
            mandatory: boolean;
            min: number | null;
            max: number | null;
            type: "ID" | "AN" | "DT" | "TM" | "SE" | "N0";
            oneOf?: string[];
            isEqual?: string;
            hasFormat?: string;
        };
    };
}

export interface ConfigRows {
    id: string;
    oneOf?: string[];
    isEqual?: string;
    hasFormat?: string;
}

export interface IDropdown {
    id: string;
    label: string;
}

export const optionsUsage: IDropdown[] = [
    {
        id: "usage1",
        label: "M",
    },
    {
        id: "usage2",
        label: "O",
    },
];

export const optionsConfig: IDropdown[] = [
    {
        id: "config1",
        label: "is one of",
    },
    {
        id: "config2",
        label: "has format",
    },
];

export const optionsType: IDropdown[] = [
    {
        id: "type1",
        label: "ID",
    },
    {
        id: "type2",
        label: "AN",
    },
    {
        id: "type3",
        label: "DT",
    },
    {
        id: "type4",
        label: "TM",
    },
    {
        id: "type5",
        label: "SE",
    },
    {
        id: "type6",
        label: "N0",
    },
];
