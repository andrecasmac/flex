"use client";

import React, { useCallback, useState, useEffect } from "react";
import { ComboboxDropdown } from "@/components/ui/combobox";
import MultipleTagsInput from "@/components/multiple-tags";

import { IDropdown, optionsUsage } from "../../../../types/segmentTypes";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  SegmentData,
  initialRuleByType,
  additionalRulesByType,
  optionsType,
  ruleNamesMap,
  optionsDTFormats,
  optionsTMFormats,
} from "../../../../types/segmentTypes";

interface SegmentEditProps {
  initialSegmentData: SegmentData;
}

function SegmentEdit({ initialSegmentData }: SegmentEditProps) {
  const [segmentData, setSegmentData] =
    useState<SegmentData>(initialSegmentData);

  const [numElements, setNumElements] = useState(
    Object.keys(initialSegmentData.segment_rules).length
  );

  const [showRules, setShowRules] = useState<{ [key: number]: boolean }>(() => {
    const initialShowRules: { [key: number]: boolean } = {};
    Object.keys(initialSegmentData.segment_rules).forEach((key) => {
      initialShowRules[Number(key)] = true;
    });
    return initialShowRules;
  });

  useEffect(() => {
    setNumElements(Object.keys(segmentData.segment_rules).length);
    const newShowRules: { [key: number]: boolean } = {};
    Object.keys(segmentData.segment_rules).forEach((key) => {
      newShowRules[Number(key)] = true;
    });
    setShowRules(newShowRules);
  }, [segmentData]);

  const handleRuleChange = (
    elementIndex: number,
    ruleName: string,
    value: string | number | boolean
  ) => {
    setSegmentData((prevData) => ({
      ...prevData,
      segment_rules: {
        ...prevData.segment_rules,
        [elementIndex]: {
          ...prevData.segment_rules[elementIndex],
          [ruleName]: value,
        },
      },
    }));
  };

  const handleTypeChange = (elementIndex: number, newType: string) => {
    setSegmentData((prevData) => ({
      ...prevData,
      segment_rules: {
        ...prevData.segment_rules,
        [elementIndex]: {
          ...initialRuleByType,
          ...additionalRulesByType[newType].rules,
          type: newType,
        },
      },
    }));

    setShowRules((prevShowRules) => ({
      ...prevShowRules,
      [elementIndex]: true,
    }));
  };

  const handleTagsChange = useCallback(
    (elementIndex: string, newTags: string[]) => {
      setSegmentData((prevData) => ({
        ...prevData,
        segment_rules: {
          ...prevData.segment_rules,
          [elementIndex]: {
            ...prevData.segment_rules[elementIndex],
            oneOf: newTags,
          },
        },
      }));
    },
    []
  );

  const toggleRules = (elementIndex: number) => {
    setShowRules((prevShowRules) => ({
      ...prevShowRules,
      [elementIndex]: !prevShowRules[elementIndex],
    }));
  };

  return (
    <div className="flex w-[80%] gap-x-5 justify-center">
      <div className="flex flex-col w-full">
        <div className="overflow-auto border rounded-xl">
          <Table className="p-2 ">
            <TableHeader className="bg-turquoise dark:bg-cyan-950">
              <TableRow>
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
              {Object.keys(segmentData.segment_rules).map((elementIndex) => {
                const currentElement =
                  segmentData.segment_rules[Number(elementIndex)];
                const allowedRules =
                  additionalRulesByType[currentElement.type]?.allowedRules ||
                  [];

                return (
                  <React.Fragment key={elementIndex}>
                    <TableRow key={elementIndex}>
                      <TableCell className="w-1">
                        <Button
                          className="flex items-center space-x-2 "
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => toggleRules(Number(elementIndex))}
                        >
                          <ChevronRight
                            className={`transition-transform transform ${
                              showRules[Number(elementIndex)] ? "rotate-90" : ""
                            }`}
                          />
                        </Button>
                      </TableCell>

                      <TableCell className="font-medium ">
                        {segmentData.name + " " + elementIndex}
                      </TableCell>

                      <TableCell>
                        <ComboboxDropdown
                          content={optionsUsage}
                          handleSelect={(selectedOption: IDropdown) => {
                            handleRuleChange(
                              Number(elementIndex),
                              "mandatory",
                              selectedOption.label
                            );
                          }}
                          selected={optionsUsage.find(
                            (option) =>
                              option.label ===
                              segmentData.segment_rules[Number(elementIndex)]
                                .mandatory
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <ComboboxDropdown
                          content={optionsType}
                          handleSelect={(option: IDropdown) =>
                            handleTypeChange(Number(elementIndex), option.label)
                          }
                          selected={optionsType.find(
                            (option) =>
                              option.label ===
                              segmentData.segment_rules[Number(elementIndex)]
                                .type
                          )}
                        />
                      </TableCell>

                      <TableCell>
                        <Input
                          type="number"
                          name="min"
                          placeholder="Min..."
                          value={currentElement.min || ""}
                          onChange={(e) =>
                            handleRuleChange(
                              Number(elementIndex),
                              "min",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <Input
                          type="number"
                          name="max"
                          placeholder="Max..."
                          value={currentElement.max || ""}
                          onChange={(e) =>
                            handleRuleChange(
                              Number(elementIndex),
                              "max",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>

                    {showRules[Number(elementIndex)] && (
                      <>
                        {Object.keys(currentElement)
                          .filter(
                            (ruleName) =>
                              !["type", "mandatory", "min", "max"].includes(
                                ruleName
                              )
                          )
                          .map((ruleName) => (
                            <React.Fragment key={ruleName}>
                              <TableRow
                                className="bg-slate-600/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <TableCell colSpan={7}>
                                  <span className="w-full flex items-center justify-center gap-x-5 px-2">
                                    {ruleNamesMap[ruleName] || ruleName}

                                    {(() => {
                                      switch (ruleName) {
                                        case "oneOf":
                                          return (
                                            <div className="w-[50%] flex justify-around">
                                              <MultipleTagsInput
                                                key={`tags${currentElement}-${ruleName}`}
                                                tags={
                                                  (currentElement[
                                                    ruleName
                                                  ] as []) || []
                                                }
                                                onTagsChange={(newTags) =>
                                                  handleTagsChange(
                                                    elementIndex,
                                                    newTags
                                                  )
                                                }
                                              />
                                            </div>
                                          );

                                        case "dateHasFormat":
                                          return (
                                            <div className="w-[50%]">
                                              <ComboboxDropdown
                                                content={optionsDTFormats}
                                                handleSelect={(
                                                  selectedOption: IDropdown
                                                ) => {
                                                  handleRuleChange(
                                                    Number(elementIndex),
                                                    "dateHasFormat",
                                                    selectedOption.label
                                                  );
                                                }}
                                                selected={optionsDTFormats.find(
                                                  (option) =>
                                                    option.label ===
                                                    segmentData.segment_rules[
                                                      Number(elementIndex)
                                                    ].dateHasFormat
                                                )}
                                              />
                                            </div>
                                          );

                                        case "timeHasFormat":
                                          return (
                                            <div className="w-[50%]">
                                              <ComboboxDropdown
                                                content={optionsTMFormats}
                                                handleSelect={(
                                                  selectedOption: IDropdown
                                                ) => {
                                                  handleRuleChange(
                                                    Number(elementIndex),
                                                    "timeHasFormat",
                                                    selectedOption.label
                                                  );
                                                }}
                                                selected={optionsTMFormats.find(
                                                  (option) =>
                                                    option.label ===
                                                    segmentData.segment_rules[
                                                      Number(elementIndex)
                                                    ].timeHasFormat
                                                )}
                                              />
                                            </div>
                                          );

                                        default:
                                          return (
                                            <div className="w-[50%] flex justify-around">
                                              <Input
                                                className="border border-gray-300 rounded-md p-2 flex-grow"
                                                type="text"
                                                name={ruleName}
                                                placeholder={ruleName}
                                                value={
                                                  currentElement[
                                                    ruleName
                                                  ] as string
                                                }
                                                onChange={(e) =>
                                                  handleRuleChange(
                                                    Number(elementIndex),
                                                    ruleName,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>
                                          );
                                      }
                                    })()}
                                  </span>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
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
        <pre className="pt-10 text-xs flex justify-center">
          {JSON.stringify(segmentData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default SegmentEdit;
