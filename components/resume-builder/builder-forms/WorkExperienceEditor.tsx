import React, { useState } from "react";
import styled from "styled-components";
import { sand, grass } from "@radix-ui/colors";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { useResumeBuilder } from "store/ResumeBuilderContext";
import { TextInput } from "@/components/forms";

const defaultRole = {
  title: "",
  startDate: "",
  endDate: "",
};

export const WorkExperienceEditor = () => {
  const { selectedBlock, updateWorkBlock } = useResumeBuilder();

  const [roles, setRoles] = useState(selectedBlock?.content.roles);

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
      <h4>Work Experience</h4>

      <TextInput
        value={companyName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCompanyName(e.target.value)
        }
        label="Company Name"
        placeholder="Sunday Studio"
      />

      <div className="roles">
        <div className="header">
          <p>
            Roles (<span>{roles.length}</span>)
          </p>
          <PlusCircledIcon
            width={24}
            height={24}
            color={sand.sand12}
            onClick={() => {
              setRoles([...roles, defaultRole]);
            }}
          />
        </div>

        {roles.map((role: any, index: number) => {
          return (
            <div className="role" key={index}>
              <div className="title">
                <TextInput
                  value={role.title}
                  label="Title"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onRoleValueChange(e, index)
                  }
                  name="title"
                />
              </div>

              <div className="tenure">
                <TextInput
                  label="Start"
                  type="date"
                  name="startDate"
                  value={role.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onRoleValueChange(e, index)
                  }
                />
                <TextInput
                  label="End"
                  type="date"
                  name="endDate"
                  value={role.endDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onRoleValueChange(e, index)
                  }
                />
              </div>

              <div className="delete" onClick={() => removeRole(index)}>
                <TrashIcon width={28} height={28} color={sand.sand12} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="highlights">
        <div className="header">
          <p>
            Highlights (<span>{roles.length}</span>)
          </p>
          <PlusCircledIcon
            width={24}
            height={24}
            color={sand.sand12}
            onClick={() => {
              setHighlights([...highlights, ""]);
            }}
          />
        </div>

        {highlights.map((highlight: string, index: number) => {
          return (
            <div className="highlight" key={index}>
              <TextInput
                name="highlight"
                value={highlight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onHighlightChange(e, index)
                }
              />
              <div className="delete" onClick={() => removeHighlight(index)}>
                <TrashIcon width={28} height={28} color={sand.sand12} />
              </div>
            </div>
          );
        })}
      </div>

      <button className="resume-button medium" onClick={saveBlock}>
        Save
      </button>
    </WorkExperienceEditorContainer>
  );
};

const WorkExperienceEditorContainer = styled.div`
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
