import { FC } from "react";
import { Dialog } from "@headlessui/react";
import { sand } from "@radix-ui/colors";
import styled from "styled-components";

import { HeaderBlockEditor } from "./builder-forms/HeaderBlockEditor";
import { WorkExperienceEditor } from "./builder-forms/WorkExperienceEditor";

import { BLOCK_TYPE, useResumeBuilder } from "@/store/ResumeBuilderContext";
import { AwardHistoryEditor } from "./builder-forms/AwardHistoryEditor";
import { EducationHistoryEditor } from "./builder-forms/EducationHistoryBlock";
import { SidePanelEditor } from "./builder-forms/SidePanelEditor";

// TODO: Should be: Record<BLOCK_TYPE, React.FC>

const editors: Record<BLOCK_TYPE, any> = {
  header: HeaderBlockEditor,
  "work-experience": WorkExperienceEditor,
  award: AwardHistoryEditor,
  education: EducationHistoryEditor,
  "side-panel": SidePanelEditor,
};

interface BlockEditorDialogProps {
  show: boolean;
  closeModal: () => void;
}

export const BlockEditorDialog: FC<BlockEditorDialogProps> = ({
  show,
  closeModal = () => {},
}) => {
  const { selectedBlock } = useResumeBuilder();

  return (
    <BlockEditorDialogContainer>
      <Dialog onClose={closeModal} open={show}>
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            backgroundColor: "rgba( #bfc2ca, 0.01)",
            backdropFilter: "blur(0.5px)",
          }}
        />
        <div
          style={{
            overflowY: "auto",
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "1rem",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
            }}
          >
            <Dialog.Panel
              style={{
                overflow: "hidden",
                padding: "1.5rem",
                backgroundColor: "#ffffff",
                transitionProperty: "all",
                textAlign: "left",
                verticalAlign: "middle",
                width: "100%",
                maxWidth: selectedBlock?.type === "header" ? "28rem" : "40rem",
                border: `1px solid ${sand.sand5}`,
                borderRadius: "1rem",
                filter:
                  " drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
              }}
            >
              {editors?.[selectedBlock?.type as BLOCK_TYPE]}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </BlockEditorDialogContainer>
  );
};

const BlockEditorDialogContainer = styled.div``;
