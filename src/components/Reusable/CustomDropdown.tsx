import React, { useState, useEffect, useRef } from "react";
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
  console.log(options)
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter options
  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      (option.description && option.description.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [options, searchValue]);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);
  
  // Display label
  const displayValue = value ? value.label : placeholder;

  // Handle selection change → return full option
  const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
    if (keys === "all") return; // no selection
    const selectedKey = Array.from(keys)[0] as string;
    const selectedOption = options.find(opt => opt.value === selectedKey);

    if (onChange) {
      onChange(selectedOption || null);
    }
    setIsOpen(false); // Close dropdown after selection
  };

  // Update highlighted index on mouse enter
  const handleItemMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  // Scroll highlighted item into view
  const scrollToHighlightedItem = (index: number) => {
    // Use setTimeout to ensure the DOM has updated
    setTimeout(() => {
      // Find the scrollable list container
      const scrollableContainer = document.querySelector('[role="menu"]') as HTMLElement;
      if (scrollableContainer) {
        const itemHeight = 48; // Approximate height of each item
        const containerHeight = scrollableContainer.clientHeight;
        const scrollTop = scrollableContainer.scrollTop;
        
        const itemTop = index * itemHeight;
        const itemBottom = itemTop + itemHeight;
        
        if (itemTop < scrollTop) {
          // Item is above visible area
          scrollableContainer.scrollTop = itemTop;
        } else if (itemBottom > scrollTop + containerHeight) {
          // Item is below visible area
          scrollableContainer.scrollTop = itemBottom - containerHeight;
        }
      }
    }, 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredOptions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = (highlightedIndex + 1) % filteredOptions.length;
      setHighlightedIndex(newIndex);
      scrollToHighlightedItem(newIndex);
    }

    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
      setHighlightedIndex(newIndex);
      scrollToHighlightedItem(newIndex);
    }

    else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredOptions[highlightedIndex]; // Fixed: use filteredOptions instead of options
      if (selected && onChange) {
        onChange(selected); // Fixed: pass full object instead of just value
        setIsOpen(false);
      }
    }

    else if (e.key === "Escape" || e.key === "Tab") {
      // Close dropdown on Escape or Tab
      setIsOpen(false);
    }
  };

  // Focus search input when dropdown opens and clear search when closed
  useEffect(() => {
    if (isOpen && showSearch) {
      // Try multiple approaches to focus the input
      setTimeout(() => {
        // Try the ref first
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          return;
        }

      }, 150); 
    }
    if (!isOpen) {
      setSearchValue('');
    }
  }, [isOpen, showSearch]);

  // Clear search when value changes
  useEffect(() => {
    setSearchValue("");
  }, [value]);

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      classNames={{
        content: `${dropdownClassName} rounded-lg bg-white shadow-lg p-0 overflow-hidden`,
      }}
    >
      <DropdownTrigger>
        <Button
          className={`${buttonClassName} flex items-center justify-between text-left  ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`}
          variant="bordered"
          endContent={<ChevronDown size={16} className="text-gray-800 font-medium" />}
          disabled={disabled} 
        >
          <div className={value ? 'text-gray-900' : 'text-gray-700 font-medium'}>
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
          list: "max-h-[200px] overflow-y-auto custom-scrollbar p-1"
        }}
        topContent={
          showSearch ? (
            <div className="border-b border-gray-200 pb-2 p-1 bg-white">
              <div className="relative">
                <Input
                  ref={searchInputRef}
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  variant="faded"
                  size="sm"
                  autoFocus={isOpen && showSearch}
                  onKeyDown={handleKeyDown} //keyboard handler
                  classNames={{
                    input: "text-sm",
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
              className={`${option.className} ${showSearch && index === 0 ? 'mt-1' : ''} ${
                index === highlightedIndex ? 'bg-gray-100' : ''
              } focus:outline-none focus:ring-0 hover:bg-gray-50`}
              color={option.color}
              textValue={option.label}
              onMouseEnter={() => handleItemMouseEnter(index)} 
              onFocus={(e) => {
                if (showSearch && searchInputRef.current) {
                  e.preventDefault();
                  searchInputRef.current.focus();
                }
              }}
            >
              <div className="flex flex-col">
                <span className="truncate font-base">{option.label}</span>
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