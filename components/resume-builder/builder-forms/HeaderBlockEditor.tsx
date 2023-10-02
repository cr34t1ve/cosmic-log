import { useResumeBuilder } from "store/ResumeBuilderContext";
import { TextInput } from "@/components/forms";
import styled from "styled-components";
import { sand } from "@radix-ui/colors";
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
      <h4>Header</h4>

      <div className="form-control">
        {fieldNames.map((field: string) => {
          const formField = formValues[field];

          return (
            <TextInput
              name={field}
              key={field}
              value={formField.formValue}
              label={transformLabel(field)}
              onChange={onChange}
            />
          );
        })}
      </div>
      <button className="resume-button medium" onClick={saveChange}>
        Save
      </button>
    </HeaderBlockEditorLayout>
  );
};

const HeaderBlockEditorLayout = styled.div`
  h4 {
    color: ${sand.sand12};
    margin-top: 0;
  }

  .form-control {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .textinput-container {
      margin-bottom: 20px;
    }
  }

  button {
    width: 100%;
  }
`;
