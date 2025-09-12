import {TransformationConfig} from "@/types";
import {
  AiMagic,
  BasicsTransform,
  Enhancements,
  Overlay,
} from "@/types/image-transformations";
import {
  Audio as VideoAudio,
  BasicsTransform as VideoBasics,
  Enhancements as VideoEnhancements,
  Overlay as VideoOverlay,
} from "@/types/video-transformations";

/* ---------------- BASICS ---------------- */

function basicsToParams(basics: BasicsTransform): string[] {
  const parts: string[] = [];
  if (basics.width) parts.push(`w-${basics.width}`);
  if (basics.height) parts.push(`h-${basics.height}`);
  if (basics.aspectRatio) parts.push(`ar-${basics.aspectRatio}`);
  if (basics.cropMode) parts.push(`c-${basics.cropMode}`);
  if (basics.focus) parts.push(`fo-${basics.focus}`);
  if (basics.zoom !== undefined) parts.push(`z-${basics.zoom}`);
  if (basics.dpr) parts.push(`dpr-${basics.dpr}`);
  if (basics.x !== undefined) parts.push(`x-${basics.x}`);
  if (basics.y !== undefined) parts.push(`y-${basics.y}`);
  if (basics.xc !== undefined) parts.push(`xc-${basics.xc}`);
  if (basics.yc !== undefined) parts.push(`yc-${basics.yc}`);
  return parts;
}

function videoBasicsToParams(b: VideoBasics): string[] {
  const p: string[] = [];
  if (b.width) p.push(`w-${b.width}`);
  if (b.height) p.push(`h-${b.height}`);
  if (b.aspectRatio) p.push(`ar-${b.aspectRatio}`);
  if (b.cropMode) p.push(`c-${b.cropMode}`);
  if (b.focus) p.push(`fo-${b.focus}`);
  if (b.rotate !== undefined) p.push(`rt-${b.rotate}`);
  if (b.border) p.push(`b-${b.border}`);
  if (b.radius !== undefined) p.push(`r-${b.radius}`);
  if (b.background) p.push(`bg-${b.background}`);
  return p;
}

/* ---------------- OVERLAYS ---------------- */

function videoOverlaysToParams(overlays: VideoOverlay[]): string[] {
  const parts: string[] = [];
  overlays.forEach(o => {
    const p: string[] = [];

    if (o.type === "image") {
      p.push("l-image");
      // Fix: Proper image path extraction and encoding
      const imagePath = o.src.match(/\/(moments\/.+)$/)?.[1] ?? o.src;
      p.push(`i-${imagePath}`);

      if (o.width) p.push(`w-${o.width}`);
      if (o.height) p.push(`h-${o.height}`);
    } else if (o.type === "video") {
      p.push("l-video");
      // Fix: Extract video path like we do for images
      const videoPath = o.src.match(/\/(moments\/.+)$/)?.[1] ?? o.src;
      p.push(`i-${videoPath}`);
      if (o.width) p.push(`w-${o.width}`);
      if (o.height) p.push(`h-${o.height}`);
    } else if (o.type === "text") {
      p.push("l-text");
      // Fix: Proper URL encoding for text content
      p.push(`i-${o.text}`);
      if (o.fontSize) p.push(`fs-${o.fontSize}`);
      if (o.fontFamily) p.push(`ff-${o.fontFamily}`);
      // Fix: Remove hash from color values
      if (o.color) p.push(`co-${o.color.replace(/^#/, "")}`);
      if (o.padding) p.push(`pa-${o.padding}`);
    } else if (o.type === "solid") {
      p.push("l-image");
      p.push("i-ik_canvas");
      // Fix: Remove hash from color values
      if (o.color) p.push(`bg-${o.color.replace(/^#/, "")}`);
      if (o.width) p.push(`w-${o.width}`);
      if (o.height) p.push(`h-${o.height}`);
      if (o.radius) p.push(`r-${o.radius}`);
    }

    // Fix: Correct overlay positioning parameters
    if (o.x !== undefined) p.push(`lx-${o.x}`);
    if (o.y !== undefined) p.push(`ly-${o.y}`);
    if (o.startOffset !== undefined) p.push(`so-${o.startOffset}`);
    if (o.endOffset !== undefined) p.push(`eo-${o.endOffset}`);
    if (o.duration !== undefined) p.push(`du-${o.duration}`);

    p.push("l-end");
    parts.push(p.join(","));
  });
  return parts;
}

