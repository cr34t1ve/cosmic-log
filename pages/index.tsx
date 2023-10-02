import { useCallback, useMemo, useRef } from "react";
import { styled } from "@/stitches.config";
import { sand, grass } from "@radix-ui/colors";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";

import {
  ResumeBuilderProvider,
  useResumeBuilder,
} from "@/store/ResumeBuilderContext";
import { BlockEditorDialog } from "../components";
import Head from "next/head";

function getValueFromBlock(block, name) {
  return block?.content[name]?.formValue || "";
}

function formatDate(dateString: string) {
  return format(new Date(dateString), "LLL y");
}

const generateBlankExperience = () => {
  return {
    id: `work-${String(new Date().getTime() / 1000)}`,
    type: "work-experience",
    content: {
      companyName: "",
      roles: [
        {
          title: "",
          startDate: "",
          endDate: "",
        },
      ],

      highlights: [""],
    },
  };
};

const generateBlankAward = () => {
  return {
    id: `award-${String(new Date().getTime() / 1000)}`,
    type: "award",
    content: {
      title: "",
      companyName: "",
      date: "2023-01-01",
      description: "",
    },
  };
};

const generateBlankEducation = () => {
  return {
    id: `education-${String(new Date().getTime() / 1000)}`,
    type: "education",
    content: {
      schoolName: "",
      startDate: "2023-01-01",
      endDate: "2023-01-01",
      degree: "",
      state: "",
      country: "",
    },
  };
};

const ResumeContainer = () => {
  return (
    <ResumeBuilderProvider>
      <ResumeV2 />
    </ResumeBuilderProvider>
  );
};

const Header = ({ headerBlock, selectBlock }) => {
  return (
    <HeaderWrapper
      className="block"
      onClick={() => selectBlock(headerBlock.id)}
    >
      <h1>{getValueFromBlock(headerBlock, "name")}</h1>
      <Divider />
      <div className="header-info">
        <h4 className="header-info__item">
          {getValueFromBlock(headerBlock, "name")}
        </h4>
        <h4 className="header-info__item">
          {getValueFromBlock(headerBlock, "phone")}
        </h4>
        <h4 className="header-info__item">
          {getValueFromBlock(headerBlock, "email")}
        </h4>
        <h4 className="header-info__item">
          {getValueFromBlock(headerBlock, "location")}
        </h4>
      </div>
    </HeaderWrapper>
  );
};

const SidePanel = ({ sidePanelBlock, selectBlock }) => {
  return (
    <section
      className="side-panel block"
      onClick={() => selectBlock(sidePanelBlock?.id)}
    >
      {sidePanelBlock?.content?.skills.length > 0 && (
        <div className="mb-4">
          <h3 className="block-title">Skills</h3>
          <div className="divider" />
          <div className="skills">
            {sidePanelBlock?.content?.skills.map(
              (skill: any, index: number) => {
                return (
                  <p className="sidebar-item" key={index}>
                    {skill}
                  </p>
                );
              }
            )}
          </div>
        </div>
      )}

      {sidePanelBlock?.content?.education.length > 0 && (
        <>
          <h3 className="block-title">Education</h3>
          <div className="divider" />
          <div className="education">
            {sidePanelBlock?.content?.education.map(
              (education: any, index: number) => {
                return (
                  <p className="sidebar-item" key={index}>
                    {education.schoolName}
                  </p>
                );
              }
            )}
          </div>
        </>
      )}
    </section>
  );
};

