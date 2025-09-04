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

export const projectFormConfig: FormConfig = {
  projectName: { type: "text", label: "Project Name", required: true },
  assignedUser: {
    type: "select",
    label: "Assigned User",
    required: true,
    options: [
      // You'll need to fetch actual users here
      { label: "Zoey Lang", value: "2" },
      // Add more users as needed
    ],
  },
  timePeriod: { 
    type: "text", 
    label: "Time Period", 
    required: true,
    placeholder: "e.g., Q3 2024"
  },
  projectStatus: {
    type: "select",
    label: "Project Status",
    required: true,
    options: [
      { label: "Not Started", value: "not_started" },
      { label: "In Progress", value: "in_progress" },
      { label: "Completed", value: "completed" },
      { label: "On Hold", value: "on_hold" },
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
  isActive: {
    type: "select",
    label: "Active Status",
    required: true,
    options: [
      { label: "Active", value: "true" },
      { label: "Inactive", value: "false" },
    ],
  },
};