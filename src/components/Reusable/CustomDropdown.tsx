import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input
} from "@heroui/react";
import { ChevronDown, Search, X } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

interface CustomDropdownProps {
  options?: DropdownOption[];
  placeholder?: string;
  value?: DropdownOption | null;
  onChange?: (option: DropdownOption | null) => void;
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
  value,
  onChange,
  buttonClassName,
  dropdownClassName,
  searchPlaceholder = "Search options...",
  showSearch = false,
  disabled = false,
}: CustomDropdownProps) {
  const [searchValue, setSearchValue] = useState("");

  // Filter options
  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      (option.description && option.description.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [options, searchValue]);

  // Display label
  const displayValue = value ? value.label : placeholder;

  // Handle selection change → return id and label
  const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
    const selectedKey = Array.from(keys)[0] as string;
    const selectedOption = options.find(opt => opt.value === selectedKey);

    if (onChange) {
      onChange(selectedOption || null);
    }
  };

  // Clear search when value changes
  useEffect(() => {
    setSearchValue("");
  }, [value]);

  return (
    <Dropdown
      placement="bottom-start"
      classNames={{
        content: `${dropdownClassName} rounded-lg border border-gray-300 bg-white shadow-lg p-0 overflow-hidden`,
      }}
    >
      <DropdownTrigger>
        <Button
          className={`${buttonClassName} flex items-center justify-between text-left ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`}
          variant="faded"
          endContent={<ChevronDown size={16} className="text-gray-500" />}
          disabled={disabled}
        >
          <div className={value ? 'text-gray-900' : 'text-gray-500'}>
            {displayValue}
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        disallowEmptySelection={false}
        selectionMode="single"
        selectedKeys={value ? new Set([value.value]) : new Set()}
        onSelectionChange={handleSelectionChange}
        variant="flat"
          classNames={{
                list: "max-h-[200px] overflow-y-auto custom-scrollbar"
              }}
        topContent={
          showSearch ? (
            <div className="border-b border-gray-200 p-1 bg-white">
              <div className="relative">
                <Input
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  variant="faded"
                  size="sm"
                  classNames={{
                    input: "text-sm pl-8",
                    inputWrapper: "rounded-md border border-gray-300 bg-white"
                  }}
                  startContent={
                    <Search size={14} className="text-gray-400" />
                  }
                  endContent={searchValue && (
                    <button
                      onClick={() => setSearchValue("")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                />
              </div>
            </div>
          ) : null
        }
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <DropdownItem
              key={option.value}
              startContent={option.startContent}
              endContent={option.endContent}
              className={`${option.className} ${showSearch && index === 0 ? 'mt-1' : ''}`}
              color={option.color}
              textValue={option.label}
            >
              <div className="flex flex-col">
                <span className="truncate font-medium">{option.label}</span>
                {option.description && (
                  <span className="text-xs text-gray-500 mt-1">{option.description}</span>
                )}
              </div>
            </DropdownItem>
          ))
        ) : (
          <DropdownItem
            key="no-results"
            isDisabled
            className="px-3 py-3 text-gray-500 whitespace-nowrap"
          >
            {showSearch && searchValue
              ? `No results found for "${searchValue}"`
              : "No options available"}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export default CustomDropdown;