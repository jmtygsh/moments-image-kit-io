"use client";

import {useEffect, useState} from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import {Bot, Brain, Check, Crop, Sparkles, Wand2} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {AiMagic} from "@/types/image-transformations";

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

interface ImageAiMagicPanelProps {
  aiMagic: AiMagic;
  onChange: (aiMagic: AiMagic) => void;
}

export function ImageAiMagicPanel({aiMagic, onChange}: ImageAiMagicPanelProps) {
  const updateAiMagic = (updates: Partial<AiMagic>) => {
    onChange({...aiMagic, ...updates});
  };

  const updateBackground = (
    bgUpdates: Partial<NonNullable<AiMagic["background"]>>
  ) => {
    updateAiMagic({
      background: {...aiMagic.background, ...bgUpdates},
    });
  };

  const updateEditing = (
    editUpdates: Partial<NonNullable<AiMagic["editing"]>>
  ) => {
    updateAiMagic({
      editing: {...aiMagic.editing, ...editUpdates},
    });
  };

  const updateShadowLighting = (
    shadowUpdates: Partial<NonNullable<AiMagic["shadowLighting"]>>
  ) => {
    updateAiMagic({
      shadowLighting: {...aiMagic.shadowLighting, ...shadowUpdates},
    });
  };

  const updateGeneration = (
    genUpdates: Partial<NonNullable<AiMagic["generation"]>>
  ) => {
    updateAiMagic({
      generation: {...aiMagic.generation, ...genUpdates},
    });
  };

  const updateCropping = (
    croppingUpdates: Partial<NonNullable<AiMagic["cropping"]>>
  ) => {
    updateAiMagic({
      cropping: {...aiMagic.cropping, ...croppingUpdates},
    });
  };

  const resetAll = () => {
    onChange({});
  };

  // Add these state variables at the top of your component
  const [changePromptValue, setChangePromptValue] = useState(
    aiMagic.background?.changePrompt || ""
  );
  const [generativeFillValue, setGenerativeFillValue] = useState(
    aiMagic.background?.generativeFill?.prompt || ""
  );

  const [editPromptValue, setEditPromptValue] = useState(
    aiMagic.editing?.prompt || ""
  );

  const [generationPromptValue, setGenerationPromptValue] = useState(
    aiMagic.generation?.textPrompt || ""
  );

  const [objectNameValue, setObjectNameValue] = useState(
    aiMagic.cropping?.objectName || ""
  );

  // Add useEffect to sync local state with aiMagic changes
  useEffect(() => {
    setGenerationPromptValue(aiMagic.generation?.textPrompt || "");
  }, [aiMagic.generation?.textPrompt]);

  // Update local state when aiMagic changes
  useEffect(() => {
    setChangePromptValue(aiMagic.background?.changePrompt || "");
  }, [aiMagic.background?.changePrompt]);

  useEffect(() => {
    setGenerativeFillValue(aiMagic.background?.generativeFill?.prompt || "");
  }, [aiMagic.background?.generativeFill?.prompt]);

  useEffect(() => {
    setEditPromptValue(aiMagic.editing?.prompt || "");
  }, [aiMagic.editing?.prompt]);

  useEffect(() => {
    setObjectNameValue(aiMagic.cropping?.objectName || "");
  }, [aiMagic.cropping?.objectName]);

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full space-y-2">
        {/* Background AI */}
        <AccordionItem value="background" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>Background AI</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox.Root
                checked={aiMagic.background?.remove || false}
                onCheckedChange={checked =>
                  updateBackground({remove: checked === true})
                }
                className={`${inputStyles}`}
                style={gradientBg}
              >
                <Checkbox.Indicator>
                  <Check className="h-4 w-4" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Label className="text-xs font-medium">Remove Background</Label>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Background Removal Mode
              </Label>
              <Select
                value={aiMagic.background?.mode || "standard"}
                onValueChange={(value: "standard" | "economy") =>
                  updateBackground({mode: value})
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Change Background Prompt
              </Label>
              <Input
                value={changePromptValue}
                onChange={e => setChangePromptValue(e.target.value)}
                onBlur={e => updateBackground({changePrompt: e.target.value})}
                placeholder="Add a snow background"
                className={inputStyles}
                style={gradientBg}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-medium">Generative Fill</Label>
              <Input
                value={generativeFillValue}
                onChange={e => setGenerativeFillValue(e.target.value)}
                onBlur={e =>
                  updateBackground({
                    generativeFill: {
                      ...aiMagic.background?.generativeFill,
                      prompt: e.target.value,
                      width:
                        aiMagic.background?.generativeFill?.width ||
                        (e.target.value.trim() ? 500 : undefined),
                      height:
                        aiMagic.background?.generativeFill?.height ||
                        (e.target.value.trim() ? 500 : undefined),
                      cropMode:
                        aiMagic.background?.generativeFill?.cropMode ||
                        "pad_resize",
                    },
                  })
                }
                placeholder="add bird"
                className={inputStyles}
                style={gradientBg}
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Width</Label>
                  <Input
                    type="number"
                    value={aiMagic.background?.generativeFill?.width || ""}
                    onChange={e =>
                      updateBackground({
                        generativeFill: {
                          ...aiMagic.background?.generativeFill,
                          width: parseInt(e.target.value) || undefined,
                          cropMode:
                            aiMagic.background?.generativeFill?.cropMode ||
                            "pad_resize",
                        },
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Height</Label>
                  <Input
                    type="number"
                    value={aiMagic.background?.generativeFill?.height || ""}
                    onChange={e =>
                      updateBackground({
                        generativeFill: {
                          ...aiMagic.background?.generativeFill,
                          height: parseInt(e.target.value) || undefined,
                          cropMode:
                            aiMagic.background?.generativeFill?.cropMode ||
                            "pad_resize",
                        },
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Crop Mode</Label>
                <Select
                  value={
                    aiMagic.background?.generativeFill?.cropMode || "pad_resize"
                  }
                  onValueChange={(value: "pad_resize" | "pad_extract") =>
                    updateBackground({
                      generativeFill: {
                        ...aiMagic.background?.generativeFill,
                        cropMode: value,
                      },
                    })
                  }
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue placeholder="Select crop mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pad_resize">Pad Resize</SelectItem>
                    <SelectItem value="pad_extract">Pad Extract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* AI Editing */}
        <AccordionItem value="editing" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              <span>AI Editing</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Edit Prompt</Label>
              <Input
                value={editPromptValue}
                onChange={e => setEditPromptValue(e.target.value)}
                onBlur={e => updateEditing({prompt: e.target.value})}
                placeholder="remove persons"
                className={inputStyles}
                style={gradientBg}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-xs font-medium">AI Retouch</Label>
              <Checkbox.Root
                checked={aiMagic.editing?.retouch || false}
                onCheckedChange={checked =>
                  updateEditing({retouch: checked ? true : false})
                }
                className={`${inputStyles}`}
                style={gradientBg}
              >
                <Checkbox.Indicator>
                  <Check className="h-4 w-4" />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-xs font-medium">AI Upscale</Label>
              <Checkbox.Root
                checked={aiMagic.editing?.upscale || false}
                onCheckedChange={checked =>
                  updateEditing({upscale: checked ? true : false})
                }
                className={`${inputStyles}`}
                style={gradientBg}
              >
                <Checkbox.Indicator>
                  <Check className="h-4 w-4" />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Shadow & Lighting */}
        <AccordionItem value="shadow" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Shadow & Lighting</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Drop Shadow Azimuth (0-360)
              </Label>
              <Input
                type="number"
                min={0}
                max={360}
                placeholder="0"
                value={aiMagic.shadowLighting?.dropShadow?.azimuth || ""}
                onChange={e => {
                  const value = parseInt(e.target.value);
                  updateShadowLighting({
                    dropShadow: {
                      ...aiMagic.shadowLighting?.dropShadow,
                      azimuth: value,
                    },
                  });
                  // Auto-check remove background when shadow lighting is used
                  // if (!isNaN(value)) {
                  //   updateBackground({remove: true});
                  // }
                }}
                className={inputStyles}
                style={gradientBg}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Drop Shadow Elevation (0-90)
              </Label>
              <Input
                type="number"
                placeholder="0"
                min={0}
                max={90}
                value={aiMagic.shadowLighting?.dropShadow?.elevation || ""}
                onChange={e => {
                  const value = parseInt(e.target.value);
                  updateShadowLighting({
                    dropShadow: {
                      ...aiMagic.shadowLighting?.dropShadow,
                      elevation: value,
                    },
                  });
                  // Auto-check remove background when shadow lighting is used
                  // if (!isNaN(value)) {
                  //   updateBackground({remove: true});
                  // }
                }}
                className={inputStyles}
                style={gradientBg}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Drop Shadow Saturation (0-100)
              </Label>
              <Input
                type="number"
                placeholder="0"
                min={0}
                max={100}
                value={aiMagic.shadowLighting?.dropShadow?.saturation || ""}
                onChange={e => {
                  const value = parseInt(e.target.value);
                  updateShadowLighting({
                    dropShadow: {
                      ...aiMagic.shadowLighting?.dropShadow,
                      saturation: value,
                    },
                  });
                  // Auto-check remove background when shadow lighting is used
                  // if (!isNaN(value)) {
                  //   updateBackground({remove: true});
                  // }
                }}
                className={inputStyles}
                style={gradientBg}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* AI Generation */}
        <AccordionItem value="generation" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>AI Generation</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Text Prompt</Label>
              <Input
                value={generationPromptValue}
                onChange={e => setGenerationPromptValue(e.target.value)}
                onBlur={e => updateGeneration({textPrompt: e.target.value})}
                placeholder="Describe what you want to generate..."
                className={inputStyles}
                style={gradientBg}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-xs font-medium">Generate Variation</Label>
              <Checkbox.Root
                checked={aiMagic.generation?.variation || false}
                onCheckedChange={checked =>
                  updateGeneration({variation: checked ? true : false})
                }
                className={`${inputStyles}`}
                style={gradientBg}
              >
                <Checkbox.Indicator>
                  <Check className="h-4 w-4" />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Smart Cropping */}
        <AccordionItem value="cropping" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Crop className="h-4 w-4" />
              <span>Smart Cropping</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Cropping Type</Label>
              <Select
                value={aiMagic.cropping?.type || "smart"}
                onValueChange={(value: "smart" | "face" | "object") =>
                  updateCropping({type: value})
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue placeholder="Select cropping type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smart">Smart</SelectItem>
                  <SelectItem value="face">Face</SelectItem>
                  <SelectItem value="object">Object</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {aiMagic.cropping?.type === "object" && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Object Name</Label>
                <Input
                  value={objectNameValue}
                  onChange={e => setObjectNameValue(e.target.value)}
                  onBlur={e => updateCropping({objectName: e.target.value})}
                  placeholder="e.g., dog, car, person..."
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-xs font-medium">Zoom</Label>
              <Input
                type="number"
                value={aiMagic.cropping?.zoom || ""}
                onChange={e =>
                  updateCropping({
                    zoom: parseFloat(e.target.value) || undefined,
                  })
                }
                step="0.1"
                className={inputStyles}
                style={gradientBg}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Width</Label>
                <Input
                  type="number"
                  value={aiMagic.cropping?.width || ""}
                  onChange={e =>
                    updateCropping({
                      width: parseInt(e.target.value) || undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Height</Label>
                <Input
                  type="number"
                  value={aiMagic.cropping?.height || ""}
                  onChange={e =>
                    updateCropping({
                      height: parseInt(e.target.value) || undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 pb-12 px-0.5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetAll}
            className={`flex-1 ${buttonStyles}`}
            style={gradientBg}
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}
