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
      ash: "#F6F6FB",
      sand5: sand.sand5,
      accent: "#319795",
      primaryText: "#2D3748",
      secondaryText: "#575F6D",
      tertiaryText: "#718096",
      overlay: "rgba(0, 0, 0, 0.30)",
      divider: "#CBD5E0",
    },
    fontWeights: {
      regular: "400",
      medium: "500",
      semiBold: "600",
      bold: "700",
    },
    radii: {
      1: "4px",
      2: "6px",
      3: "8px",
      4: "12px",
      round: "50%",
    },
    transitions: {
      ease200: "all 200ms ease",
      ease300: "all 300ms ease",
    },
    fontSizes: {
      1: "12px",
      2: "14px",
      3: "16px",
      4: "18px",
      5: "20px",
      6: "22px",
      7: "24px",
      8: "30px",
      9: "36px",
      10: "50px",
      11: "56px",
    },
  },
});