const ResumeV2 = () => {
  const containerRef = useRef(null);

  const reactToPrintContent = useCallback(() => {
    return containerRef.current;
  }, [containerRef.current]);

  const saveToPDF = useReactToPrint({
    content: reactToPrintContent,
  });

  const {
    blocks,
    selectedBlock,
    selectBlock,
    removeSelectedBlock,
    selectBlockCopy,
  } = useResumeBuilder();

  const headerBlock = blocks.filter((block) => block.type === "header")?.[0];

  const sidePanelBlock = blocks.filter(
    (block) => block.type === "side-panel"
  )?.[0];

  const workExperienceBlocks = useMemo(() => {
    return blocks.filter((block) => block.type === "work-experience");
  }, [blocks]);

  const awardsHistoryBlocks = useMemo(() => {
    return blocks.filter((block) => block.type === "award");
  }, [blocks]);

  function saveConfiguration() {
    console.log(JSON.stringify(blocks, null, 2));
  }

  return (
    <Layout className="layout" ref={containerRef}>
      <Head>
        <title>Resume on steriods</title>
      </Head>
      <BlockEditorDialog
        show={Boolean(selectedBlock)}
        closeModal={() => removeSelectedBlock()}
      />

      <Toolbar className="toolbar">
        <div className="logo">ResumeBuilder</div>
        <button className="resume-button" onClick={saveConfiguration}>
          Save Configuration
        </button>
        <button className="resume-button" onClick={saveToPDF}>
          Save PDF
        </button>
      </Toolbar>

      <ContentWrapper className="content-wrapper">
        <Header headerBlock={headerBlock} selectBlock={selectBlock} />

        <section className="resume-summary">
          <div className="work-history">
            <div className="section-wrapper">
              <h2>Experience</h2>
              {workExperienceBlocks.map((block: any, index: number) => {
                const workBlock = block.content;
                return (
                  <div
                    className="work-history__item block"
                    style={{
                      borderBottom: `1px solid ${
                        index === workExperienceBlocks.length - 1
                          ? "transparent"
                          : sand.sand5
                      }`,
                    }}
                    key={block.id}
                    onClick={() => selectBlock(block.id)}
                  >
                    <div className="company-details">
                      <h3 className="block-title">{workBlock.companyName}</h3>
                      <Divider short margin={8} />
                      <div className="roles">
                        {workBlock.roles.map((role, index) => {
                          return (
                            <div className="role" key={`${role}-${index}`}>
                              <p className="block-subtitle">{role.title}</p>
                              <p className="block-date">
                                {formatDate(role.startDate)} -{" "}
                                {formatDate(role.endDate)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="highlights">
                      {workBlock.highlights.map((highlight) => {
                        return (
                          <p
                            className="highlight"
                            key={`${Math.random()}-${new Date().valueOf()}`}
                          >
                            {highlight}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="section-wrapper">
              <h2 className="mt-4">Awards</h2>
              {awardsHistoryBlocks.map((block) => {
                const awardBlock = block.content;

                return (
                  <div
                    className="work-history__item block"
                    key={block.id}
                    onClick={() => selectBlock(block.id)}
                  >
                    <div className="company-details">
                      <h3 className="block-title">{awardBlock.companyName}</h3>
                      <Divider short margin={8} />

                      <p className="block-date">
                        {formatDate(awardBlock.date)}
                      </p>
                    </div>
                    <div className="highlights">
                      <p className="award-title">{awardBlock.title}</p>
                      <p className="">{awardBlock.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="add-new-experience">
              <button
                className="resume-button medium mr-2"
                onClick={() => selectBlockCopy(generateBlankExperience())}
              >
                Add new experince
              </button>
              <button
                className="resume-button medium mr-2"
                onClick={() => selectBlockCopy(generateBlankAward())}
              >
                Add new award
              </button>
              <button
                className="resume-button medium"
                onClick={() => selectBlockCopy(generateBlankEducation())}
              >
                Add new education
              </button>
            </div>
          </div>
          <SidePanel
            sidePanelBlock={sidePanelBlock}
            selectBlock={selectBlock}
          />
        </section>
      </ContentWrapper>
    </Layout>
  );
};

const Toolbar = styled("section", {
  display: "flex",
  padding: "20px 15rem",
  borderBottom: "1px solid $sand5",

  "& .logo": {
    marginRight: "auto",
  },

  "& button": {
    marginLeft: "20px",
  },
});

const Divider = styled("div", {
  width: "100%",
  height: "0.5px",
  backgroundColor: "$gray",

  variants: {
    short: {
      true: {
        width: "10%",
      },
    },
    color: {
      sand: {
        backgroundColor: "$sand5",
      },
    },
    margin: {
      8: {
        marginTop: 8,
        marginBottom: 8,
      },
      18: {
        marginTop: 18,
        marginBottom: 18,
      },
    },
  },
});

const HeaderWrapper = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: 16,

  "& h1": {
    fontSize: "40px",
    fontWeight: "600",
  },

  "& .header-info": {
    display: "flex",
    gap: "30px",

    "&__item": {
      fontSize: "12px",
      fontWeight: "600",
      /* text-transform: uppercase; */
    },
  },
});

const ContentWrapper = styled("section", {
  maxWidth: 895,
  margin: "0 auto",
  padding: "0 3rem",

  // "@media (print)": {
  //   width: "200px",
  // },
});

const Layout = styled("main", {
  minHeight: "100vh",

  ".header-info__item": {
    whiteSpace: "nowrap",
  },

  ".block": {
    transition: "all 0.2s",

    "&:hover": {
      outline: `1.5px solid ${grass.grass8}`,
      outlineOffset: "2rem",
      cursor: "pointer",
    },
  },

  ".resume-summary": {
    marginTop: "60px",
    display: "flex",
    gap: "20px",

    ".work-history": {
      flex: "8",
      display: "grid",
      gridColumn: "span 4",

      "&__item": {
        paddingTop: "30px",
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(4, 1fr)",
        alignItems: "flex-start",

        ".company-details": {
          height: "100%",

          ".mini-divider": {
            width: "18px",
            margin: "20px 0",
            display: "flex",
            backgroundColor: "$sand9",
            height: "2px",
          },

          ".roles": {
            ".role": {
              "&__title": {
                fontWeight: "600",
              },

              "&__tenure": {
                marginTop: "5px",
                fontSize: "16px",
              },
            },
          },
        },

        "p.award-title": {
          fontSize: "20px",
          marginBottom: "10px",
          display: "flex",
          width: "80%",
          fontFamily: "CabinetGrotesk",
        },

        ".highlights": {
          display: "grid",
          gridColumn: "span 3",

          "p.highlight": {
            marginBottom: "30px",
            display: "flex",
            width: "80%",

            "&:before": {
              content: "'→'",
              marginRight: "10px",
              fontFamily: "system-ui",
              display: "block",
            },
          },
        },
      },
    },
  },

  ".add-new-experience": {
    marginTop: "40px",
  },
});

export default ResumeContainer;
