import {useEffect, useState} from "react";

import {Label} from "@radix-ui/react-dropdown-menu";
import {ImageUp, Palette, Play, Type} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ImageOverlay,
  Overlay,
  SolidBlock,
  TextOverlay,
  VideoOverlay,
} from "@/types/video-transformations";

import {Button} from "../ui/button";
import {Input} from "../ui/input";

type BasicsControlsProps = {
  overlays: Overlay[];
  onOverlaysChange: (overlays: Overlay[]) => void;
};

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function VideoOverlayPanel({
  overlays,
  onOverlaysChange,
}: BasicsControlsProps) {
  // Find or create separate overlay instances for each type
  const imageOverlay = (overlays.find(
    o => o.type === "image"
  ) as ImageOverlay) || {type: "image", src: ""};
  const videoOverlay = (overlays.find(
    o => o.type === "video"
  ) as VideoOverlay) || {type: "video", src: ""};
  const textOverlay = (overlays.find(
    o => o.type === "text"
  ) as TextOverlay) || {type: "text", text: ""};
  const solidOverlay = (overlays.find(
    o => o.type === "solid"
  ) as SolidBlock) || {type: "solid", color: ""};

  const isImageSrcPresent = imageOverlay.src && imageOverlay.src.trim() !== "";
  const isVideoSrcPresent = videoOverlay.src && videoOverlay.src.trim() !== "";
  const isTextPresent = textOverlay.text && textOverlay.text.trim() !== "";

  // Separate update functions for each overlay type
  const updateImageOverlay = (patch: Partial<ImageOverlay>) => {
    const updatedOverlays = [...overlays];
    const existingIndex = updatedOverlays.findIndex(o => o.type === "image");

    if (existingIndex >= 0) {
      updatedOverlays[existingIndex] = {
        ...updatedOverlays[existingIndex],
        ...patch,
      } as ImageOverlay;
    } else {
      updatedOverlays.push({...imageOverlay, ...patch} as ImageOverlay);
    }
    onOverlaysChange(updatedOverlays);
  };

  const updateVideoOverlay = (patch: Partial<VideoOverlay>) => {
    const updatedOverlays = [...overlays];
    const existingIndex = updatedOverlays.findIndex(o => o.type === "video");

    if (existingIndex >= 0) {
      updatedOverlays[existingIndex] = {
        ...updatedOverlays[existingIndex],
        ...patch,
      } as VideoOverlay;
    } else {
      updatedOverlays.push({...videoOverlay, ...patch} as VideoOverlay);
    }
    onOverlaysChange(updatedOverlays);
  };

  const updateTextOverlay = (patch: Partial<TextOverlay>) => {
    const updatedOverlays = [...overlays];
    const existingIndex = updatedOverlays.findIndex(o => o.type === "text");

    if (existingIndex >= 0) {
      updatedOverlays[existingIndex] = {
        ...updatedOverlays[existingIndex],
        ...patch,
      } as TextOverlay;
    } else {
      updatedOverlays.push({...textOverlay, ...patch} as TextOverlay);
    }
    onOverlaysChange(updatedOverlays);
  };

  const updateSolidOverlay = (patch: Partial<SolidBlock>) => {
    const updatedOverlays = [...overlays];
    const existingIndex = updatedOverlays.findIndex(o => o.type === "solid");

    if (existingIndex >= 0) {
      updatedOverlays[existingIndex] = {
        ...updatedOverlays[existingIndex],
        ...patch,
      } as SolidBlock;
    } else {
      updatedOverlays.push({...solidOverlay, ...patch} as SolidBlock);
    }
    onOverlaysChange(updatedOverlays);
  };

  const [radiusValue, setRadiusValue] = useState(
    imageOverlay.radius?.toString() || ""
  );

  useEffect(() => {
    setRadiusValue(imageOverlay.radius?.toString() || "");
  }, [imageOverlay.radius]);

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <div>
        <Accordion type="multiple">
          <AccordionItem value="image-overlay">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <ImageUp className="size-4" />
                Image Overlay
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Src</Label>
                <Input
                  type="text"
                  placeholder="Image URL"
                  value={imageOverlay.src || ""}
                  onChange={e => {
                    const newSrc = e.target.value;
                    if (newSrc.trim() === "") {
                      onOverlaysChange([]);
                    } else {
                      updateImageOverlay({
                        type: "image",
                        src: newSrc,
                      });
                    }
                  }}
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              {isImageSrcPresent && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Width</Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      value={imageOverlay.width || ""}
                      onChange={e =>
                        updateImageOverlay({
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
                      placeholder="Auto"
                      value={imageOverlay.height || ""}
                      onChange={e =>
                        updateImageOverlay({
                          height: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">X</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={imageOverlay.x || ""}
                      onChange={e =>
                        updateImageOverlay({
                          x: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Y</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={imageOverlay.y || ""}
                      onChange={e =>
                        updateImageOverlay({
                          y: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Start Offset</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={imageOverlay.startOffset || ""}
                      onChange={e =>
                        updateImageOverlay({
                          startOffset: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">End Offset</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={imageOverlay.endOffset || ""}
                      onChange={e =>
                        updateImageOverlay({
                          endOffset: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Duration</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={imageOverlay.duration || ""}
                      onChange={e =>
                        updateImageOverlay({
                          duration: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Radius</Label>
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
                        updateImageOverlay({
                          radius: parsed,
                        });
                        setRadiusValue(parsed?.toString() || "");
                      }}
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="video-overlay">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Play className="size-4" />
                Video Overlay
              </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Src</Label>
                <Input
                  type="text"
                  placeholder="Video URL"
                  value={videoOverlay.src || ""}
                  onChange={e => {
                    const newSrc = e.target.value;
                    if (newSrc.trim() === "") {
                      onOverlaysChange([]);
                    } else {
                      updateVideoOverlay({
                        type: "video",
                        src: newSrc,
                      });
                    }
                  }}
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              {isVideoSrcPresent && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Width</Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      value={videoOverlay.width || ""}
                      onChange={e =>
                        updateVideoOverlay({
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
                      placeholder="Auto"
                      value={videoOverlay.height || ""}
                      onChange={e =>
                        updateVideoOverlay({
                          height: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">X</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={videoOverlay.x || ""}
                      onChange={e =>
                        updateVideoOverlay({
                          x: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Y</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={videoOverlay.y || ""}
                      onChange={e =>
                        updateVideoOverlay({
                          y: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Start Offset</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={videoOverlay.startOffset || ""}
                      onChange={e =>
                        updateVideoOverlay({
                          startOffset: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">End Offset</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={videoOverlay.endOffset || ""}
                      onChange={e =>
                        updateVideoOverlay({
                          endOffset: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Duration</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={videoOverlay.duration || ""}
                      onChange={e =>
                        updateVideoOverlay({
                          duration: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="text-overlay">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Type className="size-4" />
                Text Overlay
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Text</Label>
                  <Input
                    type="text"
                    placeholder="Enter text"
                    value={textOverlay.text || ""}
                    onChange={e => {
                      const newText = e.target.value;
                      if (newText.trim() === "") {
                        onOverlaysChange([]);
                      } else {
                        updateTextOverlay({
                          type: "text",
                          text: newText,
                        });
                      }
                    }}
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                {isTextPresent && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Font Size</Label>
                      <Input
                        type="number"
                        placeholder="Auto"
                        value={textOverlay.fontSize || ""}
                        onChange={e =>
                          updateTextOverlay({
                            fontSize: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Font Family</Label>
                      <Input
                        type="text"
                        placeholder="Arial"
                        value={textOverlay.fontFamily || ""}
                        onChange={e =>
                          updateTextOverlay({
                            fontFamily: e.target.value || undefined,
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
                        value={textOverlay.color || ""}
                        onChange={e =>
                          updateTextOverlay({
                            color: e.target.value || undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Padding</Label>
                      <Input
                        type="text"
                        placeholder="10"
                        value={textOverlay.padding || ""}
                        onChange={e =>
                          updateTextOverlay({
                            padding: e.target.value || undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">X</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={textOverlay.x || ""}
                        onChange={e =>
                          updateTextOverlay({
                            x: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Y</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={textOverlay.y || ""}
                        onChange={e =>
                          updateTextOverlay({
                            y: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">
                        Start Offset
                      </Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={textOverlay.startOffset || ""}
                        onChange={e =>
                          updateTextOverlay({
                            startOffset: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">End Offset</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={textOverlay.endOffset || ""}
                        onChange={e =>
                          updateTextOverlay({
                            endOffset: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Duration</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={textOverlay.duration || ""}
                        onChange={e =>
                          updateTextOverlay({
                            duration: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="solid-block">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Palette className="size-4" />
                Solid Block
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Color</Label>
                  <Input
                    type="text"
                    placeholder="#FFFFFF"
                    value={solidOverlay.color || ""}
                    onChange={e =>
                      updateSolidOverlay({
                        type: "solid",
                        color: e.target.value,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Width</Label>
                  <Input
                    type="number"
                    placeholder="Auto"
                    value={solidOverlay.width || ""}
                    onChange={e =>
                      updateSolidOverlay({
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
                    placeholder="Auto"
                    value={solidOverlay.height || ""}
                    onChange={e =>
                      updateSolidOverlay({
                        height: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Radius</Label>
                  <Input
                    type="number"
                    placeholder="10"
                    value={solidOverlay.radius || ""}
                    onChange={e =>
                      updateSolidOverlay({
                        radius: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">X</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={solidOverlay.x || ""}
                    onChange={e =>
                      updateSolidOverlay({
                        x: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Y</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={solidOverlay.y || ""}
                    onChange={e =>
                      updateSolidOverlay({
                        y: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Start Offset</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={solidOverlay.startOffset || ""}
                    onChange={e =>
                      updateSolidOverlay({
                        startOffset: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">End Offset</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={solidOverlay.endOffset || ""}
                    onChange={e =>
                      updateSolidOverlay({
                        endOffset: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Duration</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={solidOverlay.duration || ""}
                    onChange={e =>
                      updateSolidOverlay({
                        duration: e.target.value
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
        </Accordion>
      </div>

      <div className="pt-4 pb-12 px-0.5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOverlaysChange([])}
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
