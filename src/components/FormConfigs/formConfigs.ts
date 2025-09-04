import { userData } from '../../Data/User';

// User form config
export const userFormConfig: FormConfig = {
  name: { type: "text", label: "Name", required: true },
  email: { type: "email", label: "Email", required: true },
  role: {
    type: "select",
    label: "Role",
    required: true,
    options: [
      { label: "CEO", value: "CEO" },
      { label: "Developer", value: "Developer" },
      { label: "Tester", value: "Tester" },
      { label: "Manager", value: "Manager" }
    ],
  },
  team: {
    type: "select",
    label: "Team",
    required: true,
    options: [
      { label: "Management", value: "Management" },
      { label: "Development", value: "Development" },
      { label: "Testing", value: "Testing" }
    ],
  },
  status: {
    type: "select",
    label: "Status",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Paused", value: "paused" },
      { label: "Vacation", value: "vacation" }
    ],
  }
};

// Generate user options from user data
const getUserOptions = () => {
  return userData.users.map(user => ({
    label: user.name,
    value: user.id.toString()
  }));
};

export const projectFormConfig: FormConfig = {
  projectName: { type: "text", label: "Project Name", required: true },
  assignedUser: {
    type: "select",
    label: "Assigned User",
    required: true,
    options: getUserOptions()
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
      { label: "In Progress", value: "In Progress" },
      { label: "Completed", value: "Completed" },
      { label: "On Hold", value: "On Hold" },
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