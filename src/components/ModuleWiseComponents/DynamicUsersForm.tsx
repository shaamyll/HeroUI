import React from "react";
import { Button, Card, CardBody, Chip, Divider } from "@heroui/react";
import CustomInput from "../common/CustomInput";
import CustomDropdown, { type DropdownOption } from "../Reusable/CustomDropdown";
import { CustomCardDropdown } from "./CustomCardDropdown";
import { LargeCardDropdown } from "./LargeCardDropdown";
import type { InputConfig } from "@/types/common";

export interface UserFormConfig {
  mode: "create" | "edit";
  title: string;
  description?: string;
  userInfo: {
    fullName: InputConfig;
    email: InputConfig;
    nationality: {
      options: DropdownOption[];
      value: DropdownOption | null;
      onChange: (option: DropdownOption | null) => void;
    };
    password: InputConfig;
    confirmPassword: InputConfig;
    address: InputConfig;
    phone: {
      countryCode: string;
      value: string;
      onChange: (value: string) => void;
    };
    gender: {
      options: DropdownOption[];
      value: DropdownOption | null;
      onChange: (option: DropdownOption | null) => void;
    };
  };
  permissions: {
    templates: {
      cardTitle: string;
      buttonTitles: string[];
      dropdownItems: string[];
    }[];
    availableModules: {
      cardTitle: string;
      dropdownItems: string[];
      onSelectionChange?: (selectedItems: Set<string>) => void;
    }[];
    lyncsUsers: {
      cardTitle: string;
      dropdownItems: string[];
      onSelectionChange?: (selectedItems: Set<string>) => void;
    }[];
  };
  onSubmit: () => void;
  onCancel?: () => void;
}

const DynamicUsersForm: React.FC<UserFormConfig> = (config) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{config.title}</h1>
        {config.description && (
          <p className="text-gray-600 mt-2">{config.description}</p>
        )}
      </div>
      {/* User Information Section */}
      <Card className="mb-6">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name*</label>
              <CustomInput inputConfigs={[config.userInfo.fullName]} />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email*</label>
              <InputTypeComponents inputConfigs={[config.userInfo.email]} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Nationality Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nationality Status*</label>
              <CustomDropdown
                options={config.userInfo.nationality.options}
                value={config.userInfo.nationality.value}
                onChange={config.userInfo.nationality.onChange}
                placeholder="Select Nationality"
              />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password*</label>
              <InputTypeComponents inputConfigs={[config.userInfo.password]} />
            </div>
          </div>
          <Divider className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Address*</label>
              <InputTypeComponents inputConfigs={[config.userInfo.address]} />
            </div>
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone*</label>
              <div className="flex items-center gap-2">
                <Chip variant="flat" color="primary" className="min-w-[60px]">
                  {config.userInfo.phone.countryCode}
                </Chip>
                <InputTypeComponents
                  inputConfigs={[
                    {
                      id: "phone",
                      type: "text",
                      label: "",
                      placeholder: "Enter phone number",
                      defaultValue: config.userInfo.phone.value,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender*</label>
              <CustomDropdown
                options={config.userInfo.gender.options}
                value={config.userInfo.gender.value}
                onChange={config.userInfo.gender.onChange}
                placeholder="Select Gender"
              />
            </div>
            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password*</label>
              <InputTypeComponents
                inputConfigs={[config.userInfo.confirmPassword]}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* User Permissions Section */}
      <Card className="mb-6">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">User Permissions</h2>
          {/* Permission Templates */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Permission Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.permissions.templates.map((template, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <CustomCardDropdown
                    cardTitle={template.cardTitle}
                    buttonTitles={template.buttonTitles}
                    dropdownItems={template.dropdownItems}
                  />
                </div>
              ))}
            </div>
          </div>

          <Divider className="my-6" />
          {/* Available Modules */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Available Modules</h3>
            <div className="space-y-6">
              {config.permissions.availableModules.map((module, index) => (
                <LargeCardDropdown
                  key={index}
                  cardTitle={module.cardTitle}
                  dropdownItems={module.dropdownItems}
                />
              ))}
            </div>
          </div>

          <Divider className="my-6" />
          {/* Lyncs Users */}
          <div>
            <h3 className="text-lg font-medium mb-3">Lyncs Users</h3>
            <div className="space-y-6">
              {config.permissions.lyncsUsers.map((userType, index) => (
                <LargeCardDropdown
                  key={index}
                  cardTitle={userType.cardTitle}
                  dropdownItems={userType.dropdownItems}
                />
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        {config.onCancel && (
          <Button variant="flat" onClick={config.onCancel}>
            Cancel
          </Button>
        )}
        <Button color="primary" onClick={config.onSubmit}>
          {config.mode === "create" ? "Create User" : "Update User"}
        </Button>
      </div>
    </div>
  );
};

export default DynamicUsersForm;