import {
  createContext,
  FC,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

export type BLOCK_TYPE =
  | "header"
  | "work-experience"
  | "award"
  | "education"
  | "side-panel";

type Block = {
  id: string;
  type: BLOCK_TYPE;
  content: any; // define later
};

interface AwardContentBlockI {
  title: string;
  companyName: string;
  date: string;
  description: string;
}

interface EducationContentBlockI {
  schoolName: string;
  state: string;
  country: string;
  degree: string;
  startDate: string;
  endDate: string;
}

const educationBlockSample: Block = {
  id: `education-${String(new Date().getTime() / 1000)}`,
  type: "education",
  /**
   * TODO: define content type
   */
  content: {
    schoolName: "University of Virginia",
    state: "San Francisco, CA",
    country: "United States",
    degree: "B.S. in Computer Science",
    startDate: "2012-08-01",
    endDate: "2016-05-01",
  },
};

const awardBlockSample: Block = {
  id: `award-${String(new Date().getTime() / 1000)}`,
  type: "award",
  /**
   * TODO: define content type
   */
  content: {
    title: "Best Design",
    companyName: "ChipperCash",
    date: "2019-01-01",
    description: "Awarded best design for the year",
  },
};

const sidePanelBlockSample: Block = {
  id: `side-panel-${String(new Date().getTime() / 1000)}`,
  type: "side-panel",
  /**
   * TODO: define content type
   */
  content: {
    skills: ["React", "Typescript", "Javascript", "Node.js"],
    education: [
      {
        schoolName: "University of Virginia",
        state: "San Francisco, CA",
        country: "United States",
        degree: "B.S. in Computer Science",
        startDate: "2012-08-01",
        endDate: "2016-05-01",
      },
    ],
  },
};

const workExperience: Block = {
  id: `work-${String(new Date().getTime() / 1000)}`,
  type: "work-experience",
  content: {
    companyName: "ChipperCash",
    roles: [
      {
        title: "Design lead",
        startDate: "2018-11-01",
        endDate: "2020-01-01",
      },
    ],

    highlights: [
      "Design system owner responsible for defining and maintaining design standards.",
      `Led team of 13 designers, researchers, and content designers, to ensure craft, consistency, and solid
       user experiences across Mobile and Web. Created roadmaps, processes, and structure for the Design team.`,
      `Lead on the brand update project,working on market research, coordinating brand strategy, and
                  executing on design solutions to refresh and elevate brand identity.`,
    ],
  },
};

const headerBlockSample: Block = {
  type: "header",
  id: `header-${String(new Date().getTime() / 1000)}`,
  content: {
    name: {
      formType: "string",
      formValue: "Jon Dang",
    },

    phone: {
      formType: "string",
      formValue: "571.225.5960",
    },
    email: {
      formType: "string",
      formValue: "jondang@gmail.com",
    },

    location: {
      formType: "string",
      formValue: "San Francisco, CA",
    },
  },
};

type ResumeBuilderContextProps = {
  blocks: Block[];
  headerBlock?: Block;
  awardBlock?: Block;
  educationBlock?: Block;
  sidePanelBlock?: Block;
  selectedBlock?: Block | null;
  selectBlock: (blockId: string) => void;
  removeSelectedBlock: () => void;
  editHeaderField: (headerBlock: any) => void;
  updateWorkBlock: (block: any) => void;
  updateAwardBlock: (block: any) => void;
  updateEducationBlock: (block: any) => void;
  updateSidePanelBlock: (block: any) => void;
  selectBlockCopy: (block: Block) => void;
};

const ResumeBuilderContext = createContext<ResumeBuilderContextProps>({
  blocks: [],
  selectBlock: () => {},
  removeSelectedBlock: () => {},
  editHeaderField: () => {},
  updateWorkBlock: () => {},
  updateAwardBlock: () => {},
  updateSidePanelBlock: () => {},
  updateEducationBlock: () => {},
  selectBlockCopy: () => {},
});

export const ResumeBuilderProvider: FC = ({ children }) => {
  const [blocks, setBlocks] = useState<Block[] | []>([
    headerBlockSample,
    workExperience,
    awardBlockSample,
    educationBlockSample,
    sidePanelBlockSample,
  ]);

  const [selectedBlock, setSelectBlock] = useState<Block | null>(null);

  const selectBlock = useCallback(
    (blockId: string) => {
      const block = blocks.filter((block: Block) => block.id === blockId)?.[0];
      setSelectBlock(block);
    },
    [blocks]
  );

  const headerBlock = useMemo(() => {
    if (selectedBlock && selectedBlock.type === "header") return selectedBlock;
  }, [selectedBlock]);

  const awardBlock = useMemo(() => {
    if (selectedBlock && selectedBlock.type === "award") return selectedBlock;
  }, [selectedBlock]);

  const educationBlock = useMemo(() => {
    if (selectedBlock && selectedBlock.type === "education")
      return selectedBlock;
  }, [selectedBlock]);

  const sidePanelBlock = useMemo(() => {
    if (selectedBlock && selectedBlock.type === "side-panel")
      return selectedBlock;
  }, [selectedBlock]);

  const editHeaderField = useCallback(
    (props) => {
      const updatedBlock = {
        ...headerBlock,
        content: props,
      };

      const updateBlocks = [
        ...blocks.filter((block) => block.id !== updatedBlock.id),
        updatedBlock,
      ];

      setBlocks(updateBlocks as Block[]);
      setSelectBlock(null);
    },
    [blocks, headerBlock]
  );

  const updateWorkBlock = useCallback(
    (props) => {
      const updatedBlocks = [
        ...blocks.filter((block) => block.id !== props.id),
        props,
      ];

      setBlocks(updatedBlocks as Block[]);
      setSelectBlock(null);
    },
    [blocks]
  );

  const updateAwardBlock = useCallback(
    (props) => {
      const updatedBlocks = [
        ...blocks.filter((block) => block.id !== props.id),
        props,
      ];

      setBlocks(updatedBlocks as Block[]);
      setSelectBlock(null);
    },
    [blocks, awardBlock]
  );

  const updateEducationBlock = useCallback(
    (props) => {
      const updatedBlocks = [
        ...blocks.filter((block) => block.id !== props.id),
        props,
      ];

      setBlocks(updatedBlocks as Block[]);
      setSelectBlock(null);
    },
    [blocks, educationBlock]
  );

  const updateSidePanelBlock = useCallback(
    (props) => {
      const updatedBlocks = [
        ...blocks.filter((block) => block.id !== props.id),
        props,
      ];

      setBlocks(updatedBlocks as Block[]);
      setSelectBlock(null);
    },
    [blocks, sidePanelBlock]
  );

  const values = useMemo(() => {
    return {
      blocks,
      selectedBlock,
      selectBlock,
      headerBlock,
      removeSelectedBlock: () => setSelectBlock(null),
      editHeaderField,
      updateWorkBlock,
      updateAwardBlock,
      updateEducationBlock,
      updateSidePanelBlock,
      selectBlockCopy: (props: Block) => {
        setSelectBlock(props);
      },
    };
  }, [
    blocks,
    updateWorkBlock,
    selectBlock,
    selectedBlock,
    headerBlock,
    editHeaderField,
  ]);

  return (
    <ResumeBuilderContext.Provider value={values}>
      {children}
    </ResumeBuilderContext.Provider>
  );
};

export const useResumeBuilder = () => {
  return useContext(ResumeBuilderContext);
};
