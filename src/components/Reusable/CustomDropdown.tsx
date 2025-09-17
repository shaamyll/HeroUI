import React, { useState } from "react";
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
  onSelectionChange,
  buttonClassName,
  dropdownClassName,
  searchPlaceholder = "Search options...",
  showSearch = false,
  matchWidth = false,
  disabled = false,
}: CustomDropdownProps) {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const [searchValue, setSearchValue] = useState("");

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
    if (!selectedKey) return placeholder;

    const selectedOption = options.find(option => option.key === selectedKey);
    return selectedOption ? selectedOption.label : placeholder;
  }, [selectedKey, options, placeholder]);

  // Handle selection change
  const handleSelectionChange = (key: any) => {
    const newSelectedKey = Array.from(key)[0] as string;
    setSelectedKey(newSelectedKey);

    if (onSelectionChange) {
      onSelectionChange(new Set([newSelectedKey]));  
    }
  };

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
          selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
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