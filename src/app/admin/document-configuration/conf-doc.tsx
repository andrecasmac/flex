"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LoopRow,
  SegmentRow,
  generateSegmentId,
  generateLoopId,
  Id,
  Row,
  IDropdown,
} from "./doc-types";
import {
  DndContext,
  DragStartEvent,
  DragOverlay,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import RowContainer from "./row-container-base";
import Link from "next/link";
import { readRulesSegmentByEDIDocumentId } from "@/da/Segments/segment-da";
import { updateEDIdocumentStructure } from "@/da/EDI-Documents/edi-document-da";
function convertJsonToRows(jsonRows: any[], parentId?: Id): Row[] {
  return jsonRows.map((jsonRow) => {
    const row: Row = {
      id: generateSegmentId(),
      SegmentId: jsonRow.id, // Set the SegmentId
      name: jsonRow.name, // Convert name back to lowercase
      mandatory: jsonRow.mandatory ? "M" : "O", // Convert boolean back to "M"/"O"
      max: jsonRow.max,
    };

    if (jsonRow.rule) {
      // It's a LoopRow
      const segments: SegmentRow[] = [];
      const internLoops: LoopRow[] = [];
      jsonRow.rule.forEach((rules: any) => {
        if (rules.name === "LOOP") {
          internLoops.push(rules);
        } else {
          segments.push(rules);
        }
      });

      return {
        ...row,
        segments: convertJsonToRows(segments, jsonRow.id), // Recursive call
        internLoops: convertJsonToRows(internLoops, jsonRow.id), // Recursive call
      } as LoopRow;
    } else {
      return row as SegmentRow; // It's a SegmentRow
    }
  });
}

interface DocConfigProps {
  initialConfig?: any;
  EDI_Id: string;
}

export default function DocConfig({ initialConfig, EDI_Id }: DocConfigProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [segmentRules, setSegmentRules] = useState<Record<string, any[]>>({});

  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "updating" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>();

  useEffect(() => {
    // Parse and process initialConfig ONLY if it exists and is not empty
    if (initialConfig && initialConfig.length > 0) {
      const jsonData = initialConfig;
      const initialRows = convertJsonToRows(jsonData);
      setRows(initialRows);
    } else {
      // Handle cases where there's no initial configuration (e.g., set to an empty array)
      setRows([]);
    }
  }, [initialConfig]);

  useEffect(() => {
    const rowsWithValidSegmentId = rows.filter(
      (row): row is SegmentRow =>
        row.SegmentId !== undefined && row.SegmentId !== ""
    );

    const fetchRules = async () => {
      // Filter out rows with undefined or empty SegmentId
      const rulePromises = rowsWithValidSegmentId.map((row) =>
        fetchRulesForSegment(row.SegmentId)
      );
      const rules = await Promise.all(rulePromises);

      setSegmentRules(
        rowsWithValidSegmentId.reduce((acc, row, index) => {
          if (row.SegmentId !== null) {
            acc[row.SegmentId] = rules[index];
          }
          return acc;
        }, {} as Record<string, any[]>)
      );
    };

    if (rowsWithValidSegmentId.length > 0) {
      // Check filtered rows
      fetchRules();
    }
  }, [rows]);

  const rowsId = useMemo(() => rows.map((row) => row.id), [rows]);
  const [activeRow, setActiveRow] = useState<Row | null>(null);

  function createSegmentRow() {
    const segmentToAdd: Row = {
      id: generateSegmentId(),
      SegmentId: "",
      name: "segment",
      mandatory: "M",
      max: 1,
    };
    setRows([...rows, segmentToAdd]);
  }

  function createLoopRow() {
    const loopToAdd: Row = {
      id: generateLoopId(),
      name: "loop",
      SegmentId: "",
      max: 1,
      segments: [],
      internLoops: [],
    };
    setRows([...rows, loopToAdd]);
  }

  function deleteRow(id: Id) {
    setRows((prevRows) => deleteRowInNestedLoops(prevRows, id));
  }

  function deleteRowInNestedLoops(currentRows: Row[], id: Id): Row[] {
    return currentRows
      .map((row) => {
        if (row.id === id) {
          return undefined; // Eliminar la fila actual si coincide con el ID
        } else if ("segments" in row || "internLoops" in row) {
          // Es un bucle, filtrar recursivamente en segments e internLoops
          const updatedSegments =
            "segments" in row
              ? row.segments.filter((segment) => segment.id !== id)
              : [];
          const updatedInternLoops =
            "internLoops" in row
              ? deleteRowInNestedLoops(row.internLoops as Row[], id)
              : [];

          // Conservar el bucle incluso si se queda sin hijos
          return {
            ...row,
            segments: updatedSegments,
            internLoops: updatedInternLoops,
          };
        } else {
          // Es un segmento y no coincide, lo conservamos
          return row;
        }
      })
      .filter(Boolean) as Row[]; // Filtrar undefined y convertir a Row[]
  }

  function addSegmentToLoop(parentId: Id) {
    const newSegment: SegmentRow = {
      id: `${generateSegmentId()}`, // Incluir parentId en el ID
      LoopId: parentId,
      SegmentId: "",
      name: "segment loop",
      mandatory: "M",
      max: 1,
    };

    const updatedRows = findAndAddSegment(rows, parentId, newSegment); // Usamos la nueva función auxiliar
    setRows(updatedRows);
  }

  function findAndAddSegment(
    currentRows: Row[],
    targetId: Id,
    newSegment: SegmentRow
  ): any[] {
    return currentRows.map((row) => {
      if (row.id === targetId && "segments" in row) {
        return {
          ...row,
          segments: [...row.segments, newSegment],
        };
      } else if ("internLoops" in row) {
        // Recursivamente buscar en sub-bucles
        return {
          ...row,
          internLoops: findAndAddSegment(row.internLoops, targetId, newSegment),
        };
      } else {
        return row;
      }
    });
  }

  function addLoopToLoop(parentId: Id) {
    const newLoop: LoopRow = {
      id: `${generateLoopId()}`,
      parentId: parentId,
      name: "LOOP",
      SegmentId: "",
      max: 1,
      segments: [],
      internLoops: [],
    };

    const updatedRows = findAndAddLoop(rows, parentId, newLoop);

    setRows(updatedRows);
  }

  function findAndAddLoop(
    currentRows: Row[],
    targetId: Id,
    newLoop: LoopRow
  ): any {
    return currentRows.map((row) => {
      if (row.id === targetId && "internLoops" in row) {
        return {
          ...row,
          internLoops: [...row.internLoops, newLoop],
        };
      } else if ("internLoops" in row) {
        // Recursivamente buscar en sub-bucles
        return {
          ...row,
          internLoops: findAndAddLoop(row.internLoops, targetId, newLoop),
        };
      } else {
        return row;
      }
    });
  }

  function handleSelect(
    id: Id,
    option: IDropdown,
    value: keyof Row,
    parentId?: Id
  ) {
    setRows((prevRows) =>
      updateRowInNestedLoops(prevRows, id, option.label, value, parentId)
    );
  }

  const handleInputChange = (
    id: Id,
    event: React.ChangeEvent<HTMLInputElement>,
    parentId?: Id
  ) => {
    const { value } = event.target;
    setRows((prevRows) =>
      updateRowInNestedLoops(prevRows, id, parseInt(value), "max", parentId)
    );
  };

  function isLoopRow(row: Row): row is LoopRow {
    return "segments" in row; // Verificar si tiene la propiedad segments
  }

  function updateRowInNestedLoops(
    currentRows: Row[],
    id: Id,
    newValue: string | number, // Valor a actualizar puede ser string o number
    valueKey: keyof Row,
    parentId?: Id
  ): any {
    return currentRows.map((row) => {
      if (row.id === id) {
        // Encontramos la fila a actualizar
        return { ...row, [valueKey]: newValue };
      } else if (isLoopRow(row)) {
        // Es un bucle, buscar recursivamente en segments o internLoops
        const updatedSegments = updateRowInNestedLoops(
          row.segments,
          id,
          newValue,
          valueKey,
          row.id
        ); // Pasamos el ID del bucle padre
        const updatedInternLoops = updateRowInNestedLoops(
          row.internLoops,
          id,
          newValue,
          valueKey,
          row.id
        ); // Pasamos el ID del bucle padre

        return {
          ...row,
          segments: updatedSegments,
          internLoops: updatedInternLoops,
        };
      } else {
        // Es un segmento y no coincide, lo devolvemos sin cambios
        return row;
      }
    });
  }

  function onDragStart(event: DragStartEvent) {
    console.log("DRAG START", { event });
    if (event.active.data.current?.type === "Row") {
      setActiveRow(event.active.data.current.row);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeRowId = active.id;
    const overRowId = over.id;

    if (activeRowId === overRowId) return;

    setRows((rows) => {
      const activeRowIndex = rows.findIndex((row) => row.id === activeRowId);
      const overRowIndex = rows.findIndex((row) => row.id === overRowId);
      return arrayMove(rows, activeRowIndex, overRowIndex);
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 300 px
      },
    })
  );

  async function fetchRulesForSegment(SegmentId: any) {
    try {
      const rules = await readRulesSegmentByEDIDocumentId(SegmentId);
      return rules || []; // Provide an empty array as a default if rules are undefined
    } catch (err) {
      console.error("Error fetching rules:", err); // Log the error for debugging
      return []; // Return an empty array in case of error
    }
  }

  function transformRowsToDesiredFormat(rows: Row[], parentId?: Id): any[] {
    return rows.map((row) => {
      const newRow: any = {
        // id: row.id,
        id: (row as SegmentRow).SegmentId,
        parentId: parentId,
        name: row.name.toUpperCase(),
        mandatory: row.mandatory === "M",
        max: row.max,
        template: true,
        isLoop: false,
        parentLoopId: null,
        EDI_DocumentId: EDI_Id,
      };

      if (segmentRules[row.SegmentId]) {
        const rule = segmentRules[row.SegmentId][0]; // Get the first (and only) rule object
        if (rule && rule.rules) {
          newRow.rules = rule.rules; // Extract the nested 'rules' object
        } else {
          newRow.rules = {}; // Set to empty object if 'rules' is not present
        }
      } else {
        newRow.rules = {};
      }

      if ("segments" in row) {
        newRow.segments = transformRowsToDesiredFormat(row.segments, row.id);
        newRow.loopSegment = transformRowsToDesiredFormat(
          row.internLoops,
          row.id
        );
      }

      return newRow;
    });
  }

  const handleSaveSegment = async () => {
    setUpdateStatus("updating");
    try {
      const transformedRows = transformRowsToDesiredFormat(rows);
      const segmentUpdateData = {
        update: transformedRows.map((row) => ({
          where: { id: row.id }, // Use the correct identifier for updates
          data: {
            name: row.name,
            mandatory: row.mandatory,
            max: row.max,
            template: row.template,
            rules: row.rules,
            isLoop: row.isLoop,
            // EDI_DocumentId: row.EDI_DocumentId,
          },
        })),
      };

      await updateEDIdocumentStructure(EDI_Id, segmentUpdateData);
      setUpdateStatus("success");
    } catch (error: unknown) {
      // Explicitly type error as unknown
      setUpdateStatus("error");

      if (error instanceof Error) {
        // Check if error is an Error object
        setErrorMessage(error.message);
        console.error("Error updating EDI document:", error);
      } else {
        // Handle non-Error cases (if needed)
        setErrorMessage("An unexpected error occurred.");
        console.error("Unknown error updating EDI document:", error);
      }
    }
  };

  return (
    <div className="w-[80%] h-[auto] justify-center">
      <div className="pb-4 gap-x-2 flex justify-end">
        <div className="flex-1 ">
          <Link
            href={{ pathname: "./segment-template", query: { EDI_Id: EDI_Id } }}
          >
            <Button variant={"default"}>Create Segment +</Button>
          </Link>
        </div>

        <Button variant={"default"} onClick={createSegmentRow}>
          Add segment +
        </Button>
        <Button variant={"default"} onClick={createLoopRow}>
          Add Loop +
        </Button>

        <Button
          variant={"default"}
          onClick={() =>
            console.log(fetchRulesForSegment("666932f2adc24ac3ddfe14e4"))
          }
        >
          sera?
        </Button>
      </div>

      <div className="w-full overflow-auto rounded-t-md">
        <div className="min-w-[700px] w-full">
          <div className="bg-turquoise dark:bg-cyan-950">
            <div className="flex text-white h-12">
              <div className="flex items-center justify-center align-middle text-center ps-10 w-2/4">
                Segment ID - Segment Name
              </div>
              <div className="flex items-center justify-center align-middle text-center w-2/4">
                Usage
              </div>
              <div className="flex items-center justify-center align-middle text-center w-2/4">
                Max
              </div>
              <div className="flex items-center justify-center align-middle text-center  w-1/10">
                Edit
              </div>
              <div className="flex items-center justify-center align-middle px-5 w-1/10">
                Remove
              </div>
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="border rounded-b-lg">
              <div className="flex justify-center items-center h-20 opacity-40">
                <h1>Add segments or loops</h1>
              </div>
            </div>
          ) : (
            <div className="border rounded-b-lg">
              <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              >
                <SortableContext items={rowsId}>
                  {rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <div
                        className={`${
                          rows.length > 0 &&
                          rows.indexOf(row) !== rows.length - 1
                            ? "border-b"
                            : ""
                        }`}
                      >
                        <RowContainer
                          row={row}
                          allRows={rows}
                          EDI_Id={EDI_Id}
                          deleteRow={deleteRow}
                          handleSelect={handleSelect}
                          handleInputChange={handleInputChange}
                          addSegmentsToLoop={addSegmentToLoop}
                          addLoopToLoop={addLoopToLoop}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </SortableContext>

                {typeof document !== "undefined" &&
                  createPortal(
                    <DragOverlay className="opacity-40">
                      {activeRow && (
                        <RowContainer
                          row={activeRow}
                          allRows={rows}
                          EDI_Id={EDI_Id}
                          deleteRow={deleteRow}
                          handleSelect={handleSelect}
                          handleInputChange={handleInputChange}
                          addSegmentsToLoop={addSegmentToLoop}
                          addLoopToLoop={addLoopToLoop}
                        />
                      )}
                    </DragOverlay>,
                    document.body
                  )}
              </DndContext>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center pt-10">
        <Button
          variant={"default"}
          onClick={handleSaveSegment} // Call handleSaveSegment
          disabled={updateStatus === "updating"} // Disable while updating
        >
          {updateStatus === "updating" ? "Saving..." : "Save Segment"}
        </Button>

        {/* Display error message if there was an error */}
        {updateStatus === "error" && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
      </div>

      <pre className="pt-10 texxt-xs flex justify-center">
        {/* {JSON.stringify(rows, null, 2)} */}
        {JSON.stringify(
          transformRowsToDesiredFormat(rows), // Aplicar la transformación aquí
          // rows,
          null,
          2
        )}
      </pre>
    </div>
  );
}
