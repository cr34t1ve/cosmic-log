import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { sand, grass } from "@radix-ui/colors";
import { useResumeBuilder } from "@/store/ResumeBuilderContext";
import { TextInput } from "@/components/forms";
import { transformLabel } from "@/lib/helpers";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

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
      <div className="row flex-sb">
        <h4>
          Skills(<span>{skills.length}</span>)
        </h4>
        <PlusCircledIcon
          width={24}
          height={24}
          color={sand.sand12}
          className="pointer"
          onClick={() => {
            setSkills([...skills, ""]);
          }}
        />
      </div>
      {skills.map((skill: string, index: number) => {
        return (
          <>
            <div className="skill mb-1 row" key={index}>
              <TextInput
                name="highlight"
                value={skill}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSkillChange(e, index)
                }
              />
              <div className="delete" onClick={() => removeSkill(index)}>
                <TrashIcon
                  className="pointer"
                  width={28}
                  height={28}
                  color={sand.sand12}
                />
              </div>
            </div>
          </>
        );
      })}

      <div className="row flex-sb">
        <h4>
          Education(<span>{education.length}</span>)
        </h4>
        <PlusCircledIcon
          width={24}
          height={24}
          color={sand.sand12}
          className="pointer"
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
        />
      </div>
      {education.map((education: any, index: number) => {
        const educationKeys = Object.keys(education);
        return (
          <div className="row" key={index}>
            <div className="education-grid">
              {educationKeys?.map((key: string, index: number) => (
                <div className="skill mb-1 row" key={index}>
                  <div className="education">
                    <TextInput
                      placeholder={transformLabel(key)}
                      name={key}
                      value={education[key]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onEducationValueChange(e, index)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="delete" onClick={() => removeEducation(index)}>
              <TrashIcon
                className="pointer"
                width={28}
                height={28}
                color={sand.sand12}
              />
            </div>
          </div>
        );
      })}

      <button className="resume-button medium" onClick={saveBlock}>
        Save
      </button>
    </SidePanelEditorContainer>
  );
};

const SidePanelEditorContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h4 {
    color: ${sand.sand12};
    margin-top: 0;
  }

  .row {
    display: flex;
    gap: 10px;
  }

  .education-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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

  .educations {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .education {
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
