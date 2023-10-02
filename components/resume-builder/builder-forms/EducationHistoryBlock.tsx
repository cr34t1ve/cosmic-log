import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { sand, grass } from "@radix-ui/colors";
import { useResumeBuilder } from "store/ResumeBuilderContext";
import { TextInput } from "@/components/forms";
import { transformLabel } from "@/lib/helpers";

const defaultRole = {
  title: "",
  date: "",
};

export const EducationHistoryEditor = () => {
  const { selectedBlock, updateAwardBlock } = useResumeBuilder();

  const [formValues, setFormValues] = useState(selectedBlock?.content);

  const fieldNames = Object.keys(selectedBlock?.content);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event?.target;

    setFormValues((f: any) => ({
      ...f,
      [name]: value,
    }));
  }

  function saveBlock() {
    updateAwardBlock({
      ...selectedBlock,
      content: {
        ...formValues,
      },
    });
  }

  return (
    <EducationHistoryEditorContainer>
      <h4>Education</h4>
      {fieldNames.map((field: string, index: number) => {
        const formField = formValues[field];

        return (
          <>
            {field.toLowerCase().includes("date") ? (
              <TextInput
                label={transformLabel(field)}
                type="date"
                name={field}
                value={formField}
                onChange={onChange}
              />
            ) : (
              <TextInput
                name={field}
                key={index}
                value={formField}
                label={transformLabel(field)}
                onChange={onChange}
              />
            )}
          </>
        );
      })}

      <button className="resume-button medium" onClick={saveBlock}>
        Save
      </button>
    </EducationHistoryEditorContainer>
  );
};

const EducationHistoryEditorContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h4 {
    color: ${sand.sand12};
    margin-top: 0;
  }

  .header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      svg {
        path {
          fill: ${grass.grass8};
        }
      }
    }

    p {
      font-size: 15px;
      color: ${sand.sand12};
      display: flex;

      span {
        color: ${grass.grass11};
        padding: 0 2px;
      }
    }
  }

  .roles {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .role {
      gap: 10px;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      align-items: flex-end;

      .title {
        grid-column: span 4;
      }

      .tenure {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        grid-column: span 5;

        .textinput-container {
          width: 150px;
        }
      }

      .delete {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        grid-template-columns: span 1;
        cursor: pointer;
        margin-bottom: 5px;

        &:hover {
          svg {
            path {
              fill: ${grass.grass8};
            }
          }
        }
      }
    }
  }

  .highlights {
    margin-top: 20px;
    .highlight {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      gap: 10px;
    }
  }

  button {
    width: 100%;
    margin-top: 20px;
  }

  * {
    /* outline: 1px dotted red; */
  }
`;
