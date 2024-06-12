"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ComboboxDropdown } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  LoopRow,
  SegmentRow,
  Row,
  Id,
  IDropdown,
  optionsUsage,
  generateSegmentId
} from "./doc-types";

import {
  MinusCircle,
  Pencil,
  ChevronRight,
  PlusCircle,
  GripVertical,
} from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { readSegmentByEDIDocumentId } from "@/da/Segments/segment-da";
import { getAllSegmentsTemplates } from "@/da/Segments/segment-da";
interface Props {
  row: Row;
  EDI_Id: string;
  allRows: Row[];
  deleteRow: (id: Id) => void;
  handleSelect: (
    id: Id,
    option: IDropdown,
    value: keyof Row,
    parentId?: Id
  ) => void;
  handleInputChange: (
    id: Id,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  addSegmentsToLoop: (loopId: Id) => void;
  addLoopToLoop: (loopId: Id) => void;
  parentId?: Id;
  isTopLevel?: boolean; // New prop to indicate if the row is top-level
}

export default function RowContainer(props: Props) {
  const [showSegmentLoops, setShowSegmentLoops] = React.useState<{
    [key: string]: boolean;
  }>({});

  const {
    row,
    deleteRow,
    handleSelect,
    handleInputChange,
    addSegmentsToLoop,
    addLoopToLoop,
    parentId,
    allRows,
    EDI_Id,
    isTopLevel = true, // Default to true for top-level rows
  } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
    data: {
      type: "Row",
      row,
    },
    disabled: !isTopLevel, // Disable sorting for non-top-level rows
  });

  const [optionsSegments, setOptionsSegments] = React.useState<IDropdown[]>([]);
  React.useEffect(() => {
    const fetchSegments = async () => {
      try {
        const segmentData = await getAllSegmentsTemplates(true);

        // const data = await getAllSegmentsTemplates(true);
        // console.log(segmentData)
        const formattedOptions = segmentData.map((seg) => ({
          id: seg.id, // Convert id to string for IDropdown
          label: seg.name,
        }));

        setOptionsSegments(formattedOptions);
      } catch (err) {
        console.error("Error reading segment:", err);
        // Handle the error (e.g., show a message to the user)
      }
    };
    fetchSegments();
  }, [EDI_Id]); // Fetch segments whenever EDI_Id changes
  const handleSelectSegment = (option: IDropdown) => {
    handleSelect(row.id, option, "name");
    // Update SegmentId based on the selected option's segmentId:
    handleSelect(row.id, { id: option.id, label: `${option.id}-${generateSegmentId()}` }, "SegmentId");
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="h-20"></div>;
  }

  const isLoop = (row: SegmentRow | LoopRow): row is LoopRow =>
    "segments" in row;

  const toggleRules = (loopId: Id) => {
    setShowSegmentLoops((prevShowLoops) => ({
      ...prevShowLoops,
      [loopId]: !prevShowLoops[loopId],
    }));
  };

  return (
    <>
      {!isLoop(row) ? (
        <>
          <div
            className="flex flex-row justify-around h-20 px-5"
            ref={setNodeRef}
            style={style}
          >
            {isTopLevel && (
              <div className="flex items-center justify-start w-1/10">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-start"
                  {...attributes}
                  {...listeners}
                >
                  <GripVertical />
                </Button>
              </div>
            )}

            <div className="flex items-center justify-center w-2/4">
              <div className="w-4/5">
                {/* <ComboboxDropdown
                  content={optionsSegments}
                  handleSelect={(option: IDropdown) => {
                    handleSelect(row.id, option, "name")
                    // , handleSelect(row.id, option, "")
                  }}
                  selected={optionsSegments.find(
                    (option) => option.label === row.name
                  )}
                /> */}
                <ComboboxDropdown
                  content={optionsSegments}
                  handleSelect={handleSelectSegment} // Use the new handler
                  selected={optionsSegments.find(
                    (option) => option.label === row.name
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-2/4">
              <div className="w-4/5">
                <ComboboxDropdown
                  content={optionsUsage}
                  handleSelect={(option: IDropdown) => {
                    handleSelect(row.id, option, "mandatory");
                  }}
                  selected={optionsUsage.find(
                    (option) => option.label === row.mandatory
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-2/4">
              <div className="w-4/5">
                <Input
                  type="number"
                  name="max"
                  value={row.max}
                  onChange={(event) => handleInputChange(row.id, event)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-1/10 gap-x-8">
              <Link
                href={{
                  pathname: "./segment-edit",
                  query: {
                    segmentId: optionsSegments.find(
                      (option) => option.label === row.name
                    )?.id,
                  },
                }}
              >
                <Button variant={"ghost"} size={"icon"}>
                  <Pencil />
                </Button>
              </Link>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  deleteRow(row.id);
                }}
              >
                <MinusCircle className="fill-red-300 dark:fill-red-800" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="flex flex-row justify-around h-20 bg-slate-400/10 px-5"
            ref={setNodeRef}
            style={style}
          >
            {isTopLevel && (
              <div className="flex items-center justify-start w-1/10">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-start"
                  {...attributes}
                  {...listeners}
                >
                  <GripVertical />
                </Button>
              </div>
            )}
            <div className="flex items-center justify-start w-1/10">
              <Button
                className="flex items-center space-x-2"
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  toggleRules(row.id);
                }}
              >
                <ChevronRight
                  className={`transition-transform transform ${
                    showSegmentLoops[row.id] ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </div>

            <div className="flex items-center justify-center w-2/4">
              <div className="w-4/5">LOOP</div>
            </div>

            <div className="flex items-center justify-center w-2/4">
              <div className="w-4/5">
                <Input
                  type="number"
                  name="max"
                  value={row.max}
                  onChange={(event) => handleInputChange(row.id, event)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-1/10 gap-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <PlusCircle className="fill-green-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => {
                      addSegmentsToLoop(row.id);
                      setShowSegmentLoops((prevShowLoops) => ({
                        ...prevShowLoops,
                        [row.id]: true,
                      }));
                    }}
                  >
                    Add segment
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      addLoopToLoop(row.id);
                      setShowSegmentLoops((prevShowLoops) => ({
                        ...prevShowLoops,
                        [row.id]: true,
                      }));
                    }}
                  >
                    Add Loop
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  deleteRow(row.id);
                }}
              >
                <MinusCircle className="fill-red-300 dark:fill-red-800" />
              </Button>
            </div>
          </div>
          {showSegmentLoops[row.id] && (
            <>
              {row.segments.map((segment) => (
                <div
                  key={segment.id}
                  className={`border-s ms-10 ${
                    row.segments.indexOf(segment) !== 0 ? "border-t" : ""
                  }`}
                >
                  <RowContainer
                    key={segment.id}
                    row={segment}
                    EDI_Id={EDI_Id}
                    allRows={allRows}
                    deleteRow={deleteRow}
                    handleSelect={handleSelect}
                    handleInputChange={handleInputChange}
                    addSegmentsToLoop={addSegmentsToLoop}
                    addLoopToLoop={addLoopToLoop}
                    parentId={row.id}
                    isTopLevel={false} // Nested rows are not top-level
                  />
                </div>
              ))}

              {row.internLoops &&
                row.internLoops.map((loop) => (
                  <div key={loop.id} className="border-s ms-10">
                    <RowContainer
                      key={loop.id}
                      row={loop}
                      EDI_Id={EDI_Id}
                      allRows={allRows}
                      deleteRow={deleteRow}
                      handleSelect={handleSelect}
                      handleInputChange={handleInputChange}
                      addSegmentsToLoop={addSegmentsToLoop}
                      addLoopToLoop={addLoopToLoop}
                      parentId={row.id}
                      isTopLevel={false} // Nested rows are not top-level
                    />
                  </div>
                ))}
            </>
          )}
        </>
      )}
    </>
  );
}
