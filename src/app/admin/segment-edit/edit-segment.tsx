"use client";

import React, { useCallback, useState, useEffect } from "react";
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
  SegmentData,
  initialRuleByType,
  additionalRulesByType,
  optionsType,
  ruleNamesMap,
  optionsDTFormats,
  optionsTMFormats,
  SegmentRule,
} from "../../../types/segmentTypes";

import { updateSegmentRule } from "@/da/Segments/segment-da";

interface SegmentEditProps {
  initialSegmentData: SegmentData;
  segmentId: string;
}

function SegmentEdit({ initialSegmentData, segmentId }: SegmentEditProps) {
  const [segmentData, setSegmentData] =
    useState<SegmentData>(initialSegmentData);

  const [numElements, setNumElements] = useState(
    Object.keys(initialSegmentData.rules).length
  );

  const [showRules, setShowRules] = useState<{ [key: number]: boolean }>(() => {
    const initialShowRules: { [key: number]: boolean } = {};
    Object.keys(initialSegmentData.rules).forEach((key) => {
      initialShowRules[Number(key)] = true;
    });
    return initialShowRules;
  });

  const [inputValue, setInputValue] = useState(""); // New state for input value

  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "updating" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState<string | null>();

  useEffect(() => {
    setNumElements(Object.keys(segmentData.rules).length);
    const newShowRules: { [key: number]: boolean } = {};
    Object.keys(segmentData.rules).forEach((key) => {
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
      rules: {
        ...prevData.rules,
        [elementIndex]: {
          ...prevData.rules[elementIndex],
          [ruleName]: value,
        },
      },
    }));
  };

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
  const handleInputChangeMT = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSegmentData((prevData) => ({
      ...prevData,
      [name]: value,
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

  const handleTagsChange = useCallback(
    (elementIndex: string, newTags: string[]) => {
      setSegmentData((prevData) => ({
        ...prevData,
        rules: {
          ...prevData.rules,
          [elementIndex]: {
            ...prevData.rules[elementIndex],
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

  const handleSaveSegment = async () => {
    setUpdateStatus("updating");

    try {
      const updatedRules: any = segmentData.rules;

      // Filter rules to remove empty/undefined values
      for (const key in updatedRules) {
        const rule = updatedRules[key];
        Object.keys(rule).forEach((ruleKey) => {
          if (rule[ruleKey] === "" || rule[ruleKey] === undefined) {
            delete rule[ruleKey];
          }
        });
      }

      // Update the segment rules in the database
      const response = await updateSegmentRule(
        segmentId,
        updatedRules,
        segmentData.name
      );

      if (response) {
        // Success - you could show a confirmation message to the user here
        // console.log("Segment updated successfully:", response);
        // alert("Segment updated successfully");
        setUpdateStatus("success");
      } else {
        // Handle the error from the controller (if any)
        console.error("Failed to update segment.");
        setUpdateStatus("error");
      }
    } catch (error) {
      // Handle any network or other errors that occur during the request
      console.error("Error updating segment:", error);
      // You could display a generic error message to the user
    }
  };

  return (
    <div className="flex w-[80%] gap-x-5 justify-center">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-around px-2 w-full mb-8 gap-x-5">
          <div className="w-[25%]">
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
          </div>

          <div className="w-[25%]">
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
          </div>
        </div>
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
              {Object.keys(segmentData.rules).map((elementIndex) => {
                const currentElement = segmentData.rules[Number(elementIndex)];
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
                              (segmentData.rules[Number(elementIndex)].mandatory
                                ? "M"
                                : "O")
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
                              segmentData.rules[Number(elementIndex)].type
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
              })}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center pt-10">
          {/* <Button
            variant={"default"}
            onClick={() => {
              alert("no hace nada");
            }}
          >
            Save Segment
          </Button> */}
          <Button
            variant={"default"}
            onClick={() => {
              handleSaveSegment();
            }} // Call the handler on button click
            disabled={updateStatus === "updating"} // Disable while updating
          >
            {updateStatus === "updating" ? "Saving..." : "Save Segment"}
          </Button>
          {updateStatus === "error" && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>
        <pre className="pt-10 text-xs flex justify-center">
          {JSON.stringify(segmentData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default SegmentEdit;
