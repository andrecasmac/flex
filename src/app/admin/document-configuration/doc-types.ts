
export type Id = string | number
export type Row = SegmentRow | LoopRow
export interface SegmentRow {
    id: Id;
    LoopId?: Id,
    name: string;
    mandatory: string;
    max: number;
}

export interface LoopRow {
    id: Id;
    parentId?: Id,
    name: string;
    max: number;
    segments: SegmentRow[];
    internLoops: LoopRow[];
    mandatory?: string;
}
export function generateSegmentId() {
    return `semgemt-${String(Math.floor(Math.random() * 10001))}`
}

export function generateLoopId() {
    return `loop-${String(Math.floor(Math.random() * 10001))}`
}

const exampleSegment = [
    { name: "ISA" },
    { name: "DMT" },
    { name: "ID" },
    { name: "MT" },
];

const exmapleLoops = [
    { name: "LOOP" },
];


export interface IDropdown {
    id: string;
    label: string;
}

export function getSegmentsTest(): IDropdown[] {
    const optionsSegments: IDropdown[] = exampleSegment.map((data, index) => ({
        id: String(index),
        label: data.name,
    }));
    return optionsSegments;
}

export function getLoops(): IDropdown[] {
    const optionsSegments: IDropdown[] = exmapleLoops.map((data, index) => ({
        id: String(index),
        label: data.name,
    }));
    return optionsSegments;
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
