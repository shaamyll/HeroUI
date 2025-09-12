import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input
} from "@heroui/react";

function CustomDropdown({
  items = [],
  placeholder = "Select an option",
  defaultselectedKeys = new Set(),
  onSelectionChange,
  buttonClassName,
  dropdownClassname,
  searchPlaceholder = "Search items...",
  disallowEmptySelection = true,
  matchWidth = false,
  isSearch,
}) {
  const [selectedKeys, setselectedKeys] = useState(defaultselectedKeys);
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
    if (selectedKeys.size === 0) return placeholder;
    
    const selectedItems = items.filter(item => selectedKeys.has(item.key));
    return selectedItems.map(item => item.label).join(", ");
  }, [selectedKeys, items, placeholder]);

  // Handle selection change
  const handleSelectionChange = (keys) => {
    setselectedKeys(keys);
    if (onSelectionChange) {
      onSelectionChange(keys);
    }
  };


  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className={buttonClassName}
            variant="bordered"
          >
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection={disallowEmptySelection}
          selectedKeys={selectedKeys}
          selectionMode="single"
          variant="faded"
          onSelectionChange={handleSelectionChange}
          topContent={
            isSearch ? (
              <div className="pb-2">
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
            ) : null
          }
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <DropdownItem
                className={dropdownClassname}
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

export default CustomDropdown;