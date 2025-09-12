import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input
} from "@heroui/react";

function customDropdown({
  items = [],
  placeholder = "Select an option",
  defaultSelectedKey = new Set(),
  onSelectionChange,
  buttonVariant = "bordered",
  buttonClassName = "capitalize",
  searchPlaceholder = "Search items...",
  disabled = false,
  size = "md",
  color = "default",
  variant = "flat",
  disallowEmptySelection = true,
  selectionMode = "single",
  ...props
}) {
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const [searchValue, setSearchValue] = useState("");

  // Filter items based on search value
  const filteredItems = React.useMemo(() => {
    if (!searchValue) return items;
    return items.filter(item =>
      item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [items, searchValue]);

  // Get display value for selected items
  const selectedValue = React.useMemo(() => {
    if (selectedKey.size === 0) return placeholder;
    
    const selectedItems = items.filter(item => selectedKey.has(item.key));
    return selectedItems.map(item => item.label).join(", ");
  }, [selectedKey, items, placeholder]);

  // Handle selection change
  const handleSelectionChange = (keys) => {
    setSelectedKey(keys);
    if (onSelectionChange) {
      onSelectionChange(keys);
    }
  };

  return (
    <div {...props}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className={buttonClassName}
            variant={buttonVariant}
            disabled={disabled}
            size={size}
            color={color}
          >
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={disallowEmptySelection}
          selectedKey={selectedKey}
          selectionMode={selectionMode}
          variant={variant}
          onSelectionChange={handleSelectionChange}
          topContent={
            <div className="px-2 pb-2">
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onValueChange={setSearchValue}
                size="sm"
                variant="bordered"
                isClearable
                onClear={() => setSearchValue("")}
              />
            </div>
          }
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <DropdownItem
                key={item.key}
                description={item.description}
                startContent={item.startContent}
                endContent={item.endContent}
                className={item.className}
                color={item.color}
              >
                {item.label}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem key="no-results" isDisabled>
              No items found
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default customDropdown;

// Example usage:
/*
import SearchableDropdown from './SearchableDropdown';

const dataTypes = [
  { key: "text", label: "Text" },
  { key: "number", label: "Number" },
  { key: "date", label: "Date" },
  { key: "single_date", label: "Single Date" },
  { key: "iteration", label: "Iteration" },
];

function MyComponent() {
  const handleSelectionChange = (keys) => {
    console.log("Selected:", Array.from(keys));
  };

  return (
    <SearchableDropdown
      items={dataTypes}
      placeholder="Select data type"
      defaultselectedKey={new Set(["text"])}
      onSelectionChange={handleSelectionChange}
      searchPlaceholder="Search data types..."
    />
  );
}
*/