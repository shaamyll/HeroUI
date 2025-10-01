// DynamicForm.tsx - Updated version without InputConfig dependency
import React from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import SearchableSelect from "../Reusable/SearchableSelect";

export interface DropdownOption {
  value: string;
  label: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

export interface FormConfig {
  title?: string;
  button?: {
    label: string;
    onClick: () => void;
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
  };
  searchBar?: {
    label?: string;
    type?: "text" | "email" | "url" | "password" | "tel" | "search" | "file";
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    isClearable?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    startContent?: React.ReactNode;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    fullWidth?: boolean;
    size?: "sm" | "md" | "lg";
  };
  dropdowns: {
    options: DropdownOption[];
    placeholder?: string;
    value?: DropdownOption | DropdownOption[] | null;
    onChange?: (option: DropdownOption | DropdownOption[] | null) => void;
    showSearch?: boolean;
    disabled?: boolean;
    label?: string;
    selectionMode?: "single" | "multiple";
    width?: string | number;
  }[];
}

interface DynamicFormProps {
  config: FormConfig;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config }) => {
  return (
    <div className="p-6 bg-white rounded-lg border border-default-200 shadow-xs">
      {/* Header Section - Title (left) and Button (right) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Title - Top Left Corner */}
        {config.title && (
          <h2 className="text-2xl font-bold text-default-900">{config.title}</h2>
        )}
        
        {/* Button - Top Right Corner */}
        {config.button && (
          <CustomButton
            label={config.button.label}
            onPress={config.button.onClick}
            variant={config.button.variant || "solid"}
            color={config.button.color || "primary"}
            size={config.button.size || "md"}
            className="sm:self-end"
          />
        )}
      </div>
      
      {/* Form Content */}
      <div className="space-y-6">
        {/* Search Bar - Full Width */}
        {config.searchBar && (
          <div className="w-full">
            <CustomInput
              label={config.searchBar.label}
              type={config.searchBar.type || "search"}
              placeholder={config.searchBar.placeholder}
              value={config.searchBar.value}
              onChange={config.searchBar.onChange}
              isClearable={config.searchBar.isClearable}
              isDisabled={config.searchBar.isDisabled}
              isReadOnly={config.searchBar.isReadOnly}
              startContent={config.searchBar.startContent}
              variant={config.searchBar.variant || "bordered"}
              fullWidth={config.searchBar.fullWidth !== false}
              size={config.searchBar.size || "lg"}
            />
          </div>
        )}
        
        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {config.dropdowns.map((dropdown, index) => {
            let width: string | number = "100%";
            if (dropdown.width) {
              width = dropdown.width;
            } else if (dropdown.showSearch === false) {
              width = 200;
            } else if (dropdown.showSearch === true) {
              width = 280;
            }

            return (
              <div key={index} className="flex flex-col gap-2">
                {dropdown.label && (
                  <label className="text-sm font-medium text-default-700">
                    {dropdown.label}
                  </label>
                )}
                <SearchableSelect
                  options={dropdown.options}
                  placeholder={dropdown.placeholder}
                  value={dropdown.value}
                  onChange={dropdown.onChange}
                  showSearch={dropdown.showSearch !== false}
                  selectionMode={dropdown.selectionMode || "single"}
                  disabled={dropdown.disabled}
                  width={width}
                  searchPlaceholder={`Search ${dropdown.label?.toLowerCase() || "options"}...`}
                  closeOnSelect={dropdown.selectionMode === "single"}
                  maxSelectedDisplay={dropdown.selectionMode === "multiple" ? 2 : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;