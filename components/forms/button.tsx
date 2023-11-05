import { styled } from "@/stitches.config";

export const Button = styled("button", {
  all: "unset",
  //   width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "calc(100% - 24px)",
  maxWidth: 365,
  padding: 12,
  borderRadius: 100,
  backgroundColor: "$accent",
  color: "White",
  cursor: "pointer",

  variants: {
    variant: {
      secondary: {
        width: "max-content",
        backgroundColor: "rgba(202, 209, 222, 0.14)",
        color: "$accent",
        fontWeight: "$semiBold",
        borderRadius: 17,
        padding: "8px 16px",
      },
      outline: {
        width: "max-content",
        backgroundColor: "transparent",
        border: "1px solid $divider",
        color: "$primaryText",
        fontSize: "$2",
        fontWeight: "$regular",
        borderRadius: 100,
        padding: "12px 18px",
      },
    },
  },
});
