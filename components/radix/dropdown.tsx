import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { styled, keyframes } from "@/stitches.config";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

export const DropdownRoot = styled(RadixDropdown.Root, {});
export const DropdownTrigger = styled(RadixDropdown.Trigger, {
  all: "unset",
  width: "100%",
  maxWidth: 260,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  lineHeight: 1,
  padding: "8px 12px",
  border: "1px solid $divider",
  borderRadius: "$2",
  cursor: "pointer",
});

export const DropdownPortal = styled(RadixDropdown.Portal, {});
export const DropdownContent = styled(RadixDropdown.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  width: 285,
  border: "1px solid $divider",
  //   maxWidth: 260,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  padding: 6,
  "&:focus": { outline: "none" },
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
});

export const DropdownItem = styled(RadixDropdown.Item, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  padding: "9px 6px",
  borderRadius: 4,

  cursor: "pointer",
  "&:hover": {
    backgroundColor: "$ash",
  },
  "&:focus": {
    backgroundColor: "$ash",
  },
});
