"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import {Check, Volume2} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Audio} from "@/types/video-transformations";

interface AudioPanelProps {
  value: Audio;
  onChange: (value: Audio) => void;
}

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function AudioPanel({value, onChange}: AudioPanelProps) {
  const resetAudio = () => {
    onChange({
      mute: false,
      extractAudio: false,
    });
  };

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <div>
        <Accordion type="multiple" className="w-full space-y-2">
          <AccordionItem value="audio-controls" className="px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span>Audio Controls sss</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox.Root
                    checked={value.mute || false}
                    onCheckedChange={checked => {
                      if (checked) {
                        // If mute is checked, uncheck extractAudio
                        onChange({...value, mute: true, extractAudio: false});
                      } else {
                        onChange({...value, mute: false});
                      }
                    }}
                    className={`${inputStyles}`}
                    style={gradientBg}
                  >
                    <Checkbox.Indicator>
                      <Check className="h-4 w-4" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <Label className="text-xs font-medium">Mute Audio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox.Root
                    checked={value.extractAudio || false}
                    onCheckedChange={checked => {
                      if (checked) {
                        // If extractAudio is checked, uncheck mute
                        onChange({...value, extractAudio: true, mute: false});
                      } else {
                        onChange({...value, extractAudio: false});
                      }
                    }}
                    className={`${inputStyles}`}
                    style={gradientBg}
                  >
                    <Checkbox.Indicator>
                      <Check className="h-4 w-4" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <Label className="text-xs font-medium">
                    Extract Audio Only
                  </Label>
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Mute Audio: Removes audio track from video (ac-none)</p>
                <p>
                  • Extract Audio: Converts video to audio-only format (vc-none)
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={resetAudio}
                className="w-full rounded-full"
              >
                Reset Audio
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="pt-4 pb-12 px-0.5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetAudio}
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
