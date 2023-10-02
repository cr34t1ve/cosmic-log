// @ts-nocheck
import styled from "styled-components";
import { grass, sand } from "@radix-ui/colors";

export const TextInput = (props) => {
  const { label, value, onChange, name, ...rest } = props;

  return (
    <TextContainer className="textinput-container">
      <label htmlFor="">{label}</label>
      <input
        type="text"
        {...rest}
        value={value}
        onChange={onChange}
        name={name}
      />
    </TextContainer>
  );
};

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 15px;
    color: ${sand.sand12};
  }

  input {
    width: 100%;
    height: 40px;
    border: none;
    font-size: 15px;
    background-color: ${sand.sand4};
    border: 1.5px solid ${sand.sand6};
    padding: 0 10px;
    outline: none;

    &:active,
    &:focus {
      border-color: ${grass.grass8};
    }

    &:hover {
      /* background-color: red; */
    }
  }
`;
