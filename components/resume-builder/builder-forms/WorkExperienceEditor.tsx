import React, { useState } from "react";
import { styled } from "@/stitches.config";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useResumeBuilder } from "@/store/ResumeBuilderContext";
import { Button, InputWrapper, Label, TextInput } from "@/components/forms";
import { Flex } from "@/components";

const defaultRole = {
  title: "",
  startDate: "2023-01-01",
  endDate: "2023-01-01",
};

export function WorkExperienceEditor() {
  const { selectedBlock, updateWorkBlock } = useResumeBuilder();

  const [roles, setRoles] = useState(selectedBlock?.content.roles || []);

  const [highlights, setHighlights] = useState(
    selectedBlock?.content?.highlights
  );

  const [companyName, setCompanyName] = useState(
    selectedBlock?.content?.companyName
  );

  function removeRole(index: number) {
    const rolesClone = [...roles];
    rolesClone.splice(index, 1);
    setRoles(rolesClone);
  }

  function removeHighlight(index: number) {
    const highlightClone = [...highlights];
    highlightClone.splice(index, 1);
    setHighlights(highlightClone);
  }

  function onRoleValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { name, value } = e?.target;

    let itemToUpdate = roles[index];
    const updatedRoles = [...roles];
    itemToUpdate[name] = value;
    updatedRoles[index] = itemToUpdate;
    setRoles(updatedRoles);
  }

  function onHighlightChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { value } = e.target;

    const newHighlights = [...highlights];

    newHighlights[index] = value;
    setHighlights(newHighlights);
  }

  function saveBlock() {
    updateWorkBlock({
      ...selectedBlock,
      content: {
        companyName,
        roles,
        highlights,
      },
    });
  }

  return (
    <WorkExperienceEditorContainer>
      <InputWrapper>
        <TextInput
          value={companyName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCompanyName(e.target.value)
          }
          label="Company Info"
          placeholder="Sunday Studio"
        />
      </InputWrapper>
      <div style={{ marginTop: 30 }}>
        <Label>
          Roles (<span>{roles.length}</span>)
        </Label>

        {roles.map((role: any, index: number) => {
          return (
            <Flex css={{ marginTop: 10 }} key={index}>
              <Flex align="center">
                <InputWrapper>
                  <Flex
                    css={{
                      display: "grid",
                      gap: 10,
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    <TextInput
                      value={role.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onRoleValueChange(e, index)
                      }
                      name="title"
                    />

                    <TextInput
                      type="date"
                      name="startDate"
                      value={role.startDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onRoleValueChange(e, index)
                      }
                    />
                  </Flex>
                </InputWrapper>
                <Flex
                  align="center"
                  css={{
                    marginLeft: 10,
                    backgroundColor: "#CBD5E0",
                    borderRadius: "$round",
                    padding: 3,
                    cursor: "pointer",
                  }}
                  className="delete"
                  onClick={() => removeRole(index)}
                >
                  <Cross2Icon width={15} height={15} color="white" />
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </div>
      <Button
        variant="secondary"
        css={{ marginTop: 10 }}
        onClick={() => {
          setRoles([...roles, defaultRole]);
        }}
      >
        Add Role
      </Button>

      <div className="highlights">
        <div style={{ marginTop: 30 }}>
          <Label>
            Highlights (<span>{highlights.length}</span>)
          </Label>
        </div>

        {highlights?.map((highlight: string, index: number) => {
          return (
            <Flex align="center" css={{ marginTop: 10 }} key={index}>
              <InputWrapper>
                <TextInput
                  name="highlight"
                  value={highlight}
                  placeholder="What did you do at this compny?"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onHighlightChange(e, index)
                  }
                />
              </InputWrapper>
              <Flex
                align="center"
                css={{
                  marginLeft: 10,
                  backgroundColor: "#CBD5E0",
                  borderRadius: "$round",
                  padding: 3,
                  cursor: "pointer",
                }}
                className="delete"
                onClick={() => removeHighlight(index)}
              >
                <Cross2Icon width={15} height={15} color="white" />
              </Flex>
            </Flex>
          );
        })}
      </div>
      <Button
        variant="secondary"
        css={{ marginTop: 10 }}
        onClick={() => {
          setHighlights([...highlights, ""]);
        }}
      >
        Add highlight
      </Button>

      <Button css={{ marginTop: 50 }} onClick={saveBlock}>
        Save section
      </Button>
    </WorkExperienceEditorContainer>
  );
}

const WorkExperienceEditorContainer = styled("div", {});
