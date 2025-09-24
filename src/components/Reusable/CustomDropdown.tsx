import React, { useState, useEffect, useRef } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Chip,
  Tooltip
} from "@heroui/react";
import { ChevronDown, Search, X } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

interface CustomDropdownProps {
  selectionMode?: "single" | "multiple";
  options?: DropdownOption[];
  placeholder?: string;
  value?: DropdownOption | DropdownOption[] | null;
  onChange?: (option: DropdownOption | DropdownOption[] | null) => void;
  buttonClassName?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  matchWidth?: boolean;
  disabled?: boolean;
  width?: string | number;
  maxSelectedDisplay?: number;
  closeOnSelect?: boolean; 
}

function CustomDropdown({
  selectionMode = 'single',
  options = [],
  placeholder = "Select an option",
  value,
  onChange,
  buttonClassName,
  searchPlaceholder = "Search options...",
  showSearch = false,
  matchWidth,
  disabled = false,
  width,
  maxSelectedDisplay = 2,
  closeOnSelect,
}: CustomDropdownProps) {

  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Determine default closeOnSelect behavior
  const shouldCloseOnSelect = closeOnSelect !== undefined ? closeOnSelect : selectionMode === 'single';

  // Normalize value to always work with arrays internally for consistency
  const selectedValues = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  // Filter options
  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [options, searchValue]);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);

  // Measure width
  useEffect(() => {
    const measureTriggerWidth = () => {
      if (triggerRef.current && matchWidth) {
        const rect = triggerRef.current.getBoundingClientRect();
        setTriggerWidth(rect.width);
      }
    };

    // Initial measurement
    measureTriggerWidth();

    // Add resize observer for responsive width updates
    const resizeObserver = new ResizeObserver(measureTriggerWidth);
    if (triggerRef.current) {
      resizeObserver.observe(triggerRef.current);
    }

    // Add window resize listener as fallback
    window.addEventListener('resize', measureTriggerWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureTriggerWidth);
    };
  }, [matchWidth]);

  // Re-measure when dropdown opens to ensure accurate width
  useEffect(() => {
    if (isOpen && matchWidth && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerWidth(rect.width);
    }
  }, [isOpen, matchWidth]);

  // Handle selection change for both single and multi-selection
  const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
    if (keys === "all" || !onChange) return;
    
    const selectedKeys = Array.from(keys) as string[];
    
    if (selectionMode === 'single') {
      // Single selection mode
      if (selectedKeys.length === 0) {
        onChange(null);
      } else {
        const selectedOption = options.find(opt => opt.value === selectedKeys[0]);
        onChange(selectedOption || null);
      }
      if (shouldCloseOnSelect) {
        setIsOpen(false);
      }
    } else {
      // Multi-selection mode
      const selectedOptions = options.filter(opt => selectedKeys.includes(opt.value));
      onChange(selectedOptions);
      if (shouldCloseOnSelect) {
        setIsOpen(false);
      }
    }
  };

