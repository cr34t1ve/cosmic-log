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
import { generateBlankExperience } from "@/lib/helpers";

function getValueFromBlock(block: any, name: any) {
  return block?.content[name]?.formValue || "";
}

function formatDate(dateString: string) {
  return format(new Date(dateString), "LLL y");
}

const ResumeContainer = () => {
  return (
    <ResumeBuilderProvider>
      <ResumeV2 />
    </ResumeBuilderProvider>
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
                        {workBlock.roles.map((role: any, index: number) => {
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
                      {workBlock.highlights.map(
                        (highlight: any, index: number) => {
                          return (
                            <p
                              className="highlight"
                              key={`${Math.random()}-${new Date().valueOf()}`}
                            >
                              {highlight}
                            </p>
                          );
                        }
                      )}
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
            <FloatingButton
              onClick={() => selectBlockCopy(generateBlankExperience())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <path
                  d="M33.0003 23.8332H23.8337V32.9998C23.8337 34.0082 23.0087 34.8332 22.0003 34.8332C20.992 34.8332 20.167 34.0082 20.167 32.9998V23.8332H11.0003C9.99199 23.8332 9.16699 23.0082 9.16699 21.9998C9.16699 20.9915 9.99199 20.1665 11.0003 20.1665H20.167V10.9998C20.167 9.9915 20.992 9.1665 22.0003 9.1665C23.0087 9.1665 23.8337 9.9915 23.8337 10.9998V20.1665H33.0003C34.0087 20.1665 34.8337 20.9915 34.8337 21.9998C34.8337 23.0082 34.0087 23.8332 33.0003 23.8332Z"
                  fill="white"
                />
              </svg>
            </FloatingButton>
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

const Header = ({
  headerBlock,
  selectBlock,
}: {
  headerBlock: any;
  selectBlock: any;
}) => {
  return (
    <HeaderWrapper
      className="work-history__item block"
      onClick={() => selectBlock(headerBlock.id)}
    >
      <h1>{getValueFromBlock(headerBlock, "name")}</h1>
      <Divider />
      <div
        className="header-info"
        style={{
          textTransform: "uppercase",
          fontSize: 14,
        }}
      >
        <h4>{getValueFromBlock(headerBlock, "website")}</h4>
        <h4>{getValueFromBlock(headerBlock, "phone")}</h4>
        <h4>{getValueFromBlock(headerBlock, "email")}</h4>
        <h4>{getValueFromBlock(headerBlock, "location")}</h4>
      </div>
    </HeaderWrapper>
  );
};

const SidePanel = ({
  sidePanelBlock,
  selectBlock,
}: {
  sidePanelBlock: any;
  selectBlock: any;
}) => {
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

const FloatingButton = styled("button", {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  width: 75,
  height: 75,
  bottom: 90,
  right: 100,
  backgroundColor: "$accent",
  color: "white",
  borderRadius: "$round",
  cursor: "pointer",
  // padding: 15,
});

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

const Divider = styled("hr", {
  width: "100%",

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

  "& h1": {},

  "& .header-info": {
    display: "flex",
    gap: "30px",

    "&__item": {
      fontSize: "12px",
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
      outline: `1.5px solid $accent`,
      outlineOffset: "0.3rem",
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
              "&__title": {},

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
          // fontFamily: "CabinetGrotesk",
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
