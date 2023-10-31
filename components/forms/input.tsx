import { styled, keyframes } from "@/stitches.config";

export const Input = styled("input", {
  all: "unset",
  backgroundColor: "white",
  borderRadius: "$2",
  border: "1px solid $divider",
  padding: "14px 12px",
  fontSize: "$1",
  width: "calc(100% - 24px)",
  transition: "all 0.2s ease",
  "&:focus": {
    boxShadow: "0 0 0 2px $colors$blue",
  },
  "&::placeholder": {
    color: "#ADADAD",
  },
});
