import * as RadixDialog from "@radix-ui/react-dialog";
import { styled, keyframes } from "@/stitches.config";

export const DialogRoot = styled(RadixDialog.Root, {});
export const DialogTrigger = styled(RadixDialog.Trigger, {
  all: "unset",
  display: "inline-block",
  lineHeight: 1,
  border: "1px solid $divider",
  borderRadius: "$2",
});

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

export const DialogPortal = styled(RadixDialog.Portal, {});

export const DialogOverlay = styled(RadixDialog.Overlay, {
  backgroundColor: "$overlay",
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const DialogContent = styled(RadixDialog.Content, {
  backgroundColor: "white",
  borderRadius: 16,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "90vh",
  overflow: "hidden",
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  "&:focus": { outline: "none" },
});

export const DialogTitle = styled(RadixDialog.Title, {
  margin: 0,
  color: "$accent",
  fontSize: "$6",
  fontWeight: "$bold",
  marginBottom: 10,
});

export const DialogDescription = styled(RadixDialog.Description, {
  color: "$gray",
  fontSize: "$1",
});
