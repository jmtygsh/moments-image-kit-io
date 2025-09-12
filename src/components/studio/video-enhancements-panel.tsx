"use client";

import {useState} from "react";

import {Image, Video} from "lucide-react";

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
import {CropMode, Enhancements, FocusMode} from "@/types/video-transformations";

interface VideoEnhancementsPanelProps {
  enhancements: Enhancements;
  onChange: (enhancements: Enhancements) => void;
}

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function VideoEnhancementsPanel({
  enhancements,

  onChange,
}: VideoEnhancementsPanelProps) {
  const updateEnhancements = (updates: Partial<Enhancements>) => {
    onChange({...enhancements, ...updates});
  };

  const [radiusValue, setRadiusValue] = useState(
    enhancements.thumbnail?.radius?.toString() || ""
  );

  const updateThumbnail = (
    thumbnailUpdates: Partial<NonNullable<Enhancements["thumbnail"]>>
  ) => {
    updateEnhancements({
      thumbnail: {...enhancements.thumbnail, ...thumbnailUpdates},
    });
  };

  const updateTrimming = (
    trimmingUpdates: Partial<NonNullable<Enhancements["trimming"]>>
  ) => {
    updateEnhancements({
      trimming: {...enhancements.trimming, ...trimmingUpdates},
    });
  };

  const resetTrimming = () => {
    onChange({
      ...enhancements,
      trimming: {
        startOffset: undefined,
        endOffset: undefined,
        duration: undefined,
      },
    });
  };

  const resetThumbnail = () => {
    const newEnhancements = {...enhancements};
    delete newEnhancements.thumbnail;
    onChange(newEnhancements);
  };

  const resetAll = () => {
    resetTrimming();
    resetThumbnail();
  };

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <div>
        <Accordion type="multiple" className="w-full space-y-2">
          <AccordionItem value="video-trimming" className="px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Video Trimming</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    Start Offset (s)
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g., 10"
                    value={
                      typeof enhancements.trimming?.startOffset === "number"
                        ? enhancements.trimming.startOffset
                        : ""
                    }
                    onChange={e => {
                      const value = e.target.value;
                      updateTrimming({
                        startOffset: value
                          ? isNaN(Number(value))
                            ? value
                            : Number(value)
                          : undefined,
                      });
                    }}
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">End Offset (s)</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 30"
                    value={
                      typeof enhancements.trimming?.endOffset === "number"
                        ? enhancements.trimming.endOffset
                        : ""
                    }
                    onChange={e => {
                      const value = e.target.value;
                      updateTrimming({
                        endOffset: value
                          ? isNaN(Number(value))
                            ? value
                            : Number(value)
                          : undefined,
                      });
                    }}
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Duration (s)</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 20"
                    value={
                      typeof enhancements.trimming?.duration === "number"
                        ? enhancements.trimming.duration
                        : ""
                    }
                    onChange={e => {
                      const value = e.target.value;
                      updateTrimming({
                        duration: value
                          ? isNaN(Number(value))
                            ? value
                            : Number(value)
                          : undefined,
                      });
                    }}
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={resetTrimming}
                className="w-full rounded-full"
              >
                Reset Trimming
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="thumbnail-generation" className="px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Thumbnail Generation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Thumbnail Time (s)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  value={
                    typeof enhancements.thumbnail?.time === "number"
                      ? enhancements.thumbnail.time
                      : ""
                  }
                  onChange={e => {
                    const value = e.target.value;
                    updateThumbnail({
                      time: value
                        ? isNaN(Number(value))
                          ? value
                          : Number(value)
                        : undefined,
                    });
                  }}
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Width</Label>
                  <Input
                    type="number"
                    placeholder="Auto"
                    value={enhancements.thumbnail?.width || ""}
                    onChange={e =>
                      updateThumbnail({
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
                    placeholder="Auto"
                    value={enhancements.thumbnail?.height || ""}
                    onChange={e =>
                      updateThumbnail({
                        height: parseInt(e.target.value) || undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Aspect Ratio</Label>
                <Input
                  placeholder="e.g., 16-9, 4-3"
                  value={enhancements.thumbnail?.aspectRatio || ""}
                  onChange={e => updateThumbnail({aspectRatio: e.target.value})}
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Crop Mode</Label>
                <Select
                  value={enhancements.thumbnail?.cropMode || "maintain_ratio"}
                  onValueChange={(value: CropMode) =>
                    updateThumbnail({cropMode: value})
                  }
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue placeholder="Select crop mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintain_ratio">
                      Maintain Ratio
                    </SelectItem>
                    <SelectItem value="pad_resize">Pad Resize</SelectItem>
                    <SelectItem value="force">Force</SelectItem>
                    <SelectItem value="at_max">At Max</SelectItem>
                    <SelectItem value="at_max_enlarge">
                      At Max Enlarge
                    </SelectItem>
                    <SelectItem value="at_least">At Least</SelectItem>
                    <SelectItem value="extract">Extract</SelectItem>
                    <SelectItem value="pad_extract">Pad Extract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Focus Mode</Label>
                <Select
                  value={enhancements.thumbnail?.focus || "center"}
                  onValueChange={(value: FocusMode) =>
                    updateThumbnail({focus: value})
                  }
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue placeholder="Select focus mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="top_left">Top Left</SelectItem>
                    <SelectItem value="top_right">Top Right</SelectItem>
                    <SelectItem value="bottom_left">Bottom Left</SelectItem>
                    <SelectItem value="bottom_right">Bottom Right</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="face">Face</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Border Width</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={enhancements.thumbnail?.border?.width || ""}
                      onChange={e =>
                        updateThumbnail({
                          border: {
                            ...enhancements.thumbnail?.border,
                            width: parseInt(e.target.value) || 0,
                            color:
                              enhancements.thumbnail?.border?.color || "000000", // Remove # prefix to match transform code
                          },
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Color</Label>
                    <Input
                      type="text"
                      placeholder="#000000"
                      value={enhancements.thumbnail?.border?.color || ""}
                      onChange={e =>
                        updateThumbnail({
                          border: {
                            ...enhancements.thumbnail?.border,
                            width: enhancements.thumbnail?.border?.width || 0,
                            color: e.target.value.replace(/^#/, ""), // Remove # prefix
                          },
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Background Color</Label>
                <Input
                  type="text"
                  placeholder="#ffffff"
                  value={enhancements.thumbnail?.bg || ""}
                  onChange={e =>
                    updateThumbnail({bg: e.target.value.replace(/^#/, "")})
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              <div className="space-y-2">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Border Radius</Label>
                  <Input
                    type="text"
                    placeholder="10 or max"
                    value={radiusValue}
                    onChange={e => setRadiusValue(e.target.value)}
                    onBlur={() => {
                      const parsed =
                        radiusValue === "max"
                          ? "max"
                          : radiusValue
                            ? parseInt(radiusValue)
                            : undefined;
                      updateThumbnail({
                        radius: parsed,
                      });
                      setRadiusValue(parsed?.toString() || "");
                    }}
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={resetThumbnail}
                className="w-full rounded-full"
              >
                Reset Thumbnail
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

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
