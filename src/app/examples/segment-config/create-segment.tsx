"use client";

import React, { useState, useCallback } from "react";
import { ComboboxDropdown } from "@/components/ui/combobox";
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
  SegmentT,
  ConfigRows,
  optionsConfigID,
  optionsConfigDT,
  optionsConfigAN,
  optionsConfigNO,
  optionsConfigR,
  optionsConfigSE,
  optionsConfigTM,
  ConfigRowByType,
  SegmentRule,
} from "../../../../types/segmentTypes/segmentTypes";

export function CreateSegments() {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [configRows, setConfigRows] = useState<Record<string, ConfigRows[]>>(
    {}
  );

  const [configRowsT, setConfigRowsT] = useState<ConfigRowByType>({
    ID: [],
    DT: [],
    TM: [],
    AN: [],
    R: [],
    N0: [],
    N1: [],
    N2: [],
    N3: [],
    N4: [],
    N5: [],
    N6: [],
    SE: [],
    "": [],
  });

  const [segments, setSegments] = useState<SegmentT[]>([
    {
      name: "ISA",
      mandatory: true,
      max: 1,
      template: false,
      segment_rules: {},
    },
  ]);

  const optionsConfig: Record<string, IDropdown[]> = {
    ID: optionsConfigID,
    AN: optionsConfigAN,
    DT: optionsConfigDT,
    TM: optionsConfigTM,
    SE: optionsConfigSE,
    R: optionsConfigR,
    N0: optionsConfigNO,
  };

  function addSegmentRule(segmentIndex: number) {
    const n = parseInt(inputValue, 10);
    if (isNaN(n) || n < 0) return;

    setSegments((prevSegments) =>
      prevSegments.map((segment, index) => {
        if (index !== segmentIndex) return segment;

        const newSegmentRules = { ...segment.segment_rules };
        const currentRuleCount = Object.keys(newSegmentRules).length;

        if (n > currentRuleCount) {
          for (let i = 0; i < n - currentRuleCount; i++) {
            newSegmentRules[currentRuleCount + i + 1] = {
              mandatory: true,
              min: 1,
              max: 1,
              type: "",
            };
          }
        } else if (n < currentRuleCount) {
          for (let i = currentRuleCount; i > n; i--) {
            delete newSegmentRules[i];
          }
        }

        return { ...segment, segment_rules: newSegmentRules };
      })
    );
  }

  const toggleRow = useCallback((id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  function addConfigRow(ruleId: string, type: keyof ConfigRowByType) {
    if (type === "") {
      alert("Please select the data type first.");
      return;
    }
    const maxAllowed = optionsConfig[type].length;

    console.log(maxAllowed);
    const currentRows = configRowsT[type] || [];

    if (currentRows.length >= maxAllowed) {
      alert("Cannot add more config rows than allowed.");
      return;
    }

    setConfigRowsT((prevRulesRows) => ({
      ...prevRulesRows,
      [type]: [
        // <-- Usar el tipo como clave para el arreglo
        ...(prevRulesRows[type] || []),
        { id: self.crypto.randomUUID(), ruleId }, // <-- Objeto base sin campos específicos
      ],
    }));
    setOpenRows((prev) => ({ ...prev, [ruleId]: true }));
  }

  // function addConfigRow(ruleId: string, type: keyof ConfigRowByType) {
  //   if (type === "") {
  //     alert("Please select the data type first.");
  //     return;
  //   }

  //   const maxAllowed = optionsConfig[type].length;

  //   setConfigRowsT((prevConfigRowsT) => {
  //     const currentRowsForRule =
  //       prevConfigRowsT[type]?.filter((row) => row.ruleId === ruleId) || [];

  //     if (currentRowsForRule.length >= maxAllowed) {
  //       alert("Cannot add more config rows than allowed for this rule.");
  //       return prevConfigRowsT; // Return the previous state to prevent changes
  //     }

  //     // Update only the specific rule's config rows, preserving the order
  //     const updatedRowsForType = prevConfigRowsT[type]?.map(
  //       (row) =>
  //         row.ruleId === ruleId
  //           ? [...currentRowsForRule, { id: self.crypto.randomUUID(), ruleId }] // Add to current rule
  //           : row // Keep other rules' rows as-is
  //     ) || [{ id: self.crypto.randomUUID(), ruleId }]; // If no rows exist for this type yet, add the new one

  //     return {
  //       ...prevConfigRowsT,
  //       [type]: updatedRowsForType,
  //     };
  //   });

  //   setOpenRows((prev) => ({ ...prev, [ruleId]: true }));
  // }

  const handleRemoveConfigRow = useCallback(
    (type: keyof ConfigRowByType, configRowId: string) => {
      setConfigRowsT((prevConfigRowsT) => ({
        ...prevConfigRowsT,
        [type]: prevConfigRowsT[type]?.filter((row) => row.id !== configRowId),
      }));
    },
    []
  );

  const handleTagsChange = useCallback(
    (segmentIndex: number, ruleNumber: string, newTags: string[]) => {
      setSegments((prevSegments) =>
        prevSegments.map((segment, index) =>
          index === segmentIndex
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

  const handleEqualChange = useCallback(
    (segmentIndex: number, ruleNumber: string, equalTo: string) => {
      setSegments((prevSegments) =>
        prevSegments.map((segment, index) =>
          index === segmentIndex
            ? {
                ...segment,
                segment_rules: {
                  ...segment.segment_rules,
                  [ruleNumber]: {
                    ...segment.segment_rules[ruleNumber],
                    isEqual: equalTo,
                  },
                },
              }
            : segment
        )
      );
    },
    []
  );

  const handleMinChange = useCallback(
    (segmentIndex: number, ruleId: string, newValue: string) => {
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setSegments((prevSegments) =>
          prevSegments.map((segment, index) =>
            index === segmentIndex
              ? {
                  ...segment,
                  segment_rules: {
                    ...segment.segment_rules,
                    [ruleId]: {
                      ...segment.segment_rules[ruleId],
                      min: parsedValue,
                    },
                  },
                }
              : segment
          )
        );
      }
    },
    []
  );

  const handleMaxChange = useCallback(
    (segmentIndex: number, ruleId: string, newValue: string) => {
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setSegments((prevSegments) =>
          prevSegments.map((segment, index) =>
            index === segmentIndex
              ? {
                  ...segment,
                  segment_rules: {
                    ...segment.segment_rules,
                    [ruleId]: {
                      ...segment.segment_rules[ruleId],
                      max: parsedValue,
                    },
                  },
                }
              : segment
          )
        );
      }
    },
    []
  );

  const handleSegmentCode = useCallback(
    (segmentIndex: number, newName: string) => {
      setSegments((prevSegments) =>
        prevSegments.map((segment, index) =>
          index === segmentIndex
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

  const handleSegmentMax = useCallback(
    (segmentIndex: number, newValue: string) => {
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue) && parsedValue >= 0) {
        setSegments((prevSegments) =>
          prevSegments.map((segment, index) =>
            index === segmentIndex ? { ...segment, max: parsedValue } : segment
          )
        );
      } else {
        console.error("Invalid max value:", newValue);
      }
    },
    []
  );

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      addSegmentRule(index);
    }
  };

  const handleSelectType = useCallback(
    (segmentIndex: number, ruleId: string, newType: SegmentRule["type"]) => {
      const typesWithoutConfigRows = ["N1", "N2", "N3", "N4", "N5", "N6"];
      setSegments((prevSegments) =>
        prevSegments.map((segment, index) =>
          index === segmentIndex
            ? {
                ...segment,
                segment_rules: {
                  ...segment.segment_rules,
                  [ruleId]: {
                    ...segment.segment_rules[ruleId],
                    type: newType,
                    ...(typesWithoutConfigRows.includes(newType) ? {} : {}),
                  },
                },
              }
            : segment
        )
      );
      if (typesWithoutConfigRows.includes(newType)) {
        setConfigRowsT((prev) => {
          const updated = { ...prev };
          updated[newType] = updated[newType].filter(
            (row) => row.ruleId !== ruleId
          );
          return updated;
        });
      }
    },
    []
  );

  const [selectedConfig, setSelectedConfig] = useState<
    Record<string, IDropdown | null>
  >({}); // State for all selections

  const changeStatus = (ruleId: string, status: IDropdown) => {
    setSelectedConfig((prev) => ({ ...prev, [ruleId]: status }));
  };

  return (
    <>
      <div className="flex flex-col w-full items-center">
        {segments.map((s, segmentIndex) => (
          <React.Fragment key={segmentIndex}>
            <div className="flex items-center w-[80%] justify-between mb-8 gap-x-6">
              <Label>
                Segment Code
                <Input
                  className="mt-2"
                  placeholder={s.name ?? "Code..."}
                  onChange={(e) =>
                    handleSegmentCode(segmentIndex, e.target.value)
                  }
                />
              </Label>
              <Label>
                Segment Name
                <Input className="mt-2" placeholder="Name..." />
              </Label>
              <Label>
                N. Elements
                <Input
                  className="mt-2"
                  placeholder="Element..."
                  //   onChange={(e) => addSegmentRule(segmentIndex, e.target.value)}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyPress(e, segmentIndex)}
                />
              </Label>
              <Label>
                Usage
                <ComboboxDropdown
                  content={optionsUsage}
                  handleSelect={(status: IDropdown) => {
                    setSegments((prevSegments) =>
                      prevSegments.map((segment, index) =>
                        index === segmentIndex
                          ? { ...segment, mandatory: status.label === "M" }
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
                  onChange={(e) =>
                    handleSegmentMax(segmentIndex, e.target.value)
                  }
                />
              </Label>
              <Button
                variant={"default"}
                onClick={() => addSegmentRule(segmentIndex)}
              >
                Add Rows
              </Button>
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
              {segments.map((s, segmentIndex) => (
                <React.Fragment key={segmentIndex}>
                  {Object.entries(s.segment_rules).map(([ruleId, rule]) => (
                    <React.Fragment key={`${segmentIndex}-${ruleId}`}>
                      <TableRow key={`${segmentIndex}-${ruleId}`}>
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
                            key={`usage-${segmentIndex}-${ruleId}`}
                            content={optionsUsage}
                            handleSelect={(status: IDropdown) => {
                              setSegments((prev) =>
                                prev.map((segment, index) =>
                                  index === segmentIndex
                                    ? {
                                        ...segment,
                                        segment_rules: {
                                          ...segment.segment_rules,
                                          [ruleId]: {
                                            ...segment.segment_rules[ruleId],
                                            mandatory: status.label === "M",
                                          },
                                        },
                                      }
                                    : segment
                                )
                              );
                            }}
                            selected={optionsUsage.find(
                              (o) => o.label === (rule.mandatory ? "M" : "O")
                            )}
                          />
                        </TableCell>
                        <TableCell className=" px-20">
                          <ComboboxDropdown
                            key={`type-${segmentIndex}-${ruleId}`}
                            content={optionsType}
                            handleSelect={(status: IDropdown) => {
                              handleSelectType(
                                segmentIndex,
                                ruleId,
                                status.label as
                                  | "ID"
                                  | "AN"
                                  | "DT"
                                  | "TM"
                                  | "SE"
                                  | "R"
                                  | "N0"
                                  | "N1"
                                  | "N2"
                                  | "N3"
                                  | "N4"
                                  | "N5"
                                  | "N6"
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
                              handleMinChange(
                                segmentIndex,
                                ruleId,
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="w-[8%]">
                          <Input
                            placeholder={String(rule.max) ?? ""}
                            onChange={(e) =>
                              handleMaxChange(
                                segmentIndex,
                                ruleId,
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {rule.type !== "N1" &&
                          rule.type !== "N2" &&
                          rule.type !== "N3" &&
                          rule.type !== "N4" &&
                          rule.type !== "N5" &&
                          rule.type !== "N6" ? (
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              className="h-8 w-8 rounded-full flex"
                              onClick={() => {
                                console.log(rule.type);
                                addConfigRow(ruleId, rule.type);
                              }}
                            >
                              <PlusCircle className="h-7 w-7 text-white dark:text-black fill-green-500" />
                            </Button>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      </TableRow>
                      {openRows[ruleId] && (
                        <>
                          {(configRowsT[rule.type] || []).map((configRow) => (
                            <TableRow
                              key={`${ruleId}-${configRow.id}`}
                              className="bg-slate-600/20"
                            >
                              <TableCell colSpan={7} className="">
                                <div className="flex justify-around items-center">
                                  {(() => {
                                    switch (rule.type) {
                                      case "AN":
                                        return (
                                          <>
                                            <div className="flex justify-around items-center w-full">
                                              <div> Code </div>

                                              <div className="w-[30%]">
                                                <ComboboxDropdown
                                                  content={optionsConfigAN}
                                                  handleSelect={(
                                                    status: IDropdown
                                                  ) => {
                                                    changeStatus(
                                                      configRow.id,
                                                      status
                                                    );
                                                  }}
                                                  selected={
                                                    selectedConfig[configRow.id]
                                                  }
                                                />
                                              </div>

                                              {selectedConfig[configRow.id]
                                                ?.label === "is one of" ? (
                                                <MultipleTagsInput
                                                  key={`tags${ruleId}-${configRow.id}`}
                                                  tags={rule.oneOf || []}
                                                  onTagsChange={(newTags) =>
                                                    handleTagsChange(
                                                      segmentIndex,
                                                      ruleId,
                                                      newTags
                                                    )
                                                  }
                                                />
                                              ) : (
                                                <div className="w-[35%]">
                                                  <Input
                                                    placeholder="equal to..."
                                                    onChange={(e) =>
                                                      handleEqualChange(
                                                        segmentIndex,
                                                        ruleId,
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          </>
                                        );

                                      case "DT":
                                        return (
                                          <>
                                            <div> {rule.type}</div>
                                          </>
                                        );

                                      case "ID":
                                        return (
                                          <>
                                            <div>{rule.type}</div>
                                          </>
                                        );

                                      case "TM":
                                        return (
                                          <>
                                            <div>{rule.type}</div>
                                          </>
                                        );

                                      case "SE":
                                        return (
                                          <>
                                            <div>{rule.type}</div>
                                          </>
                                        );

                                      case "R":
                                        return (
                                          <>
                                            <div>{rule.type}</div>
                                          </>
                                        );

                                      case "N0":
                                        return (
                                          <>
                                            <div>{rule.type}</div>
                                          </>
                                        );
                                      default:
                                        break;
                                    }
                                  })()}

                                  <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => {
                                      handleRemoveConfigRow(
                                        rule.type as keyof ConfigRowByType, // <-- Aserción de tipo
                                        configRow.id
                                      );
                                    }}
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
