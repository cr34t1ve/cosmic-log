import { useResumeBuilder } from "@/store/ResumeBuilderContext";
import { Button, InputWrapper, TextInput } from "@/components/forms";
import { styled } from "@/stitches.config";
import { useState } from "react";

function transformLabel(label: string) {
  return `${label.charAt(0).toUpperCase()}${label.slice(1).toLowerCase()}`;
}

export const HeaderBlockEditor = () => {
  const { headerBlock, editHeaderField } = useResumeBuilder();

  const fieldNames = Object.keys(headerBlock?.content);

  const [formValues, setFormValues] = useState(headerBlock?.content);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event?.target;

    const updatedFormValues = {
      ...formValues,
      [name]: {
        formType: formValues[name].formType,
        formValue: value,
      },
    };

    setFormValues(updatedFormValues);
  }

  function saveChange() {
    editHeaderField(formValues);
  }

  return (
    <HeaderBlockEditorLayout>
      <div className="form-control">
        {fieldNames.map((field: string, index: number) => {
          const formField = formValues[field];

          return (
            <FieldWrapper key={index}>
              <TextInput
                name={field}
                key={field}
                value={formField.formValue}
                label={transformLabel(field)}
                onChange={onChange}
              />
            </FieldWrapper>
          );
        })}
      </div>
      <Button css={{ marginTop: 30 }} onClick={saveChange}>
        Save
      </Button>
    </HeaderBlockEditorLayout>
  );
};

const HeaderBlockEditorLayout = styled("div", {});

const FieldWrapper = styled(InputWrapper, {
  marginTop: 30,

  "&:first-of-type": {
    marginTop: 0,
  },
});
