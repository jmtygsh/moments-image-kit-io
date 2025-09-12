"use client";

import {useEffect, useState} from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import {Check, Crop, Focus, Grid3X3} from "lucide-react";

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
import {Enhancements} from "@/types/image-transformations";

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

interface ImageEnhancementsPanelProps {
  enhancements: Enhancements;
  onChange: (enhancements: Enhancements) => void;
}

export function ImageEnhancementsPanel({
  enhancements,
  onChange,
}: ImageEnhancementsPanelProps) {
  const updateEnhancements = (updates: Partial<Enhancements>) => {
    onChange({...enhancements, ...updates});
  };

  const updateShadow = (
    shadowUpdates: Partial<NonNullable<Enhancements["shadow"]>>
  ) => {
    updateEnhancements({
      shadow: {...enhancements.shadow, ...shadowUpdates},
    });
  };

  const updateBackground = (
    bgUpdates: Partial<NonNullable<Enhancements["background"]>>
  ) => {
    updateEnhancements({
      background: {
        ...(enhancements.background || {type: "solid"}),
        ...bgUpdates,
      },
    });
  };

  const updateGradient = (
    gradientUpdates: Partial<NonNullable<Enhancements["gradient"]>>
  ) => {
    updateEnhancements({
      gradient: {...enhancements.gradient, ...gradientUpdates},
    });
  };

  // Add this with your other state variables
  const [blurIntensityValue, setBlurIntensityValue] = useState(
    enhancements.background?.blurIntensity?.toString() || ""
  );

  // Add this useEffect to sync the local state with the enhancements
  useEffect(() => {
    setBlurIntensityValue(
      enhancements.background?.blurIntensity?.toString() || ""
    );
  }, [enhancements.background?.blurIntensity]);

  const resetAll = () => {
    onChange({});
  };
  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full space-y-2">
        {/* Basic Adjustments */}
        <AccordionItem value="basic" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              <span>Basic Adjustments</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Blur (0-100)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.blur || ""}
                  onChange={e =>
                    updateEnhancements({
                      blur: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                  min="0"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Sharpen (0-10)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.sharpen || ""}
                  onChange={e =>
                    updateEnhancements({
                      sharpen: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Adjustments */}
        <AccordionItem value="color" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Focus className="h-4 w-4" />
              <span>Color Adjustments</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-1  gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Contrast (-100 to 100)
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.contrast || ""}
                  onChange={e =>
                    updateEnhancements({
                      contrast: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                  min="-100"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Brightness (-100 to 100)
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.brightness || ""}
                  onChange={e =>
                    updateEnhancements({
                      brightness: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                  min="-100"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Saturation (-100 to 100)
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.saturation || ""}
                  onChange={e =>
                    updateEnhancements({
                      saturation: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                  min="-100"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Gamma (0.1 to 3.0)
                </Label>
                <Input
                  type="number"
                  placeholder="1"
                  value={enhancements.gamma || ""}
                  onChange={e =>
                    updateEnhancements({
                      gamma: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                  min="0.1"
                  max="3.0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Hue (0-360)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.hue || ""}
                  onChange={e =>
                    updateEnhancements({
                      hue: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                  min="0"
                  max="360"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Vibrance (-100 to 100)
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.vibrance || ""}
                  onChange={e =>
                    updateEnhancements({
                      vibrance: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                  min="-100"
                  max="100"
                />
              </div>

              <div className="grid grid-cols-2 gap-9">
                <div className="flex items-center space-x-2">
                  <Checkbox.Root
                    checked={enhancements.grayscale || false}
                    onCheckedChange={checked =>
                      updateEnhancements({grayscale: checked === true})
                    }
                    className={`${inputStyles}`}
                    style={gradientBg}
                  >
                    <Checkbox.Indicator>
                      <Check className="h-4 w-4" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <Label className="text-xs font-medium">Grayscale</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox.Root
                    checked={enhancements.sepia || false}
                    onCheckedChange={checked =>
                      updateEnhancements({sepia: checked === true})
                    }
                    className={`${inputStyles}`}
                    style={gradientBg}
                  >
                    <Checkbox.Indicator>
                      <Check className="h-4 w-4" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <Label className="text-xs font-medium">Sepia</Label>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Shadow Effects */}
        <AccordionItem value="shadow" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Crop className="h-4 w-4" />
              <span>Shadow (PNG Only)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Shadow Blur (0 to 15)
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={enhancements.shadow?.blur || ""}
                onChange={e =>
                  updateShadow({
                    blur: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className={inputStyles}
                style={gradientBg}
                min="0"
                max="15"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Shadow Saturation (0 to 100)
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={enhancements.shadow?.saturation || ""}
                onChange={e =>
                  updateShadow({
                    saturation: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className={inputStyles}
                style={gradientBg}
                min="0"
                max="100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Offset X</Label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  value={enhancements.shadow?.offsetX}
                  onChange={e =>
                    updateShadow({
                      offsetX: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
              <div className="space-y-2">
                <Label>Offset Y</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.shadow?.offsetY}
                  onChange={e =>
                    updateShadow({
                      offsetY: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Background Effects */}
        <AccordionItem value="background" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              <span>Background Effects</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Width</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={enhancements.background?.width || ""}
                  onChange={e =>
                    updateBackground({
                      width: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
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
                  placeholder="0"
                  value={enhancements.background?.height || ""}
                  onChange={e =>
                    updateBackground({
                      height: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Background Type</Label>
              <Select
                value={enhancements.background?.type || "solid"}
                onValueChange={(value: "solid" | "blurred" | "dominant") => {
                  if (value === "blurred") {
                    // Auto-fill width and height to 100 when blurred is selected
                    updateBackground({
                      type: value,
                      width: enhancements.background?.width || 100,
                      height: enhancements.background?.height || 100,
                    });
                  } else {
                    updateBackground({type: value});
                  }
                }}
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue placeholder="Select background type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="blurred">Blurred</SelectItem>
                  <SelectItem value="dominant">Dominant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {enhancements.background?.type === "solid" && (
              <div className="space-y-2">
                <Label>Background Color</Label>
                <Input
                  type="text"
                  value={enhancements.background?.color}
                  onChange={e => updateBackground({color: e.target.value})}
                  className={inputStyles}
                  style={gradientBg}
                  placeholder="#ffffff"
                />
              </div>
            )}

            {enhancements.background?.type === "blurred" && (
              <div className="space-y-2">
                <Label>Blur Intensity</Label>
                <Input
                  type="text"
                  placeholder="(0-100) or 'auto'"
                  value={blurIntensityValue}
                  onChange={e => setBlurIntensityValue(e.target.value)}
                  onBlur={() => {
                    const trimmedValue = blurIntensityValue.trim();
                    let parsed: number | "auto" | undefined;

                    if (trimmedValue === "auto") {
                      parsed = "auto";
                    } else if (trimmedValue === "") {
                      parsed = undefined;
                    } else {
                      const numValue = parseInt(trimmedValue, 10);
                      parsed =
                        !isNaN(numValue) && numValue >= 0 && numValue <= 100
                          ? numValue
                          : undefined;
                    }

                    updateBackground({
                      blurIntensity: parsed,
                    });

                    // Update the display value
                    setBlurIntensityValue(
                      parsed !== undefined ? parsed.toString() : ""
                    );
                  }}
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Bg Brightness (-255 to 255)
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={enhancements.background?.brightness || ""}
                onChange={e =>
                  updateBackground({
                    brightness: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className={inputStyles}
                style={gradientBg}
                min="-255"
                max="255"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Gradient Effects */}
        <AccordionItem value="gradient" className=" px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Focus className="h-4 w-4" />
              <span>Gradient Effects</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Direction (0-360 degrees)
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={enhancements.gradient?.direction || ""}
                onChange={e =>
                  updateGradient({
                    direction: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className={inputStyles}
                style={gradientBg}
                min="0"
                max="360"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From Color</Label>
                <Input
                  type="text"
                  value={enhancements.gradient?.fromColor || "#000000"}
                  onChange={e => updateGradient({fromColor: e.target.value})}
                  className={inputStyles}
                  style={gradientBg}
                  placeholder="#000000"
                />
              </div>
              <div className="space-y-2">
                <Label>To Color</Label>
                <Input
                  type="text"
                  value={enhancements.gradient?.toColor || "#ffffff"}
                  onChange={e => updateGradient({toColor: e.target.value})}
                  className={inputStyles}
                  style={gradientBg}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Stop Point (0-100)</Label>
              <Input
                type="number"
                placeholder="50"
                value={enhancements.gradient?.stopPoint || ""}
                onChange={e =>
                  updateGradient({
                    stopPoint: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className={inputStyles}
                style={gradientBg}
                min="0"
                max="100"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

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
      </Accordion>
    </div>
  );
}