const handleChipClose = (optionToRemove: DropdownOption) => {
  if (selectionMode === 'multiple' && onChange) {
    const updatedValues = selectedValues.filter(v => v.value !== optionToRemove.value);
    onChange(updatedValues);
  }
};

  // Update highlighted index on mouse enter
  const handleItemMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToHighlightedItem = (index: number) => {
    // Use setTimeout to ensure DOM has updated before scrolling
    setTimeout(() => {
      const menuContainer = menuRef.current || document.querySelector('[data-slot="listbox"]');
      if (!menuContainer) return;

      const scrollableContainer = menuContainer.querySelector('[role="menu"]') || 
                                   menuContainer.querySelector('[data-slot="list"]') || 
                                   menuContainer;
      
      if (!scrollableContainer) return;

      //  the highlighted item
      const highlightedItem = scrollableContainer.querySelector(`[data-key="${filteredOptions[index]?.value}"]`) as HTMLElement;
      
      if (highlightedItem) {
        // Use scrollIntoView for more reliable scrolling
        highlightedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      } else {
        // Fallback to manual calculation if item not found
        const itemHeight = 48;
        const containerHeight = (scrollableContainer as HTMLElement).clientHeight;
        const scrollTop = (scrollableContainer as HTMLElement).scrollTop;

        const itemTop = index * itemHeight;
        const itemBottom = itemTop + itemHeight;

        if (itemTop < scrollTop) {
          (scrollableContainer as HTMLElement).scrollTop = itemTop;
        } else if (itemBottom > scrollTop + containerHeight) {
          (scrollableContainer as HTMLElement).scrollTop = itemBottom - containerHeight;
        }
      }
    }, 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredOptions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      // Stop at last item instead of looping
      const newIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
      setHighlightedIndex(newIndex);
      scrollToHighlightedItem(newIndex);
    }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Stop at first item instead of looping
      const newIndex = Math.max(highlightedIndex - 1, 0);
      setHighlightedIndex(newIndex);
      scrollToHighlightedItem(newIndex);
    }
    else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredOptions[highlightedIndex];
      if (selected && onChange) {
        if (selectionMode === 'single') {
          onChange(selected);
        } else {
          // Toggle selection in multi-mode
          const isSelected = selectedValues.some(v => v.value === selected.value);
          if (isSelected) {
            const updatedValues = selectedValues.filter(v => v.value !== selected.value);
            onChange(updatedValues);
          } else {
            onChange([...selectedValues, selected]);
          }
        }
        if (shouldCloseOnSelect) {
          setIsOpen(false);
        }
      }
    }
    else if (e.key === "Escape" || e.key === "Tab") {
      setIsOpen(false);
    }
  };

  // Highlight logic for filtered options
  useEffect(() => {
    if (isOpen && selectedValues.length > 0) {
      const index = filteredOptions.findIndex(option => 
        selectedValues.some(selected => selected.value === option.value)
      );
      if (index !== -1) {
        setHighlightedIndex(index);
        setTimeout(() => scrollToHighlightedItem(index), 0);
      }
    }
  }, [isOpen, selectedValues, filteredOptions]);

  useEffect(() => {
    if (isOpen && showSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    if (!isOpen) {
      setSearchValue('');
      setHighlightedIndex(0);
    }
  }, [isOpen, showSearch]);

  // Clear search when value changes
  useEffect(() => {
    setSearchValue("");
  }, [value]);

  // Calculate dropdown content width
  const dropdownContentWidth = matchWidth && triggerWidth
    ? `${triggerWidth}px`
    : width
      ? typeof width === 'number' ? `${width}px` : width
      : 'auto';

  // Generate selected keys for the dropdown menu
  const selectedKeys = React.useMemo(() => {
    return new Set(selectedValues.map(v => v.value));
  }, [selectedValues]);

  // Button content with chips for multi-selection
const buttonContent = React.useMemo(() => {
  if (selectedValues.length === 0) {
    return <div className="text-gray-700 font-medium">{placeholder}</div>;
  }

  if (selectionMode === 'single') {
    return (
      <div className="text-gray-900 truncate" title={selectedValues[0]?.label}>
        {selectedValues[0]?.label}
      </div>
    );
  }

  // Multi-selection: show up to 5 chips, then "+N more"
  const visibleChips = selectedValues.slice(0, 5);
  const extraCount = selectedValues.length - 5;

  return (
    <div className="flex flex-wrap items-center gap-1 max-w-full">
      {visibleChips.map((selectedValue) => (
        <Tooltip
          color="default"
          key={selectedValue.value}
          content={selectedValue.label}
          placement="top"
          delay={0}
          classNames={{
            content: " text-black max-w-xs"
          }}
        >
          <Chip
            size="sm"
            variant="flat"
            color="warning"
            onClose={() => handleChipClose(selectedValue)}
            classNames={{
              base: "max-w-full",
              content: "truncate text-xs px-2 max-w-[120px] font-semibold"
            }}
          >
            {selectedValue.label}
          </Chip>
        </Tooltip>
      ))}

      {extraCount > 0 && (
        <Tooltip
          content={
            <div className="flex flex-col gap-1 p-2 max-w-xs">
              {selectedValues.slice(5).map((item, idx) => (
                <div key={idx} className="text-xs text-black truncate" title={item.label}>
                  {item.label}
                </div>
              ))}
            </div>
          }
          placement="top"
          delay={0}
          classNames={{
            content: "bg-white rounded-md shadow-lg border"
          }}
        >
          <Chip
            size="sm"
            variant="solid"
            color="default"
            classNames={{
              base: "cursor-default",
              content: "text-xs px-2"
            }}
          >
            +{extraCount} more
          </Chip>
        </Tooltip>
      )}
    </div>
  );
}, [selectedValues, selectionMode, placeholder, handleChipClose]);

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      classNames={{
        content: "rounded-lg bg-white shadow-lg p-0 overflow-hidden",
      }}
    >
      <DropdownTrigger>
        <Button
          ref={triggerRef}
          className={`${buttonClassName} rounded-md flex items-start justify-between text-left min-h-[40px] h-auto py-1 px-3 ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`}
          variant="faded"
          style={{
            width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined
          }}
          endContent={<ChevronDown size={16} className="text-gray-800 font-medium flex-shrink-0 ml-2 mt-1" />}
          disabled={disabled}
        >
          <div className="flex-1 overflow-hidden">
            {buttonContent}
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        ref={menuRef}
        disallowEmptySelection={false}
        selectionMode={selectionMode === 'multiple' ? 'multiple' : 'single'}
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        variant="flat"
        classNames={{
          list: "max-h-[200px] overflow-y-auto custom-scrollbar p-1 [&_*]:outline-none [&_*]:ring-0"
        }}
        style={{
          width: dropdownContentWidth,
          minWidth: dropdownContentWidth,
          maxWidth: dropdownContentWidth
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
                  onKeyDown={handleKeyDown}
                  classNames={{
                    input: "text-sm focus:outline-none [&:focus]:outline-none !outline-none",
                    inputWrapper: "rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-0 focus:border-gray-400 [&:focus-within]:outline-none [&:focus-within]:ring-0 [&:focus-within]:border-gray-400 !outline-none"
                  }}
                  startContent={
                    <Search size={14} className="text-gray-400" />
                  }
                  endContent={searchValue && (
                    <button
                      onClick={() => setSearchValue("")}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
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
              className={`
                ${option.className || ''}
                ${showSearch && index === 0 ? 'mt-0' : ''}
                ${index === highlightedIndex ? 'bg-gray-100' : ''}
                focus:bg-gray-100 hover:bg-gray-100
                outline-none ring-0 transition-none
              `}
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
                <span className="truncate text-sm">{option.label}</span>
              </div>
            </DropdownItem>
          ))
        ) : (
          <DropdownItem
            key="no-results"
            isDisabled
            className="px-3 py-3 text-gray-500 whitespace-nowrap focus:outline-none focus:ring-0"
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