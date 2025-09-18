import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input
} from "@heroui/react";
import { ChevronDown } from "lucide-react";

// Interface for dropdown item structure
interface DropdownOption {
  key: string;
  label: string;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

// Interface for component props
interface CustomDropdownProps {
  options?: DropdownOption[];
  placeholder?: string;
  defaultSelectedKey?: string;
  selectedKeys?: Set<string>; 
  onSelectionChange?: (selectedKeys: Set<string>) => void;
  buttonClassName?: string;
  dropdownClassName?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  matchWidth?: boolean;
  disabled?: boolean;
}

function CustomDropdown({
  options = [],
  placeholder = "Select an option",
  defaultSelectedKey = "",
  selectedKeys,
  onSelectionChange,
  buttonClassName,
  dropdownClassName,
  searchPlaceholder = "Search options...",
  showSearch = false,
  matchWidth = false,
  disabled = false,
}: CustomDropdownProps) {
  const [searchValue, setSearchValue] = useState("");

  // Use selectedKeys prop if provided, otherwise fall back to internal state
  const currentSelectedKeys = selectedKeys || new Set(defaultSelectedKey ? [defaultSelectedKey] : []);
  const currentSelectedKey = currentSelectedKeys.size > 0 ? Array.from(currentSelectedKeys)[0] : "";

  // Filter options based on search value
  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      (option.description && option.description.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [options, searchValue]);

  // Get display value for selected option
  const displayValue = React.useMemo(() => {
    if (!currentSelectedKey) return placeholder;

    const selectedOption = options.find(option => option.key === currentSelectedKey);
    return selectedOption ? selectedOption.label : placeholder;
  }, [currentSelectedKey, options, placeholder]);

  // Handle selection change
  const handleSelectionChange = (key: any) => {
    const selectedKeyArray = Array.from(key);
    const newSelectedKey = selectedKeyArray[0] as string;

    // If the same key is clicked again, clear the selection
    if (currentSelectedKey === newSelectedKey) {
      if (onSelectionChange) {
        onSelectionChange(new Set());
      }
    } else {
      if (onSelectionChange) {
        onSelectionChange(new Set([newSelectedKey]));
      }
    }
  };

  // Clear search when dropdown closes or selection changes
  useEffect(() => {
    setSearchValue("");
  }, [currentSelectedKey]);

  return (
    <div>
      <Dropdown
        classNames={{
          content: `${dropdownClassName} ${matchWidth ? 'min-w-0' : ''} max-h-64 overflow-y-auto`,
        }}
      >
        <DropdownTrigger>
          <Button
            className={`${buttonClassName} flex justify-start ${disabled ? 'opacity-50 cursor-not-allowed' : ''} text-left`}
            variant="ghost"
            endContent={<ChevronDown className={`w-4 h-4 transition-transform ${disabled ? 'opacity-50' : ''}`} />}
            disabled={disabled}
          >
            <span className="truncate text-left flex-1">
              {displayValue}
            </span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={false}
          selectedKeys={currentSelectedKeys}
          selectionMode="single"
          variant="faded"
          onSelectionChange={handleSelectionChange}
          topContent={
            showSearch ? (
              <div className="px-1 pb-2 sticky top-0 bg-white z-10">
                <Input
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  size="sm"
                  variant="bordered"
                  isClearable
                  onClear={() => setSearchValue("")}
                  classNames={{
                    input: "text-sm",
                    inputWrapper: "h-8"
                  }}
                />
              </div>
            ) : null
          }
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <DropdownItem
                key={option.key}
                startContent={option.startContent}
                endContent={option.endContent}
                className={`${option.className}`}
                color={option.color}
                textValue={option.label}
              >
                <div className="flex flex-col">
                  <span className="text-sm ">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="text-xs text-gray-500 mt-0.5">
                      {option.description}
                    </span>
                  )}
                </div>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem key="no-results" isDisabled className="py-4 text-center">
              <span className="text-gray-500 text-sm">No options found</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default CustomDropdown;