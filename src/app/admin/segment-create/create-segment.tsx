"use client";

import React, { useCallback, useState } from "react";
import { ComboboxDropdown } from "@/components/ui/combobox";
import MultipleTagsInput from "@/components/multiple-tags";

import { IDropdown, optionsUsage } from "../../../types/segmentTypes";
import { ChevronRight } from "lucide-react";

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
} from "../../../types/segmentTypes";

import { createSegment } from "@/da/Segments/segment-da";

import { Prisma } from "@prisma/client";

interface SegmentGenerator {
  EDI_Id: string;
}

function SegmentGenerator({ EDI_Id }: SegmentGenerator) {
  const [segmentData, setSegmentData] = useState<SegmentData>({
    name: "ISA",
    mandatory: false,
    max: 1,
    template: true,
    isLoop: false,
    rules: {},
  });

  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "updating" | "success" | "error"
  >("idle");

  const MAX_ELEMENTS = 25; // Constant for maximum elements

  const [errorMessage, setErrorMessage] = useState<string | null>();

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
      newSegmentRules[i] = segmentData.rules[i] || {
        ...initialRuleByType,
        type: "",
      };
    }

    setNumElements(clampedNum);
    setSegmentData((prevData) => ({
      ...prevData,
      rules: newSegmentRules,
    }));
  };

  const handleAddElement = () => {
    const newNumElements = Math.min(
      numElements + (parseInt(inputValue) || 0),
      MAX_ELEMENTS
    );
    handleNumElementsChange(newNumElements.toString());
    setInputValue(""); // Clear input field after adding
  };

  const handleInputChangeMT = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSegmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRuleChange = (
    elementIndex: number,
    ruleName: string,
    value: string | number | boolean
  ) => {
    setSegmentData((prevData) => ({
      ...prevData,
      rules: {
        ...prevData.rules,
        [elementIndex]: {
          ...prevData.rules[elementIndex],
          [ruleName]: value,
        },
      },
    }));
  };

  const handleTypeChange = (elementIndex: number, newType: string) => {
    setSegmentData((prevData) => ({
      ...prevData,
      rules: {
        ...prevData.rules,
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

  // const handleTagsChange = useCallback(
  //   (elementIndex: string, newTags: string[]) => {
  //     setSegmentData((prevData) => ({
  //       ...prevData,
  //       rules: {
  //         ...prevData.rules,
  //         [elementIndex]: {
  //           ...prevData.rules[elementIndex],
  //           oneOf: newTags,
  //         },
  //       },
  //     }));
  //   },
  //   []
  // ); // Empty dependency array: memoize the function

  const handleTagsChange = useCallback(
    (elementIndex: string, newTags: string[]) => {
      setSegmentData((prevData) => ({
        ...prevData,
        rules: {
          ...prevData.rules,
          [elementIndex]: {
            ...prevData.rules[elementIndex],
            oneOf: newTags, // Ensure oneOf is stored as an array
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

  const convertSegmentRuleToJson: any = (obj: any, seen = new WeakSet()) => {
    if (typeof obj === "object" && obj !== null) {
      if (seen.has(obj)) {
        return "[Circular Reference]"; // Or any other placeholder
      }
      seen.add(obj);

      if (Array.isArray(obj)) {
        return obj.map((item) => convertSegmentRuleToJson(item, seen));
      }

      const result: Prisma.JsonObject = {};
      for (const key in obj) {
        result[key] = convertSegmentRuleToJson(obj[key], seen);
      }
      return result;
    }
    return obj; // Return primitive values as-is
  };

  const postSegment = async () => {
    setUpdateStatus("updating");

    try {
      await createSegment(
        segmentData.name,
        segmentData.template,
        Number(segmentData.max),
        segmentData.mandatory,
        segmentData.isLoop,
        EDI_Id,
        convertSegmentRuleToJson(segmentData.rules)
      );

      setUpdateStatus("success");

      // console.log("success");
    } catch (error: unknown) {
      // Explicitly type error as unknown
      setUpdateStatus("error");

      if (error instanceof Error) {
        // Check if error is an Error object
        setErrorMessage(error.message);
        console.error("Error creating segment:", error);
      } else {
        // Handle non-Error cases (if needed)
        setErrorMessage("An unexpected error occurred.");
        console.error("Unknown error creating segment:", error);
      }
    }
  };
  return (
    <div className="flex w-[80%] gap-x-5 justify-center">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between px-2 w-full mb-8 gap-x-5">
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
            <Input className="mt-2" type="text" placeholder="Name..." />
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
            <div className="mt-2">
              <ComboboxDropdown
                content={optionsUsage}
                handleSelect={(option: IDropdown) => {
                  setSegmentData((prev) => ({
                    ...prev,
                    mandatory: option.label === "M",
                  }));
                }}
                selected={optionsUsage.find(
                  (option) =>
                    option.label === (segmentData.mandatory ? "M" : "O")
                )}
              />
            </div>
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
            <Button variant="default" onClick={handleAddElement}>
              Add Elements
            </Button>
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
              {Object.keys(segmentData.rules).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center opacity-40">
                    No elements. Please add elements.
                  </TableCell>
                </TableRow>
              ) : (
                Object.keys(segmentData.rules).map((elementIndex) => {
                  const currentElement =
                    segmentData.rules[Number(elementIndex)];
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
                                showRules[Number(elementIndex)]
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </Button>
                        </TableCell>

                        <TableCell className="font-medium ">
                          {segmentData.name + " " + elementIndex}
                        </TableCell>

                        <TableCell>
                          {/* <ComboboxDropdown
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
                                segmentData.rules[Number(elementIndex)]
                                  .mandatory
                            )}
                          /> */}
                          <ComboboxDropdown
                            content={optionsUsage}
                            handleSelect={(selectedOption: IDropdown) => {
                              handleRuleChange(
                                Number(elementIndex),
                                "mandatory",
                                selectedOption.label === "M" // Convert label to boolean
                              );
                            }}
                            selected={optionsUsage.find(
                              (option) =>
                                option.label ===
                                (segmentData.rules[Number(elementIndex)]
                                  .mandatory
                                  ? "M"
                                  : "O")
                            )}
                          />
                        </TableCell>

                        <TableCell>
                          <ComboboxDropdown
                            content={optionsType}
                            handleSelect={(option: IDropdown) =>
                              handleTypeChange(
                                Number(elementIndex),
                                option.label
                              )
                            }
                            selected={optionsType.find(
                              (option) =>
                                option.label ===
                                segmentData.rules[Number(elementIndex)].type
                            )}
                          />
                        </TableCell>

                        <TableCell>
                          <Input
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

                        <TableCell>
                          <Input
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
                                                      segmentData.rules[
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
                                                      segmentData.rules[
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
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center pt-10">
          <Button
            variant={"default"}
            onClick={() => {
              postSegment();
            }}
            disabled={updateStatus === "updating"} // Disable while updating
          >
            {updateStatus === "updating" ? "Saving..." : "Save Segment"}
          </Button>
          {updateStatus === "error" && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>

        {/* <pre className="pt-10 text-xs flex justify-center">
          {JSON.stringify(segmentData, null, 2)}
        </pre> */}
      </div>
    </div>
  );
}

export default SegmentGenerator;
