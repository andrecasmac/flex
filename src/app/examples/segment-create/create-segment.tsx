"use client";

import React, { useCallback, useState } from "react";
import { ComboboxDropdown } from "@/components/ui/combobox";
import MultipleTagsInput from "@/components/multiple-tags";

import { IDropdown, optionsUsage } from "../../../../types/segmentTypes";
import { ChevronRight, MinusCircle, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  SegmentRule,
  SegmentData,
  initialRuleByType,
  additionalRulesByType,
  optionsType,
  ruleNamesMap,
  optionsDTFormats,
  optionsTMFormats,
} from "../../../../types/segmentTypes"; // Asegúrate de tener este archivo de tipos

function SegmentGenerator() {
  const [segmentData, setSegmentData] = useState<SegmentData>({
    name: "ISA",
    mandatory: "M",
    max: 1,
    template: false,
    segment_rules: {},
  });

  const [numElements, setNumElements] = useState(0);
  const [showRules, setShowRules] = useState<{ [key: number]: boolean }>({});
  const [inputValue, setInputValue] = useState(""); // New state for input value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNumElementsChange(inputValue); // Use the stored inputValue
    }
  };

  const handleNumElementsChange = (value: string) => {
    const num = parseInt(value, 10) || 0;

    // Ensure num is within bounds (0 to some maximum, if applicable)
    const clampedNum = Math.max(0, Math.min(num, 25)); // Example max of 10

    const newSegmentRules: { [key: number]: SegmentRule } = {};
    for (let i = 1; i <= clampedNum; i++) {
      // Start at 1, not 0
      newSegmentRules[i] = segmentData.segment_rules[i] || {
        ...initialRuleByType,
        type: "",
      };
    }

    setNumElements(clampedNum);
    setSegmentData((prevData) => ({
      ...prevData,
      segment_rules: newSegmentRules,
    }));
  };

  const handleInputChangeMT = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setSegmentData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      // mandatory: selectedLabel === "M", // Convert label to boolean
    }));
  };

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
            ...prevData.segment_rules[Number(elementIndex)],
            oneOf: newTags,
          },
        },
      }));
    },
    []
  ); // Empty dependency array: memoize the function

  const toggleRules = (elementIndex: number) => {
    setShowRules((prevShowRules) => ({
      ...prevShowRules,
      [elementIndex]: !prevShowRules[elementIndex],
    }));
  };

  return (
    <div className="p-4 flex w-full gap-x-5 justify-center">
      <div className="flex flex-col w-[80%]">
        <div className="flex items-center justify-around w-full mb-8 gap-x-5">
          <Label>
            Segment Code
            <Input
              type="text"
              name="name"
              value={segmentData.name}
              onChange={handleInputChangeMT}
              className="mt-2"
            />
          </Label>

          <Label>
            Segment Name
            <Input className="mt-2" placeholder="Name..." />
          </Label>

          <Label>
            N. Elements
            <Input
              type="number"
              name="numElements"
              placeholder="Number of Elements"
              value={inputValue} // Bind input value to state
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="mt-2"
            />
          </Label>

          <Label>
            <span>Mandatory</span>
            <ComboboxDropdown
              content={optionsUsage}
              handleSelect={(option: IDropdown) => {
                setSegmentData((prev) => ({
                  ...prev,
                  mandatory: option.label,
                }));
              }}
              selected={optionsUsage.find(
                (option) => option.label === segmentData.mandatory
              )}
            />
          </Label>

          <Label>
            Max Use
            <Input
              className="mt-2"
              type="number"
              name="max"
              value={segmentData.max}
              onChange={handleInputChangeMT}
            />
          </Label>

          <Label>
            <span>Template</span>
            <Input
              className="mt-2"
              type="checkbox"
              name="template"
              checked={segmentData.template}
              onChange={handleInputChangeMT}
            />
          </Label>
        </div>

        <div className="w-full overflow-auto border rounded-xl">
          <Table className="p-2 w-full">
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
                          className="border border-gray-300 rounded-md "
                          type="number"
                          name="max"
                          placeholder="Max..."
                          onChange={(e) =>
                            handleRuleChange(
                              Number(elementIndex),
                              "max",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <Input
                          className="border border-gray-300 rounded-md p-2"
                          type="number"
                          name="min"
                          placeholder="Min..."
                          onChange={(e) =>
                            handleRuleChange(
                              Number(elementIndex),
                              "min",
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
        <pre className="pt-10 text-xs flex justify-center">
          {JSON.stringify(segmentData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default SegmentGenerator;
