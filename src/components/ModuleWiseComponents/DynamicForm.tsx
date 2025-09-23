// DynamicForm.tsx
import React from "react";
import { Button } from "@heroui/react";
import CustomDropdown, { type DropdownOption } from "../Reusable/CustomDropdown";
import type { InputConfig } from "../common/CustomInput";
import InputTypeComponents from "../common/CustomInput";

export interface FormConfig {
  title?: string;
  button?: {
    label: string;
    onClick: () => void;
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  };
  searchBar?: InputConfig;
  dropdowns: {
    options: DropdownOption[];
    placeholder?: string;
    value?: DropdownOption | null;
    onChange?: (option: DropdownOption | null) => void;
    showSearch?: boolean;
    disabled?: boolean;
    label?: string;
  }[];
}

interface DynamicFormProps {
  config: FormConfig;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Title */}
      {config.title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{config.title}</h2>
      )}
      
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        {config.searchBar && (
          <div className="mb-2">
            <InputTypeComponents inputConfigs={[config.searchBar]} />
          </div>
        )}
        
        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4 items-center">
          {config.dropdowns.map((dropdown, index) => (
            <div key={index} className="flex flex-col gap-1">
              {dropdown.label && (
                <label className="text-sm font-medium text-gray-700">
                  {dropdown.label}
                </label>
              )}
              <CustomDropdown
                options={dropdown.options}
                placeholder={dropdown.placeholder}
                value={dropdown.value}
                onChange={dropdown.onChange}
                showSearch={dropdown.showSearch}
                disabled={dropdown.disabled}
                buttonClassName="min-w-[180px]"
                showSearch={true}
              />
            </div>
          ))}
        </div>
        
        {/* Button */}
        {config.button && (
          <div className="mt-4">
            <Button
              onClick={config.button.onClick}
              variant={config.button.variant || "solid"}
              color={config.button.color || "primary"}
            >
              {config.button.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;