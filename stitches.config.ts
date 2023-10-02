import { sand } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const { styled, keyframes, getCssText } = createStitches({
  theme: {
    fonts: {
      system: "system-ui",
      inter: "Inter, sans-serif",
      cabinet: "Cabinet Grotesk, sans-serif",
      berkeley: "BerkeleyMono, monospace",
    },
    colors: {
      hiContrast: "hsl(206,10%,5%)",
      loContrast: "white",
      gray: "#77797C",
      sand5: sand.sand5,
    },
    fontSizes: {
      1: "13px",
      2: "15px",
      3: "17px",
    },
  },
});
