import React, { useState, useEffect, useRef } from "react";
import {
    Select,
    SelectItem,
    Input,
    Chip,
    Tooltip
} from "@heroui/react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
    label?: string;
    labelClassname?: string;
    isRequired?: boolean
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
    maxSelectedDisplay = 2,
    closeOnSelect,
    label,
    labelClassname,
    isRequired = false
}: SearchableSelectProps) {

    const [searchValue, setSearchValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const focusTimeoutsRef = React.useRef<number[]>([]);
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

    // Auto-focus search input when dropdown opens
    useEffect(() => {
        if (showSearch && searchInputRef.current) {
            // Use multiple timeouts with increasing delays to handle different scenarios
            const timeouts = [50, 100, 200].map(delay =>
                window.setTimeout(() => {
                    if (searchInputRef.current) {
                        searchInputRef.current.focus();
                        // Move cursor to end
                        const input = searchInputRef.current;
                        const len = input.value.length;
                        input.setSelectionRange(len, len);
                    }
                }, delay)
            );

            focusTimeoutsRef.current = timeouts;

            return () => {
                timeouts.forEach(timeout => clearTimeout(timeout));
                focusTimeoutsRef.current = [];
            };
        }
    }, [showSearch, isOpen]);

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
            return (
                <motion.span
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {placeholder}
                </motion.span>
            )
        }

        if (selectionMode === "single") {
            const selectedOption = selectedValues[0]
            return (
                <motion.div
                    key={selectedOption?.value}
                    className="text-foreground truncate"
                    title={selectedOption?.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {selectedOption?.label}
                </motion.div>
            )
        }

        // Multi-selection: show up to 3 chips, then "+N more"
        const visibleChips = selectedValues.slice(0, maxSelectedDisplay);
        const extraCount = selectedValues.length - maxSelectedDisplay;

        return (
            <div className="flex flex-wrap items-center gap-1.5 max-w-full">
                <AnimatePresence mode="popLayout">
                    {visibleChips.map((selectedValue, index) => (
                        <motion.div
                            key={selectedValue.value}
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            transition={{
                                duration: 0.2,
                                delay: index * 0.05,
                                ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            layout
                        >
                            <Tooltip color="default" content={selectedValue.label} placement="top" delay={1000} className="font-semibold">
                                <Chip
                                    size="sm"
                                    variant="flat"
                                    onClose={() => handleChipClose(selectedValue)}
                                    classNames={{
                                        base: "max-w-full  bg-secondary text-secondary-foreground border-0 hover:bg-secondary/80 transition-all duration-200 border",
                                        content: "truncate text-xs px-2 max-w-[120px] font-medium",
                                        closeButton:
                                            "text-secondary-foreground/60 hover:text-secondary-foreground hover:bg-secondary-foreground/10 rounded-full transition-all duration-200 hover:scale-110",
                                    }}
                                >
                                    {selectedValue.label}
                                </Chip>
                            </Tooltip>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {extraCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        layout
                    >
                        <Tooltip
                            content={
                                <div className="flex flex-col gap-1 p-2 max-w-xs">
                                    {selectedValues.slice(maxSelectedDisplay).map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="text-xs text-foreground truncate font-semibold"
                                            title={item.label}
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2, delay: idx * 0.03 }}
                                        >
                                            {item.label}
                                        </motion.div>
                                    ))}
                                </div>
                            }
                            placement="top"
                            delay={1000}
                            classNames={{
                                content: "bg-popover border border-border rounded-md shadow-lg",
                            }}
                        >
                            <Chip
                                size="sm"
                                variant="flat"
                                color="default"
                                classNames={{
                                    base: "cursor-default bg-muted text-muted-foreground border-0 transition-all duration-200 border",
                                    content: "text-xs px-2 font-medium",
                                }}
                            >
                                +{extraCount} more
                            </Chip>
                        </Tooltip>
                    </motion.div>
                )}
            </div>
        )
    }


    return (
        <Select
            isRequired={isRequired}
            label={label}
            labelPlacement="outside"
            aria-label={!label ? placeholder || "Select an option" : undefined}
            classNames={{
                base: buttonClassName,
                trigger: `min-h-[40px] py-2 bg-white`,
                value: "text-left font-semibold",
                popoverContent: "p-0 overflow-hidden",
                label: labelClassname
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
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    focusTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
                    focusTimeoutsRef.current = [];
                }
            }}
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
                                classNames={{
                                    input: "text-sm focus:outline-none [&:focus]:outline-none !outline-none",
                                    // inputWrapper: "rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-0 focus:border-gray-400 [&:focus-within]:outline-none [&:focus-within]:ring-0 [&:focus-within]:border-gray-400 !outline-none"
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
                    className={`
                        ${option.className || ''}
                        py-2 px-2
                    `}
                    classNames={{
                        base: "data-[selected=true]:bg-gray-200",
                        wrapper: "w-full flex items-center justify-between pr-8",
                        title: "truncate text-sm flex-1 mr-4",
                        selectedIcon: "flex-shrink-0"
                    }}
                    color={option.color}
                    textValue={option.label}
                >
                    {option.label}
                </SelectItem>
            )}
        </Select>
    );
}

export default SearchableSelect;