import React, { useState, useEffect, useRef } from "react";
import {
    Select,
    SelectItem,
    Input,
    Chip,
    Tooltip
} from "@heroui/react";
import { Search, X } from "lucide-react";

interface DropdownOption {
    value: string;
    label: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    className?: string;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

interface SearchableSelectProps {
    selectionMode?: "single" | "multiple";
    options?: DropdownOption[];
    placeholder?: string;
    value?: DropdownOption | DropdownOption[] | null;
    onChange?: (option: DropdownOption | DropdownOption[] | null) => void;
    buttonClassName?: string;
    searchPlaceholder?: string;
    showSearch?: boolean;
    disabled?: boolean;
    width?: string | number;
    maxSelectedDisplay?: number;
    closeOnSelect?: boolean;
}

function SearchableSelect({
    selectionMode = 'single',
    options = [],
    placeholder = "Select an option",
    value,
    onChange,
    buttonClassName,
    searchPlaceholder = "Search options...",
    showSearch = false,
    disabled = false,
    width,
    maxSelectedDisplay = 8,
    closeOnSelect,
}: SearchableSelectProps) {

    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!filteredOptions.length) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex(prev => (prev + 1) % filteredOptions.length);
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex(prev => (prev - 1 + filteredOptions.length) % filteredOptions.length);
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            const selected = filteredOptions[highlightedIndex];
            if (selected && onChange) {
                if (selectionMode === 'single') {
                    onChange(selected);
                } else {
                    const isSelected = selectedValues.some(v => v.value === selected.value);
                    if (isSelected) {
                        const updatedValues = selectedValues.filter(v => v.value !== selected.value);
                        onChange(updatedValues);
                    } else {
                        onChange([...selectedValues, selected]);
                    }
                }
            }
        }
        else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

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

    // Handle individual chip removal in multi-selection mode
    const handleChipClose = (optionToRemove: DropdownOption) => {
        if (selectionMode === 'multiple' && onChange) {
            const updatedValues = selectedValues.filter(v => v.value !== optionToRemove.value);
            onChange(updatedValues);
        }
    };

    // Handle selection change from Select component
    const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
        if (keys === "all" || !onChange) return;

        const selectedKeys = Array.from(keys) as string[];

        if (selectionMode === 'single') {
            if (selectedKeys.length === 0) {
                onChange(null);
            } else {
                const selectedOption = options.find(opt => opt.value === selectedKeys[0]);
                onChange(selectedOption || null);
            }
        } else {
            const selectedOptions = options.filter(opt => selectedKeys.includes(opt.value));
            onChange(selectedOptions);
        }

        if (shouldCloseOnSelect) {
            setIsOpen(false);
        }
    };

    // Generate selected keys for the Select component
    const selectedKeys = React.useMemo(() => {
        return new Set(selectedValues.map(v => v.value));
    }, [selectedValues]);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && showSearch) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
        }
        if (!isOpen) {
            setSearchValue('');
        }
    }, [isOpen, showSearch]);

    // Clear search when value changes
    useEffect(() => {
        setSearchValue("");
    }, [value]);

    const listboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!listboxRef.current || highlightedIndex < 0) return;

        const optionElements = listboxRef.current.querySelectorAll('[role="option"]');
        if (optionElements.length === 0 || highlightedIndex >= optionElements.length) return;

        const highlightedElement = optionElements[highlightedIndex] as HTMLElement;
        if (!highlightedElement) return;

        highlightedElement.scrollIntoView({
            block: 'nearest',
            behavior: 'auto'
        });
    }, [highlightedIndex]);

    // Custom render function for multi-selection with chips
    const renderValue = (items: any) => {
        if (items.length === 0) {
            return <span className="text-gray-500">{placeholder}</span>;
        }

        if (selectionMode === 'single') {
            const selectedOption = selectedValues[0];
            return (
                <div className="text-gray-900 truncate" title={selectedOption?.label}>
                    {selectedOption?.label}
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
                    >
                        <Chip
                            size="sm"
                            variant="flat"
                            color="warning"
                            onClose={() => handleChipClose(selectedValue)}
                            classNames={{
                                base: "max-w-full",
                                content: "truncate text-xs px-2 max-w-[120px]"
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
                            content: "bg-white rounded-md shadow-lg"
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
    };

    return (
        <Select
            classNames={{
                base: buttonClassName,
                trigger: `min-h-[40px] py-2 ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`,
                value: "text-left",
                popoverContent: "p-0 overflow-hidden"
            }}
            isMultiline={selectionMode === 'multiple'}
            items={filteredOptions}
            placeholder={placeholder}
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
            selectionMode={selectionMode === 'multiple' ? 'multiple' : 'single'}
            variant="faded"
            isDisabled={disabled}
            style={{
                width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined
            }}
            renderValue={renderValue}
            popoverProps={{
                classNames: {
                    content: "px-1 overflow-hidden"
                }
            }}
            listboxProps={{
                classNames: {
                    base: "p-0",
                    list: "max-h-[200px] overflow-y-auto custom-scrollbar p-1 [&_*]:outline-none [&_*]:ring-0",
                },
                emptyContent: searchValue ? `No results found for "${searchValue}"` : "No options available",
                topContent: showSearch ? (
                    <div className="sticky top-0 z-10 border-b border-gray-200 pb-2 p-1 bg-white">
                        <div className="relative">
                            <Input
                                ref={searchInputRef}
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onValueChange={setSearchValue}
                                variant="faded"
                                size="sm"
                                autoFocus={isOpen && showSearch}
                                classNames={{
                                    input: "text-sm focus:outline-none [&:focus]:outline-none !outline-none",
                                    inputWrapper: "rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-0 focus:border-gray-400 [&:focus-within]:outline-none [&:focus-within]:ring-0 [&:focus-within]:border-gray-400 !outline-none"
                                }}
                                startContent={<Search size={14} className="text-gray-400" />}
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
                ) : undefined,
            }}
        >
            {(option) => (
                <SelectItem
                    key={option.value}
                    startContent={option.startContent}
                    endContent={option.endContent}
                    onFocus={(e) => {
                        if (showSearch && searchInputRef.current) {
                            e.preventDefault();
                            searchInputRef.current.focus();
                        }
                    }}
                    className={`
                        ${option.className || ''}
                        py-2 px-3 hover:bg-gray-100 focus:bg-gray-100 cursor-pointer
                        outline-none ring-0 transition-colors
                    `}
                    color={option.color}
                    textValue={option.label}
                >
                    <div className="flex flex-col">
                        <span className="truncate text-sm">{option.label}</span>
                    </div>
                </SelectItem>
            )}
        </Select>
    );
}

export default SearchableSelect;