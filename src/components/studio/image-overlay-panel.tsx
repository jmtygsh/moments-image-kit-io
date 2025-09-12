import {useEffect, useState} from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import {Label} from "@radix-ui/react-dropdown-menu";
import {Check, ImageUp, Paintbrush, Palette, Type} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FlipMode,
  GradientBlock,
  ImageOverlay,
  Overlay,
  SolidBlock,
  TextOverlay,
} from "@/types/image-transformations";

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

export function ImageOverlayPanel({
  overlays,
  onOverlaysChange,
}: BasicsControlsProps) {
  const overlay = overlays[0] || {type: "image", src: ""};
  const isImageSrcPresent =
    (overlay as ImageOverlay).src &&
    (overlay as ImageOverlay).src.trim() !== "";
  const isTextPresent =
    (overlay as TextOverlay).text &&
    (overlay as TextOverlay).text.trim() !== "";
  const update = (patch: Partial<Overlay>) => {
    const updatedOverlays = [...overlays];
    updatedOverlays[0] = {...overlay, ...patch} as Overlay;
    onOverlaysChange(updatedOverlays);
  };

  const [radiusValue, setRadiusValue] = useState(
    (overlay as ImageOverlay).radius?.toString() || ""
  );

  useEffect(() => {
    setRadiusValue((overlay as ImageOverlay).radius?.toString() || "");
  }, [(overlay as ImageOverlay).radius]);

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
                  value={(overlay as ImageOverlay).src || ""}
                  onChange={e => {
                    const newSrc = e.target.value;
                    if (newSrc.trim() === "") {
                      onOverlaysChange([]);
                    } else {
                      update({
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
                      value={(overlay as ImageOverlay).width || ""}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
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
                      value={(overlay as ImageOverlay).height || ""}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
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
                      value={(overlay as ImageOverlay).x || ""}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
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
                      value={(overlay as ImageOverlay).y || ""}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
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
                    <Label className="text-xs font-medium">Opacity</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={(overlay as ImageOverlay).opacity || ""}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
                          opacity: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Bg Color</Label>
                    <Input
                      type="text"
                      placeholder="#FFFFFF"
                      value={(overlay as ImageOverlay).bgColor || ""}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
                          bgColor: e.target.value || undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Border</Label>
                    <Input
                      type="text"
                      placeholder="5_FFF000"
                      value={(overlay as ImageOverlay).border || "5_FFFFFF"}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
                          border: e.target.value || undefined,
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
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
                          radius: parsed,
                        });
                        setRadiusValue(parsed?.toString() || "");
                      }}
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Rotation</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={(overlay as ImageOverlay).rotation || ""}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
                          rotation: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Flip</Label>
                    <Input
                      type="text"
                      placeholder="h, v, h_v"
                      value={(overlay as ImageOverlay).flip || ""}
                      onChange={e =>
                        update({
                          type: "image",
                          src: (overlay as ImageOverlay).src || "",
                          flip: (e.target.value as FlipMode) || undefined,
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
                    value={(overlay as TextOverlay).text || ""}
                    onChange={e => {
                      const newText = e.target.value;
                      if (newText.trim() === "") {
                        onOverlaysChange([]);
                      } else {
                        update({
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
                        value={(overlay as TextOverlay).fontSize || ""}
                        onChange={e =>
                          update({
                            type: "text",
                            text: (overlay as TextOverlay).text || "",
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
                        value={(overlay as TextOverlay).fontFamily || ""}
                        onChange={e =>
                          update({
                            type: "text",
                            text: (overlay as TextOverlay).text || "",
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
                        value={(overlay as TextOverlay).color || ""}
                        onChange={e =>
                          update({
                            type: "text",
                            text: (overlay as TextOverlay).text || "",
                            color: e.target.value || undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">
                        Background Color
                      </Label>
                      <Input
                        type="text"
                        placeholder="#FFFFFF"
                        value={(overlay as TextOverlay).backgroundColor || ""}
                        onChange={e =>
                          update({
                            type: "text",
                            text: (overlay as TextOverlay).text || "",
                            backgroundColor: e.target.value || undefined,
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
                        value={(overlay as TextOverlay).padding || ""}
                        onChange={e =>
                          update({
                            type: "text",
                            text: (overlay as TextOverlay).text || "",
                            padding: e.target.value || undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Rotation</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={(overlay as TextOverlay).rotation || ""}
                        onChange={e =>
                          update({
                            type: "text",
                            text: (overlay as TextOverlay).text || "",
                            rotation: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Flip</Label>
                      <Input
                        type="text"
                        placeholder="h, v, h_v"
                        value={(overlay as TextOverlay).flip || ""}
                        onChange={e =>
                          update({
                            type: "text",
                            text: (overlay as TextOverlay).text || "",
                            flip: (e.target.value as FlipMode) || undefined,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                  </>
                )}
              </div>

              {isTextPresent && (
                <div className="space-y-2 flex flex-col ">
                  {/* <Label className="text-xs font-medium">Align</Label> */}
                  <div className="flex gap-2 justify-evenly">
                    {["left", "center", "right"].map(pos => (
                      <div key={pos} className="flex flex-col items-center">
                        <span className="text-xs mb-2">
                          {pos
                            .split(" ")
                            .map(
                              word =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")}
                        </span>
                        <Checkbox.Root
                          checked={(overlay as TextOverlay).align === pos}
                          onCheckedChange={checked => {
                            update({
                              type: "text",
                              text: (overlay as TextOverlay).text || "",
                              align: checked
                                ? (pos as "left" | "center" | "right")
                                : undefined,
                            });
                          }}
                          className={`${inputStyles}`}
                          style={gradientBg}
                        >
                          <Checkbox.Indicator>
                            <Check className="h-4 w-4" />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isTextPresent && (
                <div className="flex justify-evenly gap-2">
                  {/* Bold */}
                  <div className="space-y-2 flex flex-col items-center">
                    <Label className="text-xs font-medium">Bold</Label>
                    <Checkbox.Root
                      checked={(overlay as TextOverlay).bold || false}
                      onCheckedChange={checked =>
                        update({
                          type: "text",
                          text: (overlay as TextOverlay).text || "",
                          bold: checked === true ? true : undefined,
                        })
                      }
                      className={`${inputStyles}`}
                      style={gradientBg}
                    >
                      <Checkbox.Indicator>
                        <Check className="h-4 w-4" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </div>

                  {/* Italic */}
                  <div className="space-y-2 flex flex-col items-center">
                    <Label className="text-xs font-medium">Italic</Label>
                    <Checkbox.Root
                      checked={(overlay as TextOverlay).italic || false}
                      onCheckedChange={checked =>
                        update({
                          type: "text",
                          text: (overlay as TextOverlay).text || "",
                          italic: checked === true ? true : undefined,
                        })
                      }
                      className={`${inputStyles}`}
                      style={gradientBg}
                    >
                      <Checkbox.Indicator>
                        <Check className="h-4 w-4" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </div>

                  {/* Strike */}
                  <div className="space-y-2 flex flex-col items-center">
                    <Label className="text-xs font-medium">Strike</Label>
                    <Checkbox.Root
                      checked={(overlay as TextOverlay).strike || false}
                      onCheckedChange={checked =>
                        update({
                          type: "text",
                          text: (overlay as TextOverlay).text || "",
                          strike: checked === true ? true : undefined,
                        })
                      }
                      className={`${inputStyles} `}
                      style={gradientBg}
                    >
                      <Checkbox.Indicator>
                        <Check className="h-4 w-4" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="gradient-block">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Paintbrush className="size-4" />
                Gradient Block
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">From Color</Label>
                  <Input
                    type="text"
                    placeholder="#FF0000"
                    value={(overlay as GradientBlock).fromColor || ""}
                    onChange={e =>
                      update({
                        type: "gradient",
                        fromColor: e.target.value || undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">To Color</Label>
                  <Input
                    type="text"
                    placeholder="#0000FF"
                    value={(overlay as GradientBlock).toColor || ""}
                    onChange={e =>
                      update({
                        type: "gradient",
                        toColor: e.target.value || undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Direction</Label>
                  <Input
                    type="text"
                    placeholder="e.g. 45"
                    value={(overlay as GradientBlock).direction || ""}
                    onChange={e =>
                      update({
                        type: "gradient",
                        direction: e.target.value || undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Stop Point</Label>
                  <Input
                    type="text"
                    placeholder="50"
                    value={(overlay as GradientBlock).stopPoint || ""}
                    onChange={e =>
                      update({
                        type: "gradient",
                        stopPoint: e.target.value || undefined,
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
                    value={(overlay as GradientBlock).width || ""}
                    onChange={e =>
                      update({
                        type: "gradient",
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
                    value={(overlay as GradientBlock).height || ""}
                    onChange={e =>
                      update({
                        type: "gradient",
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
                    value={(overlay as GradientBlock).radius || ""}
                    onChange={e =>
                      update({
                        type: "gradient",
                        radius: e.target.value
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
                    value={(overlay as SolidBlock).color || ""}
                    onChange={e =>
                      update({
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
                    value={(overlay as SolidBlock).width || ""}
                    onChange={e =>
                      update({
                        type: "solid",
                        color: (overlay as SolidBlock).color,
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
                    value={(overlay as SolidBlock).height || ""}
                    onChange={e =>
                      update({
                        type: "solid",
                        color: (overlay as SolidBlock).color,
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
                  <Label className="text-xs font-medium">Opacity</Label>
                  <Input
                    type="number"
                    placeholder="1"
                    value={(overlay as SolidBlock).opacity || ""}
                    onChange={e =>
                      update({
                        type: "solid",
                        color: (overlay as SolidBlock).color,
                        opacity: e.target.value
                          ? parseFloat(e.target.value)
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
                    value={(overlay as SolidBlock).radius || ""}
                    onChange={e =>
                      update({
                        type: "solid",
                        color: (overlay as SolidBlock).color,
                        radius: e.target.value
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
