export interface IDropdown {
    id: string;
    label: string;
}

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
    ParentId?: Id,
    name: string;
    max: number;
    segments: SegmentRow[];
    internLoops: LoopRow[];
    mandatory?: string; 
}

const exampleSegment = [
    { name: "ISA - No se" },
    { name: "DMT - Date time" }
];

const exmapleLoops = [
    { name: "LOOP ID- No se" },
    { name: "LOOP TM - No se 2" }
];

export function generateSegmentId() {
    return `semgemt-${String(Math.floor(Math.random() * 10001))}`
}

export function generateLoopId() {
    return `loop-${String(Math.floor(Math.random() * 10001))}`
}


export function getSegments(): IDropdown[] {
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
