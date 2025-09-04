// User form config
export const userFormConfig: FormConfig = {
  name: { type: "text", label: "Name", required: true },
  email: { type: "email", label: "Email", required: true },
  role: {
    type: "select",
    label: "Role",
    required: true,
    options: [
      { label: "Developer", value: "Developer" },
      { label: "P. Manager", value: "P. Manager" },
      { label: "Designer", value: "Designer" },
    ],
  },
  status: {
    type: "select",
    label: "Status",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  team: {
    type: "select",
    label: "Team",
    required: true,
    options: [
      { label: "Management", value: "Management" },
      { label: "Engineering", value: "Engineering" },
      { label: "QA", value: "QA" },
    ],
  },
};

// Project form config
export const projectFormConfig: FormConfig = {
  projectName: { type: "text", label: "Project Name", required: true },
  projectStatus: {
    type: "select",
    label: "Project Status",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Completed", value: "completed" },
      { label: "On Hold", value: "onHold" },
    ],
  },
  projectDifficulty: {
    type: "select",
    label: "Difficulty",
    required: true,
    options: [
      { label: "Easy", value: "easy" },
      { label: "Medium", value: "medium" },
      { label: "Hard", value: "hard" },
    ],
  },
};