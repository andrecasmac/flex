"use client";
import React from "react";

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

import { getEDIdocumentsById } from "@/da/EDI-Documents/edi-document-da";
import { useEffect, useState } from "react";
import { EDI_Document } from "@/types/DbTypes";

interface DocConfigProps{
  documentId: string;
}

export default function DocConfig({documentId}:DocConfigProps) {
  const [rows, setRows] = React.useState<Row[]>([]);
  const rowsId = React.useMemo(() => rows.map((row) => row.id), [rows]);
  const [activeRow, setActiveRow] = React.useState<Row | null>(null);

  const id = documentId;
  const [ediDocument, setDocument] = useState<EDI_Document>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchData = async () => {
      try {
          const data = await getEDIdocumentsById(id);
          setDocument(data);
      } catch (err) {
          setError('Failed to fetch data');
      } finally {
          setLoading(false);
      }
      };

      fetchData();
  }, [id]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 300 px
      },
    })
  );

  if (loading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>{error}</p>;
  }


  function createSegmentRow() {
    const segmentToAdd: Row = {
      id: generateSegmentId(),
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
      ParentId: parentId,
      name: "loop",
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

  return (
    <div className="w-[80%] h-[auto] justify-center">
      <div className="pb-4 gap-x-2 flex justify-end">
        <div className="flex-1 ">
          <Link href={"./segment-template"}>
            <Button variant={"default"}>Create Segment +</Button>
          </Link>
        </div>

        <Button variant={"default"} onClick={createSegmentRow}>
          Add segment +
        </Button>
        <Button variant={"default"} onClick={createLoopRow}>
          Add Loop +
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
          onClick={() => {
            alert("no hace nada");
          }}
        >
          Save Segment
        </Button>
      </div>

      <pre className="pt-10 texxt-xs flex justify-center">
        {JSON.stringify(rows, null, 2)}
      </pre>
    </div>
  );
}
