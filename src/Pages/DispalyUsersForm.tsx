// DisplayUsersForm.tsx
import React, { useState } from "react";
import DynamicUsersForm, { type UserFormConfig } from "../components/ModuleWiseComponents/DynamicUsersForm";
import type { DropdownOption } from "../components/Reusable/CustomDropdown";
import { CustomCardDropdown } from "@/components/ModuleWiseComponents/CustomCardDropdown";
import { LargeCardDropdown } from "@/components/ModuleWiseComponents/LargeCardDropdown";
// Example usage for prop drilling
const dropdownItems: ReadOnlyDropdownItem[] = [
  { key: "1", label: "View" },
  { key: "2", label: "Edit" },
  { key: "3", label: "Delete" },
];


const DisplayUsersForm: React.FC = () => {
  // Common dropdown options
  const nationalityOptions: DropdownOption[] = [
    { value: "saudi", label: "Saudi" },
    { value: "expat", label: "Expat" },
    { value: "other", label: "Other" },
  ];

  const genderOptions: DropdownOption[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  // Permission templates
  const permissionTemplates = [
    {
      cardTitle: "Full Access",
      buttonTitles: ["Apply", "Remove"],
      dropdownItems: ["All Permissions", "Admin Access"],
    },
    {
      cardTitle: "Manager",
      buttonTitles: ["Apply", "Remove"],
      dropdownItems: ["Team Management", "Reporting"],
    },
    {
      cardTitle: "View Only",
      buttonTitles: ["Apply", "Remove"],
      dropdownItems: ["Read Access", "No Edit"],
    },
  ];

  // Available modules with new format
  const availableModules = [
    {
      cardTitle: "Audit",
      dropdownItems: ["View Audit", "Edit Audit"],
      onSelectionChange: (selectedItems: Set<string>) => {
        setCreateUserModuleSelections(prev => ({
          ...prev,
          Audit: selectedItems,
        }));
      },
    },
    {
      cardTitle: "Sop",
      dropdownItems: ["View SOP", "Edit SOP"],
      onSelectionChange: (selectedItems: Set<string>) => {
        setCreateUserModuleSelections(prev => ({
          ...prev,
          Sop: selectedItems,
        }));
      },
    },
    {
      cardTitle: "User",
      dropdownItems: ["View Users", "Edit Users"],
      onSelectionChange: (selectedItems: Set<string>) => {
        setCreateUserModuleSelections(prev => ({
          ...prev,
          User: selectedItems,
        }));
      },
    },
  ];

  // Lyncs users with new format
  const lyncsUsers = [
    {
      cardTitle: "Project",
      dropdownItems: ["Project Manager", "Project Viewer"],
      onSelectionChange: (selectedItems: Set<string>) => {
        setCreateUserRoleSelections(prev => ({
          ...prev,
          Project: selectedItems,
        }));
      },
    },
    {
      cardTitle: "Pulse",
      dropdownItems: ["Pulse User", "Pulse Admin"],
      onSelectionChange: (selectedItems: Set<string>) => {
        setCreateUserRoleSelections(prev => ({
          ...prev,
          Pulse: selectedItems,
        }));
      },
    },
    {
      cardTitle: "Asset",
      dropdownItems: ["Asset Manager", "Asset Viewer"],
      onSelectionChange: (selectedItems: Set<string>) => {
        setCreateUserRoleSelections(prev => ({
          ...prev,
          Asset: selectedItems,
        }));
      },
    },
  ];

  // State for create user form
  const [createUserData, setCreateUserData] = useState({
    fullName: "",
    email: "",
    nationality: null as DropdownOption | null,
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    gender: null as DropdownOption | null,
  });

  const [createUserModuleSelections, setCreateUserModuleSelections] = useState<{
    [key: string]: Set<string>;
  }>({});

  const [createUserRoleSelections, setCreateUserRoleSelections] = useState<{
    [key: string]: Set<string>;
  }>({});

  // Using createUserModuleSelections and createUserRoleSelections for state management

  // State for edit user form
  const [editUserData, setEditUserData] = useState({
    fullName: "Audit Manager",
    email: "audit@sysuid.com",
    nationality: { value: "saudi", label: "Saudi" } as DropdownOption,
    password: "",
    confirmPassword: "",
    address: "123 Main St",
    phone: "555123456",
    gender: { value: "male", label: "Male" } as DropdownOption,
  });

  // Track selections with Set for easier operations
  const [editUserModuleSelections, setEditUserModuleSelections] = useState<{
    [key: string]: Set<string>;
  }>({
    Audit: new Set(["View Audit", "Edit Audit"]),
    User: new Set(["View Users"]),
  });

  const [editUserRoleSelections, setEditUserRoleSelections] = useState<{
    [key: string]: Set<string>;
  }>({
    Project: new Set(["Project Manager"]),
    Asset: new Set(["Asset Viewer"]),
  });

  // Input configurations for create user
  const createUserInputConfigs: UserFormConfig["userInfo"] = {
    fullName: {
      id: "fullName",
      type: "text",
      label: "",
      placeholder: "Enter full name",
      defaultValue: createUserData.fullName,
    },
    email: {
      id: "email",
      type: "email",
      label: "",
      placeholder: "Enter email",
      defaultValue: createUserData.email,
    },
    nationality: {
      options: nationalityOptions,
      value: createUserData.nationality,
      onChange: (option) =>
        setCreateUserData({ ...createUserData, nationality: option }),
    },
    password: {
      id: "password",
      type: "password",
      label: "",
      placeholder: "Enter password",
      defaultValue: createUserData.password,
    },
    confirmPassword: {
      id: "confirmPassword",
      type: "password",
      label: "",
      placeholder: "Confirm password",
      defaultValue: createUserData.confirmPassword,
    },
    address: {
      id: "address",
      type: "text",
      label: "",
      placeholder: "Enter address",
      defaultValue: createUserData.address,
    },
    phone: {
      countryCode: "+966",
      value: createUserData.phone,
      onChange: (value) => setCreateUserData({ ...createUserData, phone: value }),
    },
    gender: {
      options: genderOptions,
      value: createUserData.gender,
      onChange: (option) => setCreateUserData({ ...createUserData, gender: option }),
    },
  };

  // Input configurations for edit user
  const editUserInputConfigs: UserFormConfig["userInfo"] = {
    fullName: {
      id: "editFullName",
      type: "text",
      label: "",
      placeholder: "Enter full name",
      defaultValue: editUserData.fullName,
    },
    email: {
      id: "editEmail",
      type: "email",
      label: "",
      placeholder: "Enter email",
      defaultValue: editUserData.email,
    },
    nationality: {
      options: nationalityOptions,
      value: editUserData.nationality,
      onChange: (option) =>
        option && setEditUserData({ ...editUserData, nationality: option }),
    },
    password: {
      id: "editPassword",
      type: "password",
      label: "",
      placeholder: "Enter new password",
      defaultValue: editUserData.password,
    },
    confirmPassword: {
      id: "editConfirmPassword",
      type: "password",
      label: "",
      placeholder: "Confirm new password",
      defaultValue: editUserData.confirmPassword,
    },
    address: {
      id: "editAddress",
      type: "text",
      label: "",
      placeholder: "Enter address",
      defaultValue: editUserData.address,
    },
    phone: {
      countryCode: "+966",
      value: editUserData.phone,
      onChange: (value) => setEditUserData({ ...editUserData, phone: value }),
    },
    gender: {
      options: genderOptions,
      value: editUserData.gender,
      onChange: (option) => 
        option && setEditUserData({ ...editUserData, gender: option }),
    },
  };

  // Create user form config
  const createUserConfig: UserFormConfig = {
    mode: "create",
    title: "Create New User",
    description: "Add a new user to the system",
    userInfo: createUserInputConfigs,
    permissions: {
      templates: permissionTemplates,
      availableModules: availableModules,
      lyncsUsers: lyncsUsers,
    },
    onSubmit: () => {
      console.log("Creating user:", {
        userData: createUserData,
        moduleSelections: createUserModuleSelections,
        roleSelections: createUserRoleSelections,
      });
      alert("User created successfully!");
    },
    onCancel: () => console.log("Create user cancelled"),
  };

  // Edit user form config
  const editUserConfig: UserFormConfig = {
    mode: "edit",
    title: "Edit User Details",
    description: "Edit users in the system",
    userInfo: editUserInputConfigs,
    permissions: {
      templates: permissionTemplates,
      availableModules: availableModules,
      lyncsUsers: lyncsUsers,
    },
    onSubmit: () => {
      console.log("Updating user:", {
        userData: editUserData,
        moduleSelections: editUserModuleSelections,
        roleSelections: editUserRoleSelections,
      });
      alert("User updated successfully!");
    },
    onCancel: () => console.log("Edit user cancelled"),
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create User Form</h2>
        <DynamicUsersForm {...createUserConfig} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Edit User Form</h2>
        <DynamicUsersForm {...editUserConfig} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">User Permissions (ReadOnlyDropdown Example)</h2>
        <CustomCardDropdown
          title="User Permissions"
          label="Permissions"
          items={dropdownItems}
          appliedLabel="Applied"
          applyLabel="Apply"
          truncatedText="User can view, edit, delete"
          showRolesSection={true}
          roles={["Admin", "Editor"]}
        />
      </div>
    </div>
  );
};

export default DisplayUsersForm;