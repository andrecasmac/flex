"use client";
import React, { useMemo, useState } from "react";
import { Table, TableHeader, TableHead, TableRow } from "@/components/ui/table";
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
import RowContainer from "./row-container-base";

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

export default function DocConfig() {
  const [rows, setRows] = useState<Row[]>([]);
  const [activeRow, setActiveRow] = useState<Row | null>(null);

  const rowsId = useMemo(() => rows.map((row) => row.id), [rows]);

  // console.log({ rows });

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
          return undefined; // Eliminar la fila actual
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

          // Si el bucle se queda sin hijos, lo eliminamos también
          if (updatedSegments.length === 0 && updatedInternLoops.length === 0) {
            return undefined;
          } else {
            return {
              ...row,
              segments: updatedSegments,
              internLoops: updatedInternLoops,
            };
          }
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <div className="w-[80%] h-[auto] justify-center">
      <div className="pb-4 gap-x-2 flex justify-end">
        <Button variant={"default"} onClick={createSegmentRow}>
          Add segment +
        </Button>
        <Button variant={"default"} onClick={createLoopRow}>
          Add Loop +
        </Button>
      </div>

      <div className="overflow-auto rounded-t-md">
        <Table>
          <TableHeader className="bg-turquoise dark:bg-cyan-950">
            <TableRow>
              <TableHead className="w-20"></TableHead>
              <TableHead className="w-1"></TableHead>
              <TableHead className="text-start">
                Segment ID - Segment Name
              </TableHead>
              <TableHead className="text-center">Usage</TableHead>
              <TableHead className="text-center">Max</TableHead>
              <TableHead className="text-center">Edit</TableHead>
              <TableHead className="text-center">Remove</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="border rounded-md overflow-auto">
          <div className="w-full space-y-0">
            <SortableContext items={rowsId}>
              <div className="min-w-[700px]">
                {rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <RowContainer
                      row={row}
                      allRows={rows}
                      deleteRow={deleteRow}
                      handleSelect={handleSelect}
                      handleInputChange={handleInputChange}
                      addSegmentsToLoop={addSegmentToLoop}
                      addLoopToLoop={addLoopToLoop}
                    />
                  </React.Fragment>
                ))}
              </div>
            </SortableContext>
          </div>
        </div>

        {typeof document !== "undefined" &&
          createPortal(
            <DragOverlay className="opacity-40">
              {activeRow && (
                <RowContainer
                  row={activeRow}
                  allRows={rows.filter((row) => {
                    (row).id === activeRow.id
                  })}
                  // allRows={rows}
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

      <pre className="pt-10 texxt-xs flex justify-center">
        {JSON.stringify(rows, null, 2)}
      </pre>
    </div>
  );
}
