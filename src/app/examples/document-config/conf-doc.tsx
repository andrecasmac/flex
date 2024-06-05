"use client";
import React, { useState } from "react";
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

export default function DocConfig() {
  const [rows, setRows] = useState<Row[]>([]);

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

  return (
    <div className="w-[80%] h-[auto] justify-center">
      <div className="pb-4 gap-x-2 flex justify-end">
        <div className="flex-1 ">
          <Button variant={"default"} onClick={createSegmentRow}>
            Create Segment +
          </Button>
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

          <div className="border rounded-b-lg">
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
        </div>
      </div>

      {/* <div className="border  rounded-b-lg overflow-auto">
        <div className="w-full space-y-0">
          <div className="min-w-[700px]"></div>
        </div>
      </div> */}

      <pre className="pt-10 texxt-xs flex justify-center">
        {JSON.stringify(rows, null, 2)}
      </pre>
    </div>
  );
}
