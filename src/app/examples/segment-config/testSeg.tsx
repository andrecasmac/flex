"use client";

import { useState, useEffect, useCallback } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import MultipleTagsInput from "../mtags/multiple-tags";

import {
  PlusCircle,
  MinusCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface Segmento {
  id: number;
  codigo: string;
  dataType: string;
  minUso: number | null;
  uso: string;
  maxUso: number | null;
}

interface configRows {
  // Interface for a dynamic tag row
  id: number; // Unique ID for each tag row
  tags: string[]; // Tags for this row
}

const LsKey = "Tags";

export function Segments() {
  const [openRow, setOpenRows] = useState<Record<number, boolean>>({});
  const [configRows, setConfigRows] = useState<Record<number, configRows[]>>(
    {}
  );

  const [segmentos, setSegmentos] = useState<Segmento[]>([
    {
      id: 1,
      codigo: "DTM",
      dataType: "Date/Time Reference",
      minUso: 2,
      uso: "O",
      maxUso: 2,
      // mostrarDetalle: true,
    },
    {
      id: 2,
      codigo: "DTM01",
      dataType: "Code",
      minUso: 1,
      uso: "M",
      maxUso: 2,
      // mostrarDetalle: false,
    },
    {
      id: 3,
      codigo: "DTM02",
      dataType: "Date",
      minUso: 1,
      uso: "M",
      maxUso: 1,
      // mostrarDetalle: false,
    },
  ]);

  function toggleRow(id: number) {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id], // Toggle the state for the specific row
    }));
  }
  function addTagRow(segmentId: number) {
    const segment = segmentos.find((seg) => seg.id === segmentId);

    if (
      !segment ||
      (configRows[segmentId]?.length || 0) >= (segment.maxUso || Infinity)
    ) {
      // Check if segment exists and hasn't reached maxUso
      return;
    }

    setConfigRows((prevTagRows) => ({
      ...prevTagRows,
      [segmentId]: [
        ...(prevTagRows[segmentId] || []),
        { id: Date.now(), tags: [] },
      ],
    }));

    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [segmentId]: true,
    }));
  }

  function removeTagRow(segmentId: number, rowId: number) {
    setConfigRows((prevTagRows) => ({
      ...prevTagRows,
      [segmentId]:
        prevTagRows[segmentId]?.filter((row) => row.id !== rowId) || [],
    }));
  }

  const handleTagsChange = useCallback(
    (segmentId: number, rowId: number, newTags: string[]) => {
      setConfigRows((prevRows) => ({
        ...prevRows,
        [segmentId]:
          prevRows[segmentId]?.map((row) =>
            row.id === rowId ? { ...row, tags: newTags } : row
          ) || [],
      }));
    },
    []
  );

  return (
    <>
      <div className="flex w-[80%] overflow-auto border rounded-xl">
        <Table>
          <TableHeader className="bg-turquoise dark:bg-cyan-950">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Elements</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Data Type</TableHead>
              <TableHead>Min</TableHead>
              <TableHead>Max</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {segmentos.map((segmento) => (
              <React.Fragment key={segmento.id}>
                <TableRow>
                  <TableCell className="w-1">
                    <button
                      onClick={() => toggleRow(segmento.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {openRow[segmento.id] ? (
                        <ChevronDown />
                      ) : (
                        <ChevronRight />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">
                    {segmento.codigo}
                  </TableCell>
                  <TableCell>
                    drop
                    {segmento.uso}
                  </TableCell>
                  <TableCell>{segmento.dataType}</TableCell>

                  <TableCell>{segmento.minUso ?? "N/A"}</TableCell>
                  <TableCell>{segmento.maxUso ?? "N/A"}</TableCell>

                  <TableCell>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="h-8 w-8"
                      onClick={() => {
                        addTagRow(segmento.id);
                      }}
                    >
                      <PlusCircle className="h-7 w-7 text-white dark:text-black fill-green-500" />
                    </Button>
                  </TableCell>
                </TableRow>

                {openRow[segmento.id] && (
                  <>
                    {(configRows[segmento.id] || []).map((ConfigRowItem) => (
                      <TableRow
                        key={ConfigRowItem.id}
                        className="bg-slate-600/20"
                      >
                        <TableCell colSpan={7}>
                          <div className="flex  justify-around items-center">
                            <MultipleTagsInput
                              tags={ConfigRowItem.tags}
                              onTagsChange={(newTags) =>
                                handleTagsChange(
                                  segmento.id,
                                  ConfigRowItem.id,
                                  newTags
                                )
                              }
                            />

                            <Button
                              variant={"ghost"}
                              className="h-8 w-8"
                              size={"icon"}
                              onClick={() =>
                                removeTagRow(segmento.id, ConfigRowItem.id)
                              }
                            >
                              <MinusCircle className="h-7 w-7 text-slate-200 dark:text-slate-900 fill-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
