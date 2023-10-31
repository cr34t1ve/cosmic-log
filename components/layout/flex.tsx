import { styled } from "@/stitches.config";

export const Flex = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    justify: {
      start: {
        justifyContent: "flex-start",
      },
      end: {
        justifyContent: "flex-end",
      },
      center: {
        justifyContent: "center",
      },
      between: {
        justifyContent: "space-between",
      },
      around: {
        justifyContent: "space-around",
      },
      evenly: {
        justifyContent: "space-evenly",
      },
    },
    align: {
      start: {
        alignItems: "flex-start",
      },
      end: {
        alignItems: "flex-end",
      },
      center: {
        alignItems: "center",
      },
      baseline: {
        alignItems: "baseline",
      },
      stretch: {
        alignItems: "stretch",
      },
    },
    wrap: {
      true: {
        flexWrap: "wrap",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
      false: {
        width: "auto",
      },
    },
    desktopOnly: {
      true: {
        display: "flex",
        "@sm": {
          display: "none",
        },
      },
    },
    mobileOnly: {
      true: {
        display: "none",
        "@sm": {
          display: "flex",
        },
      },
    },
  },
});
