import React, { useState } from "react";
import { useResumeBuilder } from "@/store/ResumeBuilderContext";
import { Button, InputWrapper, TextInput } from "@/components/forms";
import { transformLabel } from "@/lib/helpers";
import { styled } from "@/stitches.config";

const defaultRole = {
  title: "",
  date: "",
};

export const AwardHistoryEditor = () => {
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
    <AwardHistoryEditorContainer>
      {fieldNames.map((field: string, index: number) => {
        const formField = formValues[field];

        return (
          <>
            {field.includes("date") ? (
              <FieldWrapper>
                <TextInput
                  label={transformLabel(field)}
                  type="date"
                  name={field}
                  value={formField}
                  onChange={onChange}
                />
              </FieldWrapper>
            ) : (
              <FieldWrapper>
                <TextInput
                  name={field}
                  key={index}
                  value={formField}
                  label={transformLabel(field)}
                  onChange={onChange}
                />
              </FieldWrapper>
            )}
          </>
        );
      })}

      <Button css={{ marginTop: 50 }} onClick={saveBlock}>
        Save
      </Button>
    </AwardHistoryEditorContainer>
  );
};

const AwardHistoryEditorContainer = styled("div", {});

const FieldWrapper = styled(InputWrapper, {
  marginTop: 30,

  "&:first-of-type": {
    marginTop: 0,
  },
});
