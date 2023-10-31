import { BLOCK_TYPE } from "@/store/ResumeBuilderContext";

export function transformLabel(label: string) {
  const removeCamel = label.replace(/([A-Z])/g, " $1");
  return removeCamel.charAt(0).toUpperCase() + removeCamel.slice(1);
}

export const generateBlankExperience = () => {
  return {
    id: `work-${String(new Date().getTime() / 1000)}`,
    type: "work-experience" as BLOCK_TYPE,
    content: {
      companyName: "",
      roles: [
        {
          title: "",
          startDate: "2023-01-01",
          endDate: "2023-01-01",
        },
      ],

      highlights: [""],
    },
  };
};

export const generateBlankAward = () => {
  return {
    id: `award-${String(new Date().getTime() / 1000)}`,
    type: "award" as BLOCK_TYPE,
    content: {
      title: "",
      companyName: "",
      date: "2023-01-01",
      description: "",
    },
  };
};

export const generateBlankEducation = () => {
  return {
    id: `education-${String(new Date().getTime() / 1000)}`,
    type: "education" as BLOCK_TYPE,
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

export const generateBlankSidePanel = () => {
  return {
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
};

export const generateBlankHeader = () => {
  return {
    type: "header",
    id: `header-${String(new Date().getTime() / 1000)}`,
    content: {
      name: {
        formType: "string",
        formValue: "",
      },

      website: {
        formType: "string",
        formValue: "",
      },

      phone: {
        formType: "string",
        formValue: "",
      },
      email: {
        formType: "string",
        formValue: "",
      },

      location: {
        formType: "string",
        formValue: "",
      },
    },
  };
};
