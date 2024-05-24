

export interface SegmentT {
    name: string;
    mandatory: boolean;
    max: number;
    template: boolean;
    segment_rules: { [Key: string]: SegmentRule }
}

export interface SegmentRule {
    mandatory: boolean;
    min: number;
    max: number;
    type: "ID" | "AN" | "DT" | "TM" | "SE" | "R" | "N0" | "N1" | "N2" | "N3" | "N4" | "N5" | "N6" | "";
    oneOf?: string[];
    isEqual?: string;
    hasFormat?: string;
    dateHasFormat?: string;
    timeHasFormat?: string;
    isHigherThan?: string;
}

export interface ConfigRows {
    id: string;
    isEqual?: string;
    hasFormat?: string;
    dateHasFormat?: string;
    timeHasFormat?: string;
    isHigherThan?: string;
}

// export type ConfigRowByType = {
//     [key in keyof SegmentRule as Exclude<key, "min" | "max" | "mandatory">]: (ConfigRowBase & Partial<Pick<SegmentRule, key>>)[];
// };

export type ConfigRowByType = {
    ID: ConfigRowID[];
    DT: ConfigRowDT[];
    TM: ConfigRowTM[];
    AN: ConfigRowAN[];
    R: ConfigRowR[];
    N0: ConfigRowN0[];
    N1: ConfigRowBase[];
    N2: ConfigRowBase[];
    N3: ConfigRowBase[];
    N4: ConfigRowBase[];
    N5: ConfigRowBase[];
    N6: ConfigRowBase[];
    SE: ConfigRowSE[];
    "": ConfigRowBase[];

};


export interface ConfigRowBase {
    id: string;
    ruleId: string;
}

export interface ConfigRowID extends ConfigRowBase { oneOf?: string[]; }
export interface ConfigRowDT extends ConfigRowBase { dateHasFormat?: string; }
export interface ConfigRowTM extends ConfigRowBase { timeHasFormat?: string; }
export interface ConfigRowAN extends ConfigRowBase { isEqual?: string; oneOf?: string[]; }
export interface ConfigRowR extends ConfigRowBase { isHigherThan?: string; }
export interface ConfigRowN0 extends ConfigRowBase { isHigherThan?: string; isEqual?: string; }
export interface ConfigRowSE extends ConfigRowBase { isEqual?: string; }


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

export const optionsConfigID: IDropdown[] = [
    {
        id: "config1",
        label: "is one of",
    },
];

export const optionsConfigDT: IDropdown[] = [
    {
        id: "config1",
        label: "has format",
    },
];

export const optionsConfigTM: IDropdown[] = [
    {
        id: "config1",
        label: "time has format",
    },
];

export const optionsConfigAN: IDropdown[] = [
    {
        id: "config1",
        label: "is one of",
    },
    {
        id: "config2",
        label: "is equal to",
    },
];


export const optionsConfigR: IDropdown[] = [
    {
        id: "config1",
        label: "is higher than",
    },
];


export const optionsConfigSE: IDropdown[] = [
    {
        id: "config1",
        label: "is equal to",
    },
];

export const optionsConfigNO: IDropdown[] = [
    {
        id: "config1",
        label: "is higher than",
    },
    {
        id: "config2",
        label: "is equal to",
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
        label: "R",
    },
    {
        id: "type7",
        label: "N0",
    },
    {
        id: "type8",
        label: "N1",
    },
    {
        id: "type9",
        label: "N2",
    },
    {
        id: "type10",
        label: "N3",
    },
    {
        id: "type11",
        label: "N4",
    },
    {
        id: "type12",
        label: "N5",
    },
    {
        id: "type13",
        label: "N6",
    },
];
