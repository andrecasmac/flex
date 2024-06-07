
export interface SegmentRule {
    mandatory: string;
    min: number;
    max: number;
    type: string;
    [key: string]: string | number | boolean | String[] | undefined; // Para reglas adicionales
}

export interface SegmentData {
    name: string;
    mandatory: string;
    max: number;
    template: boolean;
    segment_rules: { [key: string]: SegmentRule }; // Corrección aquí
}

export const initialRuleByType: SegmentRule = {
    mandatory: "M",
    min: 1,
    max: 1,
    type: "",
};

export const additionalRulesByType: {
    [key: string]: { rules: Partial<SegmentRule>; allowedRules: string[] };
} = {
    ID: { rules: { oneOf: "" }, allowedRules: ["oneOf"] },
    DT: { rules: { dateHasFormat: "" }, allowedRules: ["dateHasFormat"] },
    TM: { rules: { timeHasFormat: "" }, allowedRules: ["timeHasFormat"] },
    AN: { rules: { isEqual: "", oneOf: "" }, allowedRules: ["isEqual", "oneOf"] },
    R: { rules: { isHigherThan: "" }, allowedRules: ["isHigherThan"] },
    SE: { rules: { isEqual: "" }, allowedRules: ["isEqual"] },
    N0: { rules: { isHigherThan: "", isEqual: "" }, allowedRules: ["isHigherThan", "isEqual"] },
    N1: { rules: {}, allowedRules: [] },
    N2: { rules: {}, allowedRules: [] },
    N3: { rules: {}, allowedRules: [] },
    N4: { rules: {}, allowedRules: [] },
    N5: { rules: {}, allowedRules: [] },
    N6: { rules: {}, allowedRules: [] },
};


export const ruleNamesMap: { [key: string]: string } = {
    oneOf: "One of",
    dateHasFormat: "Date has Format",
    timeHasFormat: "Time has Format",
    isEqual: "Is Equal",
    isHigherThan: "Is Higher Than",
};


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



export const optionsDTFormats: IDropdown[] = [
    {
        id: "format1",
        label: "Formato 1",
    },
    {
        id: "format2",
        label: "Formato 2",
    },
    {
        id: "format3",
        label: "Formato 3",
    },
];

export const optionsTMFormats: IDropdown[] = [
    {
        id: "format1",
        label: "Formato 1",
    },
    {
        id: "format2",
        label: "Formato 2",
    },
    {
        id: "format3",
        label: "Formato 3",
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



// export const additionalRulesByType: { [key: string]: Partial<SegmentRule> } = {
//     ID: { oneOf: "" },
//     DT: { dateHasFormat: "" },
//     TM: { timeHasFormat: "" },
//     AN: { isEqual: "", oneOf: "" },
//     R: { isHigherThan: "" },
//     N0: { isHigherThan: "", isEqual: "" },
//     N1: {},
//     N2: {},
//     N3: {},
//     N4: {},
//     N5: {},
//     N6: {},
//     SE: { isEqual: "" },
// };