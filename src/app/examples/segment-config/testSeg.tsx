"use client";

import { ComboboxDropdown } from "@/components/ui/combobox";
import { useState, useCallback } from "react";
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

import MultipleTagsInput from "../../../components/multiple-tags";

import {
  PlusCircle,
  MinusCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { create } from "domain";
import { randomUUID } from "crypto";

interface TagConfig {
  code: string;
}

interface Segmento {
  id: string;
  codigo: string;
  dataType: string;
  minUso: string | undefined;
  uso: string;
  maxUso: string | undefined;
  config: TagConfig[]; // Update config to hold TagConfig objects
}

interface ConfigRows {
  // Interface for a dynamic tag row
  id: string; // Unique ID for each tag row
  tags: string[]; // Tags for this row
  config: string;
}

interface IDropdown {
  id: string;
  label: string;
}

const optionsUsage: IDropdown[] = [
  {
    id: "usage",
    label: "M",
  },
  {
    id: "usage",
    label: "O",
  },
  {
    id: "usage",
    label: "P",
  },
];

const optionsConfig: IDropdown[] = [
  {
    id: "config",
    label: "is one of",
  },
  {
    id: "config",
    label: "has format",
  },
];

const optionsType: IDropdown[] = [
  {
    id: "type",
    label: "DT",
  },
  {
    id: "type",
    label: "ID",
  },
];

const LsKey = "Tags";

export function Segments() {
  const [openRow, setOpenRows] = useState<Record<string, boolean>>({});
  const [configRows, setConfigRows] = useState<Record<string, ConfigRows[]>>(
    {}
  );

  const [selectDd, getSelectDd] = useState<IDropdown | null>(null);

  function changeStatus(status: IDropdown): void {
    getSelectDd(status);
  }

  const [segmentos, setSegmentos] = useState<Segmento[]>([
    {
      id: "123",
      codigo: "DTM",
      dataType: "Date/Time Reference",
      minUso: "2",
      uso: "O",
      maxUso: "2",
      config: [],
    },
    {
      id: "456",
      codigo: "DTM01",
      dataType: "Code",
      minUso: "1",
      uso: "M",
      maxUso: "2",
      config: [],
    },
    {
      id: "789",
      codigo: "DTM02",
      dataType: "Date",
      minUso: "1",
      uso: "M",
      maxUso: "1",
      config: [],
    },
  ]);

  function toggleRow(id: string) {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id], // Toggle the state for the specific row
    }));
  }

  function addTagRow(segmentId: string) {
    setConfigRows((prev) => ({
      ...prev,
      [segmentId]: [
        ...(prev[segmentId] || []),
        { id: self.crypto.randomUUID(), tags: [], config: "" },
      ],
    }));
    setOpenRows((prev) => ({ ...prev, [segmentId]: true }));
  }

  function removeTagRow(segmentId: string, rowId: string) {
    // Use string types for IDs
    setConfigRows((prevConfigRows) => ({
      ...prevConfigRows,
      [segmentId]:
        prevConfigRows[segmentId]?.filter((row) => row.id !== rowId) || [],
    }));
  }
  const handleTagsChange = useCallback(
    (segmentId: string, rowId: string, newTags: string[]) => {
      setConfigRows((prevConfigRows) => {
        // Renombrado a prevConfigRows
        const updatedConfigRows =
          prevConfigRows[segmentId]?.map((row) =>
            row.id === rowId ? { ...row, tags: newTags } : row
          ) || [];

        // Update the corresponding segmento.config
        setSegmentos((prevSegmentos) =>
          prevSegmentos.map((segmento) =>
            segmento.id === segmentId
              ? {
                  ...segmento,
                  config: updatedConfigRows.map((row) => ({
                    code: row.tags.join(", "),
                  })),
                }
              : segmento
          )
        );

        return {
          // Devolvemos el nuevo estado de configRows
          ...prevConfigRows,
          [segmentId]: updatedConfigRows,
        };
      });
    },
    []
  );

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="w-[80%] overflow-auto border rounded-xl">
          <Table className="max-sm:text-sm text-base md:text-lg">
            <TableHeader className="bg-turquoise dark:bg-cyan-950">
              <TableRow className="">
                <TableHead></TableHead>
                <TableHead className="text-center">Elements</TableHead>
                <TableHead className="text-center">Usage</TableHead>
                <TableHead className="text-center">Data Type</TableHead>
                <TableHead className="text-center">Min</TableHead>
                <TableHead className="text-center">Max</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {segmentos.map((segmento) => (
                <React.Fragment key={segmento.id}>
                  <TableRow>
                    <TableCell className="w-1">
                      <Button
                        onClick={() => toggleRow(segmento.id)}
                        size={"icon"}
                        variant={"ghost"}
                        className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-none"
                      >
                        {openRow[segmento.id] ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        )}
                      </Button>
                    </TableCell>

                    <TableCell className="font-medium ">
                      {segmento.codigo}
                    </TableCell>

                    <TableCell className=" px-20">
                      <ComboboxDropdown
                        key={`usage-${segmento.id}`}
                        content={optionsUsage}
                        handleSelect={(status: IDropdown) => {
                          setSegmentos((prev) =>
                            prev.map((s) =>
                              s.id === segmento.id
                                ? { ...s, uso: status.label }
                                : s
                            )
                          );
                        }}
                        selected={optionsUsage.find(
                          (o) => o.label === segmento.uso
                        )}
                      />
                    </TableCell>

                    <TableCell className=" px-20">
                      <ComboboxDropdown
                        key={`type-${segmento.id}`}
                        content={optionsType}
                        handleSelect={(status: IDropdown) => {
                          setSegmentos((prev) =>
                            prev.map((s) =>
                              s.id === segmento.id
                                ? { ...s, dataType: status.label }
                                : s
                            )
                          );
                        }}
                        selected={optionsType.find(
                          (o) => o.label === segmento.dataType
                        )}
                      />
                    </TableCell>

                    <TableCell className=" w-[8%]">
                      <Input placeholder={segmento.minUso ?? "N/A"} />
                    </TableCell>

                    <TableCell className=" w-[8%]">
                      <Input placeholder={segmento.maxUso ?? "N/A"} />
                      {/* {segmento.maxUso ?? "N/A"} */}
                    </TableCell>

                    <TableCell className=" flex justify-end me-[2rem]">
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="h-8 w-8 rounded-full"
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
                            <div className="flex justify-around items-center">
                              <p>Code</p>

                              <div className=" w-[20%]">
                                <ComboboxDropdown
                                  key={`config${segmento.id}-${ConfigRowItem.id}`}
                                  content={optionsConfig}
                                  handleSelect={(status: IDropdown) => {
                                    setSegmentos((prev) =>
                                      prev.map((s) =>
                                        s.id === segmento.id && ConfigRowItem.id
                                          ? { ...s, configs: status.label }
                                          : s
                                      )
                                    );
                                  }}
                                  selected={optionsConfig.find(
                                    (o) => o.label === ConfigRowItem.config
                                  )}
                                />
                              </div>

                              <MultipleTagsInput
                                key={`tags${segmento.id}-${ConfigRowItem.id}`}
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
                                className="h-8 w-8 rounded-full"
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
        <div className="py-10 text-[10px]">
          <pre>{JSON.stringify(segmentos, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
