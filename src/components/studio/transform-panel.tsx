import {type SectionKey} from "@/components/studio/dock";
import {TransformationConfig} from "@/types";

import {AudioPanel} from "./audio-panel";
import {ImageAiMagicPanel} from "./image-ai-magic-panel";
import {ImageBasicsPanel} from "./image-basics-panel";
import {ImageEnhancementsPanel} from "./image-enhancements-panel";
import {ImageOverlayPanel} from "./image-overlay-panel";
import {VideoBasicsPanel} from "./video-basics-panel";
import {VideoEnhancementsPanel} from "./video-enhancements-panel";
import {VideoOverlayPanel} from "./video-overlay-panel";

type TransformPanelProps = {
  activeSection: SectionKey;
  transforms: TransformationConfig;
  onTransformChange: (transforms: TransformationConfig) => void;
};

export function TransformPanel({
  activeSection,
  transforms,
  onTransformChange,
}: TransformPanelProps) {
  const getSectionTitle = (section: SectionKey) => {
    switch (section) {
      case "basics":
        return "Basic Adjustments";
      case "overlays":
        return "Overlays & Effects";
      case "enhancements":
        return "Enhancements";
      case "ai":
        return "AI Magic";
      case "audio":
        return "Audio";
      default:
        return "Transform";
    }
  };

  const renderPanelContent = () => {
    switch (activeSection) {
      case "basics":
        if (transforms.type === "IMAGE") {
          return (
            <ImageBasicsPanel
              transforms={transforms.basics || {}}
              onTransformChange={b =>
                onTransformChange({...transforms, basics: b})
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoBasicsPanel
              transforms={transforms.basics || {}}
              onTransformChange={b =>
                onTransformChange({...transforms, basics: b})
              }
            />
          );
        }
        break;
      case "overlays":
        if (transforms.type === "IMAGE") {
          return (
            <ImageOverlayPanel
              overlays={transforms.overlays || []}
              onOverlaysChange={o =>
                onTransformChange({...transforms, overlays: o})
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoOverlayPanel
              overlays={transforms.overlays || []}
              onOverlaysChange={o =>
                onTransformChange({...transforms, overlays: o})
              }
            />
          );
        }
        break;
      case "enhancements":
        if (transforms.type === "IMAGE") {
          return (
            <ImageEnhancementsPanel
              enhancements={transforms.enhancements || {}}
              onChange={e =>
                onTransformChange({...transforms, enhancements: e})
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoEnhancementsPanel
              enhancements={transforms.enhancements || {}}
              audio={transforms.audio || {}}
              onChange={(enhancements, audio) =>
                onTransformChange({...transforms, enhancements, audio})
              }
            />
          );
        }
        break;
      case "ai":
        if (transforms.type === "IMAGE") {
          return (
            <ImageAiMagicPanel
              aiMagic={transforms.ai || {}}
              onChange={ai => onTransformChange({...transforms, ai})}
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <div className="p-4 text-center text-gray-500">
              AI features for video coming soon
            </div>
          );
        }
        break;
      case "audio":
        if (transforms.type === "VIDEO") {
          return (
            <AudioPanel
              value={transforms.audio || {}}
              onChange={audio => onTransformChange({...transforms, audio})}
            />
          );
        } else {
          return (
            <div className="p-4 text-center text-gray-500">
              Audio controls are only available for videos
            </div>
          );
        }
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Select a section to get started
          </div>
        );
    }
  };

  return (
    <div className="border flex flex-col border-pink-300/30 dark:border-pink-200/15 max-md:min-h-32 md:w-1/4 rounded-xl p-6">
      <div className="flex items-center justify-between pb-4 border-gray-300/30 dark:border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="flex items-center gap-2 text-xs text-foreground/60">
            {getSectionTitle(activeSection)}
          </h3>
        </div>
      </div>
      <div className="max-h-full overflow-y-auto">{renderPanelContent()}</div>
    </div>
  );
}
