// @ts-nocheck
import { styled } from "@/stitches.config";
import { Input } from "./input";
import { Label } from "./label";
import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  name,
  ...rest
}: TextInputProps) {
  return (
    <TextContainer className="textinput-container">
      {label && <Label htmlFor="">{label}</Label>}
      <Input
        type="text"
        {...rest}
        value={value}
        onChange={onChange}
        name={name}
      />
    </TextContainer>
  );
}

const TextContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
