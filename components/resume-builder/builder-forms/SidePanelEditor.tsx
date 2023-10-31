import React, { useEffect, useState } from "react";
import { sand, grass } from "@radix-ui/colors";
import { useResumeBuilder } from "@/store/ResumeBuilderContext";
import { Button, InputWrapper, Label, TextInput } from "@/components/forms";
import { transformLabel } from "@/lib/helpers";
import { Cross2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { styled } from "@/stitches.config";
import { Flex } from "@/components";

const defaultRole = {
  title: "",
  date: "",
};

export const SidePanelEditor = () => {
  const { selectedBlock, updateAwardBlock } = useResumeBuilder();

  const [skills, setSkills] = useState(selectedBlock?.content?.skills);

  const [education, setEducation] = useState(selectedBlock?.content?.education);

  const [formValues, setFormValues] = useState(selectedBlock?.content);

  const fieldNames = Object.keys(selectedBlock?.content);

  function removeSkill(index: number) {
    const skillClone = [...skills];
    skillClone.splice(index, 1);
    setSkills(skillClone);
  }

  function removeEducation(index: number) {
    const educationClone = [...education];
    educationClone.splice(index, 1);
    setEducation(educationClone);
  }

  function onSkillChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { value } = e.target;

    const newSkills = [...skills];

    newSkills[index] = value;
    setSkills(newSkills);
  }

  function onEducationValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { name, value } = e?.target;

    let itemToUpdate = education[index];
    const updatedEducation = [...education];
    itemToUpdate[name] = value;
    updatedEducation[index] = itemToUpdate;
    setEducation(updatedEducation);
  }

  function saveBlock() {
    updateAwardBlock({
      ...selectedBlock,
      content: {
        skills,
        education,
      },
    });
  }

  return (
    <SidePanelEditorContainer>
      <Label>
        Skills(<span>{skills.length}</span>)
      </Label>
      {skills.map((skill: string, index: number) => {
        return (
          <Flex css={{ marginTop: 10 }} align="center" key={index}>
            <InputWrapper>
              <div className="skill mb-1 row" key={index}>
                <TextInput
                  name="highlight"
                  value={skill}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onSkillChange(e, index)
                  }
                />
              </div>
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
              onClick={() => removeSkill(index)}
            >
              <Cross2Icon width={15} height={15} color="white" />
            </Flex>
          </Flex>
        );
      })}

      <Button
        variant="secondary"
        css={{ marginTop: 10, marginBottom: 30 }}
        onClick={() => {
          setSkills([...skills, ""]);
        }}
      >
        Add Skill
      </Button>

      <Label>
        Education(<span>{education.length}</span>)
      </Label>
      {education.map((education: any, index: number) => {
        const educationKeys = Object.keys(education);
        return (
          <Flex
            css={{
              marginTop: index === 0 ? 0 : 30,
            }}
            align="center"
            key={index}
          >
            <InputWrapper>
              <EducationGrid>
                {educationKeys?.map((key: string, index: number) => (
                  <TextInput
                    key={index}
                    placeholder={transformLabel(key)}
                    name={key}
                    value={education[key]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onEducationValueChange(e, index)
                    }
                  />
                ))}
              </EducationGrid>
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
              onClick={() => removeEducation(index)}
            >
              <Cross2Icon width={15} height={15} color="white" />
            </Flex>
          </Flex>
        );
      })}
      <Button
        variant="secondary"
        css={{ marginTop: 10, marginBottom: 30 }}
        onClick={() => {
          setEducation([
            ...education,
            {
              schoolName: "",
              state: "",
              country: "",
              degree: "",
              startDate: "2023-01-01",
              endDate: "2023-01-01",
            },
          ]);
        }}
      >
        Add Education
      </Button>

      <Button css={{ marginTop: 50 }} onClick={saveBlock}>
        Save
      </Button>
    </SidePanelEditorContainer>
  );
};

const SidePanelEditorContainer = styled("div", {});

const EducationGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 10,
  marginTop: 10,
});

const FieldWrapper = styled(InputWrapper, {
  marginTop: 30,

  "&:first-of-type": {
    marginTop: 0,
  },
});
