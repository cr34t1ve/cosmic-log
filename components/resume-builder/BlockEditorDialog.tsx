import { FC } from "react";
import styled from "styled-components";

import { HeaderBlockEditor } from "./builder-forms/HeaderBlockEditor";
import { WorkExperienceEditor } from "./builder-forms/WorkExperienceEditor";

import { BLOCK_TYPE, useResumeBuilder } from "@/store/ResumeBuilderContext";
import { AwardHistoryEditor } from "./builder-forms/AwardHistoryEditor";
import { EducationHistoryEditor } from "./builder-forms/EducationHistoryBlock";
import { SidePanelEditor } from "./builder-forms/SidePanelEditor";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DropdownContent,
  DropdownItem,
  DropdownPortal,
  DropdownRoot,
  DropdownTrigger,
  Flex,
} from "..";
import { BLOCK_TYPES } from "@/lib/data";
import {
  generateBlankAward,
  generateBlankEducation,
  generateBlankExperience,
  generateBlankHeader,
  generateBlankSidePanel,
  transformLabel,
} from "@/lib/helpers";

// TODO: Should be: Record<BLOCK_TYPE, React.FC>

const editors: Record<BLOCK_TYPE, any> = {
  header: HeaderBlockEditor,
  "work-experience": WorkExperienceEditor,
  award: AwardHistoryEditor,
  education: EducationHistoryEditor,
  "side-panel": SidePanelEditor,
};

const blankBlock: Record<BLOCK_TYPE, any> = {
  header: generateBlankHeader(),
  "work-experience": generateBlankExperience(),
  award: generateBlankAward(),
  education: generateBlankEducation(),
  "side-panel": generateBlankSidePanel(),
};

interface BlockEditorDialogProps {
  show: boolean;
  closeModal: () => void;
}

export const BlockEditorDialog: FC<BlockEditorDialogProps> = ({
  show,
  closeModal = () => {},
}) => {
  const { blocks, selectedBlock, selectBlockCopy, selectBlock } =
    useResumeBuilder();
  const Block = editors[selectedBlock?.type as BLOCK_TYPE];

  const headerBlock = blocks.filter((block) => block.type === "header")?.[0];
  const sidePanelBlock = blocks.filter(
    (block) => block.type === "side-panel"
  )?.[0];

  function handleBlockTypeChange(blockType: BLOCK_TYPE) {
    console.log("headerBlock", headerBlock);
    switch (blockType) {
      case "header":
        selectBlock(headerBlock?.id!);
        return;
      case "side-panel":
        selectBlock(sidePanelBlock?.id!);
        return;
      default:
        selectBlockCopy(blankBlock[blockType]);
    }
  }

  return (
    <BlockEditorDialogContainer>
      <DialogRoot
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
        open={show}
      >
        <DialogOverlay />
        <DialogPortal>
          <DialogContent>
            <>
              <Flex
                direction="column"
                css={{
                  padding: "25px 50px 45px",
                }}
              >
                <DialogTitle>Add Section</DialogTitle>
                <DialogDescription>
                  Add the details of where you have previously recived a working
                  experience or internship
                </DialogDescription>
                <DropdownRoot>
                  <DropdownTrigger css={{ marginTop: 20 }}>
                    {(
                      <span style={{ textTransform: "capitalize" }}>
                        {selectedBlock?.type?.split("-").join(" ")}
                      </span>
                    ) || "Select a section"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M19 9L12 15L5 9"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </DropdownTrigger>
                  <DropdownPortal>
                    <DropdownContent sideOffset={5}>
                      {BLOCK_TYPES.map((type) => (
                        <DropdownItem
                          key={type}
                          onClick={() => handleBlockTypeChange(type)}
                        >
                          {transformLabel(type)}
                        </DropdownItem>
                      ))}
                    </DropdownContent>
                  </DropdownPortal>
                </DropdownRoot>
              </Flex>
              <Flex
                direction="column"
                css={{
                  padding: "25px 50px 45px",
                  backgroundColor: "$ash",
                }}
              >
                {selectedBlock?.type && <Block />}
              </Flex>
            </>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </BlockEditorDialogContainer>
  );
};

const BlockEditorDialogContainer = styled.div``;
