import { userData } from '../../Data/User';

// User form config
export const userFormConfig: FormConfig = {
  name: { type: "text", label: "Name", required: true },
  email: { type: "email", label: "Email", required: true },
  role: {
    type: "searchable-select",
    label: "Role",
    required: true,
    placeholder: "Select a role",
    searchPlaceholder: "Search roles...",
    options: [
      { key: "CEO", label: "CEO", value: "CEO", description: "Chief Executive Officer" },
      { key: "Developer", label: "Developer", value: "Developer", description: "Software Developer" },
      { key: "Tester", label: "Tester", value: "Tester", description: "Quality Assurance Tester" },
      { key: "Manager", label: "Manager", value: "Manager", description: "Project Manager" }
    ],
  },
  team: {
    type: "searchable-select",
    label: "Team",
    required: true,
    placeholder: "Select a team",
    searchPlaceholder: "Search teams...",
    options: [
      { key: "Management", label: "Management", value: "Management", description: "Management Team" },
      { key: "Development", label: "Development", value: "Development", description: "Development Team" },
      { key: "Testing", label: "Testing", value: "Testing", description: "Testing Team" }
    ],
  },
  status: {
    type: "searchable-select",
    label: "Status",
    required: true,
    placeholder: "Select status",
    searchPlaceholder: "Search status...",
    options: [
      { key: "active", label: "Active", value: "active", description: "Currently working" },
      { key: "paused", label: "Paused", value: "paused", description: "Temporarily inactive" },
      { key: "vacation", label: "Vacation", value: "vacation", description: "On vacation" }
    ],
  }
};

// Generate user options from user data for searchable dropdown
const getUserOptions = () => {
  return userData.users.map(user => ({
    key: user.id.toString(),
    label: user.name,
    value: user.name,
    description: user.email // Shows email as description under the name
  }));
};

export const projectFormConfig: FormConfig = {
  projectName: { 
    type: "text", 
    label: "Project Name", 
    required: true,
    placeholder: "Enter project name"
  },
  assignedUserName: {
    type: "searchable-select",
    label: "Assigned User",
    required: true,
    placeholder: "Select a user",
    searchPlaceholder: "Search users by name or email...",
    options: getUserOptions()
  },
  timePeriod: { 
    type: "text", 
    label: "Time Period", 
    required: true,
    placeholder: "e.g., Q3 2024"
  },
  projectStatus: {
    type: "searchable-select",
    label: "Project Status",
    required: true,
    placeholder: "Select project status",
    searchPlaceholder: "Search status...",
    options: [
      { key: "in-progress", label: "In Progress", value: "In Progress" },
      { key: "completed", label: "Completed", value: "Completed" },
      { key: "on-hold", label: "On Hold", value: "On Hold" },
    ],
  },
  isActive: {
    type: "searchable-select",
    label: "Active Status",
    required: true,
    placeholder: "Select active status",
    searchPlaceholder: "Search status...",
    options: [
      { key: "true", label: "Active", value: "true" },
      { key: "false", label: "Inactive", value: "false" },
    ],
  },
};

// Alternative: If you want to keep some fields as regular selects and only make certain ones searchable
export const hybridUserFormConfig: FormConfig = {
  name: { type: "text", label: "Name", required: true },
  email: { type: "email", label: "Email", required: true },
  role: {
    type: "searchable-select", // Searchable for better UX
    label: "Role",
    required: true,
    placeholder: "Select a role",
    searchPlaceholder: "Search roles...",
    options: [
      { key: "CEO", label: "CEO", value: "CEO", description: "Chief Executive Officer" },
      { key: "Developer", label: "Developer", value: "Developer", description: "Software Developer" },
      { key: "Tester", label: "Tester", value: "Tester", description: "Quality Assurance Tester" },
      { key: "Manager", label: "Manager", value: "Manager", description: "Project Manager" }
    ],
  },
  team: {
    type: "select", // Keep as regular select if you prefer
    label: "Team",
    required: true,
    options: [
      { label: "Management", value: "Management" },
      { label: "Development", value: "Development" },
      { label: "Testing", value: "Testing" }
    ],
  },
  status: {
    type: "select", // Keep as regular select if you prefer
    label: "Status",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Paused", value: "paused" },
      { label: "Vacation", value: "vacation" }
    ],
  }
};