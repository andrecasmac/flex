"use client";

import React from "react";
import { ComboboxDropdown } from "@/components/ui/combobox";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
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

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  IDropdown,
  optionsUsage,
  optionsType,
} from "../../../../types/segmentTypes/segmentTypes";

interface Segment {
  id: string;
  name: string;
  mandatory: boolean;
  max: number;
  template: boolean;
  segment_rules: {
    [rule_number: string]: {
      mandatory: boolean;
      min: number | null;
      max: number | null;
      type: "ID" | "AN" | "DT" | "TM" | "SE" | "N0";
      oneOf?: string[];
      isEqual?: string;
      hasFormat?: string;
    };
  };
}

interface ConfigRows {
  id: string;
  oneOf?: string[];
  isEqual?: string;
  hasFormat?: string;
}

export function SegmentsTest() {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [configRows, setRulesRows] = useState<Record<string, ConfigRows[]>>({});
  const [segments, setSegments] = useState<Segment[]>([
    {
      id: self.crypto.randomUUID(),
      name: "ISA",
      mandatory: true,
      max: 1,
      template: false,
      segment_rules: {
        "1": {
          mandatory: true,
          min: 1,
          max: 1,
          type: "ID",
          oneOf: [],
        },
      },
    },
  ]);

  function toggleRow(id: string) {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id],
    }));
  }

  function addTagRow(ruleId: string) {
    // Now only needs ruleId
    setRulesRows((prevRulesRows) => ({
      ...prevRulesRows,
      [ruleId]: [
        ...(prevRulesRows[ruleId] || []),
        { id: self.crypto.randomUUID(), oneOf: [] },
      ],
    }));
    setOpenRows((prev) => ({ ...prev, [ruleId]: true }));
  }

  const handleRemoveTagRow = useCallback((ruleId: string, tagRowId: string) => {
    // Now only needs ruleId and tagRowId
    setRulesRows((prevRulesRows) => ({
      ...prevRulesRows,
      [ruleId]: prevRulesRows[ruleId]?.filter((row) => row.id !== tagRowId),
    }));
  }, []);

  const handleTagsChange = useCallback(
    (segmentId: string, ruleNumber: string, newTags: string[]) => {
      setSegments((prevSegments) =>
        prevSegments.map((segment) =>
          segment.id === segmentId
            ? {
                ...segment,
                segment_rules: {
                  ...segment.segment_rules,
                  [ruleNumber]: {
                    ...segment.segment_rules[ruleNumber],
                    oneOf: newTags,
                  },
                },
              }
            : segment
        )
      );
    },
    []
  );

  // const handleTagsChange = useCallback(
  //   (ruleId: string, tagRowId: string, newTags: string[]) => {
  //     setRulesRows((prevRulesRows) => ({
  //       ...prevRulesRows,
  //       [ruleId]: prevRulesRows[ruleId].map((row) =>
  //         row.id === tagRowId ? { ...row, oneOf: newTags } : row
  //       ),
  //     }));
  //   },
  //   []
  // );

  // handel del min
  const handleMinChange = useCallback(
    (segmentId: string, ruleId: string, newValue: string) => {
      // convierte el nuevo valor a un número entero
      const parsedValue = parseInt(newValue, 10);

      // verifica si el valor convertido es un número válido y no negativo
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        // actualiza el estado 'segments'
        setSegments((prevSegments) =>
          // mapea a través de los segmentos anteriores
          prevSegments.map(
            (segment) =>
              // si el ID del segmento coincide con 'segmentId'
              segment.id === segmentId
                ? {
                    ...segment, // mantiene las propiedades existentes del segmento
                    segment_rules: {
                      ...segment.segment_rules, // mantiene las reglas existentes
                      [ruleId]: {
                        ...segment.segment_rules[ruleId], // ,antiene las propiedades existentes de la regla específica
                        min: parsedValue, // actualiza el valor mínimo de la regla
                      },
                    },
                  }
                : segment // devuelve el segmento sin cambios si el ID no coincide
          )
        );
      }
    },
    [] // dependencia vacía para que la función no se vuelva a crear en cada renderizado
  );

  // handler del max
  const handleMaxChange = useCallback(
    (segmentId: string, ruleId: string, newValue: string) => {
      // convierte el nuevo valor a un número entero
      const parsedValue = parseInt(newValue, 10);

      // verifica si el valor convertido es un número válido y no negativo
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        // actualiza el estado 'segments'
        setSegments((prevSegments) =>
          // mapea a través de los segmentos anteriores
          prevSegments.map(
            (segment) =>
              // si el Id del segmento coincide con 'segmentId'
              segment.id === segmentId
                ? {
                    ...segment, // mantiene las propiedades existentes del segmento
                    segment_rules: {
                      ...segment.segment_rules, // mantiene las reglas existentes
                      [ruleId]: {
                        ...segment.segment_rules[ruleId], // mantiene las propiedades existentes de la regla específica
                        max: parsedValue, // actualiza el valor máximo de la regla
                      },
                    },
                  }
                : segment // devuelve el segmento sin cambios si el Id no coincide
          )
        );
      }
    },
    [] // Dependencia vacía para que la función no se vuelva a crear en cada renderizado
  );

  const handleSegmentCode = useCallback(
    (segmentId: string, newName: string) => {
      setSegments((prevSegments) =>
        prevSegments.map((segment) =>
          segment.id === segmentId
            ? {
                ...segment,
                name: newName,
              }
            : segment
        )
      );
    },
    []
  );

  // const handleSegmentMax = useCallback(
  //   (segmentId: string, newValue: string) => {
  //     const parsedValue = parseInt(newValue, 10);
  //     // verifica si el valor convertido es un número válido y no negativo

  //     if (!isNaN(parsedValue) && parsedValue >= 0) {
  //       setSegments((prevSegments) =>
  //         prevSegments.map((segment) =>
  //           segment.id === segmentId ? { ...segment, max: newValue } : segment
  //         )
  //       );
  //     }
  //   },
  //   []
  // );

  const handleSegmentMax = useCallback(
    (segmentId: string, newValue: string) => {
      const parsedValue = parseInt(newValue, 10); // Parse the input as a number
      // Check if the parsed value is a valid number and non-negative
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setSegments((prevSegments) =>
          prevSegments.map((segment) =>
            segment.id === segmentId
              ? { ...segment, max: parsedValue } // Assign the parsed number
              : segment
          )
        );
      } else {
        // Handle invalid input (e.g., show an error message)
        console.error("Invalid max value:", newValue);
      }
    },
    []
  );
  return (
    <>
      <div className="flex flex-col w-full items-center">
        {segments.map((s) => (
          <React.Fragment key={s.id}>
            <div className="flex items-center w-[80%] justify-between mb-8 gap-x-6">
              {/*  name? */}

              {/* <Input
                placeholder={String(rule.min) ?? "N/A"}
                onChange={(e) =>
                  handleMinChange(segmento.id, ruleId, e.target.value)
                }
              /> */}
              <Label>
                Segment Code 🤡
                <Input
                  className="mt-2"
                  placeholder={s.name ?? "Code..."}
                  onChange={(e) => handleSegmentCode(s.id, e.target.value)}
                ></Input>
              </Label>

              <Label>
                Segment Name
                <Input className="mt-2" placeholder="Name..."></Input>
              </Label>

              <Label>
                N. Elements
                <Input className="mt-2" placeholder="Element..."></Input>
              </Label>

              <Label>
                Usage
                <ComboboxDropdown
                  content={optionsUsage}
                  handleSelect={(status: IDropdown) => {
                    setSegments((prevSegments) =>
                      prevSegments.map((segment) =>
                        segment.id === s.id // Correct segment identification
                          ? { ...segment, mandatory: status.label === "M" } // Mapping to boolean
                          : segment
                      )
                    );
                  }}
                  selected={optionsUsage.find(
                    (o) => o.label === (s.mandatory ? "M" : "O")
                  )}
                />
              </Label>

              <Label>
                Max Use
                <Input
                  className="mt-2"
                  placeholder={String(s.max) ?? "Code..."}
                  onChange={(e) => handleSegmentMax(s.id, e.target.value)}
                />
              </Label>
            </div>
          </React.Fragment>
        ))}

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
              {segments.map((s) => (
                <React.Fragment key={s.id}>
                  {Object.entries(s.segment_rules).map(([ruleId, rule]) => (
                    <React.Fragment key={ruleId}>
                      <TableRow key={ruleId}>
                        <TableCell className="w-1">
                          <Button
                            onClick={() => toggleRow(ruleId)}
                            size={"icon"}
                            variant={"ghost"}
                            className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-none"
                          >
                            {openRows[ruleId] ? (
                              <ChevronDown />
                            ) : (
                              <ChevronRight />
                            )}
                          </Button>
                        </TableCell>

                        <TableCell className="font-medium ">{s.name}</TableCell>

                        <TableCell className=" px-20">
                          <ComboboxDropdown
                            key={`usage-${s.id}`}
                            content={optionsUsage}
                            handleSelect={(status: IDropdown) => {
                              setSegments((prev) =>
                                prev.map((s) =>
                                  s.id === s.id
                                    ? {
                                        ...s,
                                        segment_rules: {
                                          ...s.segment_rules,
                                          [ruleId]: {
                                            ...s.segment_rules[ruleId],
                                            mandatory: status.label === "M", // Convert to boolean
                                          },
                                        },
                                      }
                                    : s
                                )
                              );
                            }}
                            selected={optionsUsage.find(
                              (o) => o.label === (rule.mandatory ? "M" : "O") // Map to label
                            )}
                          />
                        </TableCell>

                        <TableCell className=" px-20">
                          <ComboboxDropdown
                            key={`type-${s.id}`}
                            content={optionsType}
                            handleSelect={(status: IDropdown) => {
                              setSegments((prev) =>
                                prev.map((s) =>
                                  s.id === s.id
                                    ? {
                                        ...s,
                                        segment_rules: {
                                          ...s.segment_rules,
                                          [ruleId]: {
                                            ...s.segment_rules[ruleId],
                                            type: status.label as
                                              | "ID"
                                              | "AN"
                                              | "DT"
                                              | "TM"
                                              | "SE"
                                              | "N0",
                                          },
                                        },
                                      }
                                    : s
                                )
                              );
                            }}
                            selected={optionsType.find(
                              (o) => o.label === rule.type
                            )}
                          />
                        </TableCell>

                        <TableCell className="w-[8%]">
                          <Input
                            placeholder={String(rule.min) ?? "N/A"}
                            onChange={(e) =>
                              handleMinChange(s.id, ruleId, e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell className="w-[8%]">
                          <Input
                            placeholder={String(rule.max) ?? ""}
                            onChange={(e) =>
                              handleMaxChange(s.id, ruleId, e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell className=" flex justify-end me-[2rem]">
                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                              addTagRow(ruleId);
                            }}
                          >
                            <PlusCircle className="h-7 w-7 text-white dark:text-black fill-green-500" />
                          </Button>
                        </TableCell>
                      </TableRow>

                      {openRows[ruleId] && (
                        <>
                          {(configRows[ruleId] || []).map((configRow) => (
                            <TableRow
                              key={configRow.id}
                              className="bg-slate-600/20"
                            >
                              <TableCell colSpan={7} className="">
                                <div className="flex justify-around items-center">
                                  {/* ... (ComboboxDropdown for type) */}

                                  <MultipleTagsInput
                                    key={`tags${s.id}-${ruleId}-${configRow.id}`}
                                    tags={rule.oneOf || []}
                                    onTagsChange={(newTags) =>
                                      handleTagsChange(s.id, ruleId, newTags)
                                    }
                                  />
                                  <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    className="h-8 w-8 rounded-full"
                                    onClick={() =>
                                      handleRemoveTagRow(ruleId, configRow.id)
                                    }
                                  >
                                    <MinusCircle className="h-7 w-7 text-slate-200 dark:text-slate-900 fill-red-500" />
                                  </Button>

                                  {/* ... (MinusCircle button to remove tag row) */}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="py-10 text-[10px]">
          <pre>{JSON.stringify(segments, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
