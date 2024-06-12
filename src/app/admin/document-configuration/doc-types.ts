
export type Id = string | number
export type Row = SegmentRow | LoopRow

export interface SegmentRow {
    id: Id;
    SegmentId: Id;
    LoopId?: Id,
    name: string;
    mandatory: string;
    max: number;
    rules?: []
}

export interface LoopRow {
    id: Id;
    parentId?: Id,
    SegmentId: Id;
    name: string;
    max: number;
    segments: SegmentRow[];
    internLoops: LoopRow[];
    mandatory?: string;
    rules?: []
}
export function generateSegmentId() {
    return `semgemt-${String(Math.floor(Math.random() * 10001))}`
}

export function generateLoopId() {
    return `loop-${String(Math.floor(Math.random() * 10001))}`
}

export var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

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