function overlaysToParams(overlays: Overlay[]): string[] {
  const parts: string[] = [];

  overlays.forEach(o => {
    if (o.type === "image") {
      const params: string[] = ["l-image"];

      // Fix: Better image path handling
      const imagePath = o.src.match(/\/(moments\/.+)$/)?.[1] ?? o.src;
      params.push(`i-${imagePath}`);

      if (o.width) params.push(`w-${o.width}`);
      if (o.height) params.push(`h-${o.height}`);
      if (o.x !== undefined) params.push(`x-${o.x}`);
      if (o.y !== undefined) params.push(`y-${o.y}`);

      // Fix: Proper color normalization
      if (o.bgColor) {
        const bg = o.bgColor.replace(/^#/, "").padEnd(6, "0");
        params.push(`bg-${bg}`);
      }

      // Fix: Proper border handling
      if (o.border) {
        const border = o.border.replace(/^#/, "");
        params.push(`b-${border}`);
      }

      if (o.radius !== undefined) params.push(`r-${o.radius}`);
      if (o.rotation !== undefined) params.push(`rt-${o.rotation}`);
      if (o.flip) params.push(`fl-${o.flip}`);

      params.push("l-end");
      parts.push(params.join(","));
    }

    if (o.type === "text") {
      const params: string[] = ["l-text"];
      // Fix: Proper URL encoding
      params.push(`i-${o.text}`);
      if (o.fontSize) params.push(`fs-${o.fontSize}`);
      if (o.fontFamily) params.push(`ff-${o.fontFamily}`);
      // Fix: Remove hash from colors
      if (o.color) params.push(`co-${o.color.replace(/^#/, "")}`);
      if (o.backgroundColor)
        params.push(`bg-${o.backgroundColor.replace(/^#/, "")}`);
      if (o.padding) params.push(`pa-${o.padding}`);
      if (o.align) params.push(`lfo-${o.align}`);

      // Handle typography properly
      const typography: string[] = [];
      if (o.bold) typography.push("b");
      if (o.italic) typography.push("i");
      if (o.strike) typography.push("strikethrough");
      if (typography.length > 0) {
        params.push(`tg-${typography.join("_")}`);
      }

      if (o.rotation !== undefined) params.push(`rt-${o.rotation}`);
      if (o.flip) params.push(`fl-${o.flip}`);
      params.push("l-end");

      parts.push(params.join(","));
    }

    if (o.type === "gradient") {
      const gradientParts: string[] = [];

      if (o.direction !== undefined) gradientParts.push(`ld-${o.direction}`);
      if (o.fromColor)
        gradientParts.push(`from-${o.fromColor.replace(/^#/, "")}`);
      if (o.toColor) gradientParts.push(`to-${o.toColor.replace(/^#/, "")}`);
      if (o.stopPoint !== undefined) gradientParts.push(`sp-${o.stopPoint}`);

      const params: string[] = [
        "l-image",
        "i-ik_canvas",
        `e-gradient-${gradientParts.join("_")}`,
      ];

      if (o.width) params.push(`w-${o.width}`);
      if (o.height) params.push(`h-${o.height}`);
      if (o.radius) params.push(`r-${o.radius}`);

      params.push("l-end");
      parts.push(params.join(","));
    }

    if (o.type === "solid") {
      const params: string[] = ["l-image", "i-ik_canvas"];
      // Fix: Remove hash from color
      if (o.color) params.push(`bg-${o.color.replace(/^#/, "")}`);
      if (o.width) params.push(`w-${o.width}`);
      if (o.height) params.push(`h-${o.height}`);
      if (o.opacity !== undefined) params.push(`o-${o.opacity}`);
      if (o.radius) params.push(`r-${o.radius}`);
      params.push("l-end");
      parts.push(params.join(","));
    }
  });

  return parts;
}

/* ---------------- ENHANCEMENTS ---------------- */

function enhancementsToParams(enh: Enhancements): string[] {
  const parts: string[] = [];

  // Basic enhancements
  if (enh.blur) parts.push(`bl-${enh.blur}`);
  if (enh.sharpen) parts.push(`e-sharpen-${enh.sharpen}`);
  if (enh.contrast !== undefined) parts.push(`e-contrast-${enh.contrast}`);
  if (enh.brightness !== undefined)
    parts.push(`e-brightness-${enh.brightness}`);
  if (enh.saturation !== undefined)
    parts.push(`e-saturation-${enh.saturation}`);
  if (enh.gamma !== undefined) parts.push(`e-gamma-${enh.gamma}`);
  if (enh.hue !== undefined) parts.push(`e-hue-${enh.hue}`);
  if (enh.vibrance !== undefined) parts.push(`e-vibrance-${enh.vibrance}`);
  if (enh.grayscale) parts.push("e-grayscale");
  if (enh.sepia) parts.push("e-sepia");

  // Shadow effects
  if (enh.shadow) {
    const s = enh.shadow;
    const shadowParts: string[] = [];
    if (s.blur !== undefined) shadowParts.push(`bl-${s.blur}`);
    if (s.saturation !== undefined) shadowParts.push(`st-${s.saturation}`);
    if (s.offsetX !== undefined) {
      const xValue = s.offsetX < 0 ? `N${Math.abs(s.offsetX)}` : s.offsetX;
      shadowParts.push(`x-${xValue}`);
    }
    if (s.offsetY !== undefined) {
      const yValue = s.offsetY < 0 ? `N${Math.abs(s.offsetY)}` : s.offsetY;
      shadowParts.push(`y-${yValue}`);
    }

    if (shadowParts.length > 0) {
      parts.push(`e-shadow-${shadowParts.join("_")}`);
    }
  }

  // Background effects
  if (enh.background) {
    const bg = enh.background;

    // Add width and height if present (separate from background)
    if (bg.width) parts.push(`w-${bg.width}`);
    if (bg.height) parts.push(`h-${bg.height}`);

    // Ensure pad_resize crop mode for blurred backgrounds
    if (bg.type === "blurred") {
      // Add crop mode if not already present
      if (!parts.some(part => part.startsWith("cm-"))) {
        parts.push("cm-pad_resize");
      }

      // Build blurred background syntax
      const blurParts = ["bg-blurred"];

      // Add blur intensity (default to 'auto' if not specified)
      const intensity = bg.blurIntensity || "auto";
      blurParts.push(intensity.toString());

      // Add brightness if specified (handle negative values with N prefix)
      if (bg.brightness !== undefined) {
        const brightness =
          bg.brightness < 0
            ? `N${Math.abs(bg.brightness)}`
            : bg.brightness.toString();
        blurParts.push(brightness);
      }

      parts.push(blurParts.join("_"));
    }

    // Handle solid backgrounds
    if (bg.type === "solid" && bg.color) {
      parts.push(`bg-${bg.color.replace(/^#/, "")}`);
    }

    // if (bg.type === "dominant") parts.push("bg-dominant");

    // Handle dominant backgrounds - requires cm-pad_extract and dimensions
    if (bg.type === "dominant") {
      // Ensure pad_extract crop mode for dominant backgrounds
      if (!parts.some(part => part.startsWith("cm-"))) {
        parts.push("cm-pad_extract");
      }

      parts.push("bg-dominant");
    }

    // Handle solid background brightness
    if (bg.type === "solid" && bg.brightness !== undefined) {
      parts.push(`e-brightness-${bg.brightness}`);
    }
  }

  // Gradient effects
  if (enh.gradient) {
    const g = enh.gradient;
    const gradientParts: string[] = [];
    if (g.direction !== undefined) gradientParts.push(`ld-${g.direction}`);
    if (g.fromColor)
      gradientParts.push(`from-${g.fromColor.replace(/^#/, "")}`);
    if (g.toColor) gradientParts.push(`to-${g.toColor.replace(/^#/, "")}`);
    if (g.stopPoint !== undefined) gradientParts.push(`sp-${g.stopPoint}`);

    if (gradientParts.length > 0) {
      parts.push(`e-gradient-${gradientParts.join("_")}`);
    }
  }

  return parts;
}

function videoEnhancementsToParams(enh: VideoEnhancements): string[] {
  const parts: string[] = [];

  // Video trimming parameters
  if (enh.trimming) {
    const t = enh.trimming;
    if (t.startOffset !== undefined) parts.push(`so-${t.startOffset}`);
    if (t.endOffset !== undefined) parts.push(`eo-${t.endOffset}`);
    if (t.duration !== undefined) parts.push(`du-${t.duration}`);
  }

  // thumbnail transforms
  if (enh.thumbnail) {
    const th = enh.thumbnail;
    if (th.time !== undefined) parts.push(`so-${th.time}`);
    if (th.width) parts.push(`w-${th.width}`);
    if (th.height) parts.push(`h-${th.height}`);
    if (th.aspectRatio) parts.push(`ar-${th.aspectRatio}`);
    if (th.cropMode) {
      if (["extract", "pad_resize"].includes(th.cropMode))
        parts.push(`cm-${th.cropMode}`);
      else parts.push(`c-${th.cropMode}`);
    }
    if (th.focus) parts.push(`fo-${th.focus}`);
    if (th.border) parts.push(`b-${th.border.width}_${th.border.color}`);
    if (th.bg) parts.push(`bg-${th.bg}`);
    if (th.radius !== undefined) parts.push(`r-${th.radius}`);
  }

  return parts;
}

/* ---------------- AI MAGIC ---------------- */

function aiToParams(ai: AiMagic): string[] {
  const parts: string[] = [];

  if (ai.background) {
    const bg = ai.background;
    if (bg.remove) {
      parts.push(bg.mode === "economy" ? "e-bgremove" : "e-removedotbg");
    }
    if (bg.changePrompt) {
      // Fix: Proper URL encoding for prompts
      parts.push(`e-changebg-prompt-${bg.changePrompt}`);
    }
    if (bg.generativeFill) {
      const g = bg.generativeFill;
      let val = "bg-genfill";
      // Fix: Proper URL encoding for prompts
      if (g.prompt) val += `-prompt-${g.prompt}`;
      parts.push(val);
      if (g.width) parts.push(`w-${g.width}`);
      if (g.height) parts.push(`h-${g.height}`);
      if (g.cropMode) parts.push(`cm-${g.cropMode}`);
    }
  }

  if (ai.editing) {
    const e = ai.editing;
    // Fix: Proper URL encoding for prompts
    if (e.prompt) parts.push(`e-edit-prompt-${e.prompt}`);
    if (e.retouch) parts.push("e-retouch");
    if (e.upscale) parts.push("e-upscale");
  }

  if (ai.shadowLighting?.dropShadow) {
    const s = ai.shadowLighting.dropShadow;

    // First remove background to create transparency
    parts.push("e-removedotbg");

    // Then apply drop shadow with correct syntax using underscores
    let val = "e-dropshadow";
    if (s.azimuth !== undefined) val += `-az-${s.azimuth}`;
    if (s.elevation !== undefined) val += `_el-${s.elevation}`;
    if (s.saturation !== undefined) val += `_st-${s.saturation}`;
    parts.push(val);
  }

  if (ai.generation) {
    const g = ai.generation;
    if (g.textPrompt) {
      // Fix: Proper URL encoding for prompts
      parts.push(`e-edit-prompt-${g.textPrompt}`);
    }
    if (g.variation) parts.push("e-genvar");
  }

  if (ai.cropping) {
    const c = ai.cropping;
    if (c.type === "smart") parts.push("fo-auto");
    if (c.type === "face") parts.push("fo-face");
    if (c.type === "object" && c.objectName) parts.push(`fo-${c.objectName}`);
    if (c.zoom !== undefined) parts.push(`z-${c.zoom}`);
    if (c.width) parts.push(`w-${c.width}`);
    if (c.height) parts.push(`h-${c.height}`);
  }

  return parts;
}

/* ---------------- AUDIO ---------------- */
function audioToParams(a: VideoAudio): string[] {
  const p: string[] = [];

  // Audio muting - correct parameter
  if (a.mute) p.push("ac-none");

  // Audio extraction - this should create audio-only output
  if (a.extractAudio) {
    p.push("vc-none"); // Remove video codec, keep audio only
  }

  return p;
}

/* ---------------- MASTER BUILDER ---------------- */

export function buildTrString(config: TransformationConfig): string {
  const parts: string[] = [];

  if (config.type === "IMAGE") {
    if (config.basics) parts.push(...basicsToParams(config.basics));
    if (config.enhancements)
      parts.push(...enhancementsToParams(config.enhancements));
    if (config.ai) parts.push(...aiToParams(config.ai));
    if (config.overlays) parts.push(...overlaysToParams(config.overlays));
  }

  if (config.type === "VIDEO") {
    if (config.basics) parts.push(...videoBasicsToParams(config.basics));
    if (config.enhancements) {
      parts.push(...videoEnhancementsToParams(config.enhancements));
    }
    if (config.overlays) parts.push(...videoOverlaysToParams(config.overlays));
    if (config.audio) parts.push(...audioToParams(config.audio));
  }

  return parts.filter(Boolean).join(",");
}

export function buildImageKitUrl(
  src: string,
  config: TransformationConfig
): string {
  const tr = buildTrString(config);
  if (!tr) return src;

  try {
    const url = new URL(src);
    const base = url.origin + url.pathname;

    const search = url.search
      ? `${url.search.replace(/^\?/, "")}&tr=${tr}`
      : `tr=${tr}`;

    return `${base}?${search}`;
  } catch {
    return src.includes("?") ? `${src}&tr=${tr}` : `${src}?tr=${tr}`;
  }
}
