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

function CustomDropdown({
  items = [],
  placeholder = "Select an option",
  defaultselectedKeys = new Set(),
  onSelectionChange,
  buttonClassName,
  dropdownClassname,
  searchPlaceholder = "Search items...",
  disallowEmptySelection = true,
  isSearch,
  matchWidth = false,
  disabled = false,
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
      <Dropdown
        classNames={{
          content: `${dropdownClassname} ${matchWidth ? 'min-w-0' : ''} max-h-64 overflow-y-auto`,
        }}
      >
        <DropdownTrigger>
          <Button
            className={`${buttonClassName} flex justify-start ${disabled ? 'opacity-50 cursor-not-allowed' : ''} text-left`}
            variant="flat"
            endContent={<ChevronDown className={`w-4 h-4 transition-transform ${disabled ? 'opacity-50' : ''}`} />}
            disabled={disabled}
          >
            <span className="truncate text-left flex-1">
              {selectedValue}
            </span>
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
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <DropdownItem
                key={item.key}
                description={item.description}
                startContent={item.startContent}
                endContent={item.endContent}
                className={`${item.className} py-2 px-3 hover:bg-gray-50 transition-colors`}
                color={item.color}
                textValue={item.label}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="text-xs text-gray-500 mt-0.5">
                      {item.description}
                    </span>
                  )}
                </div>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem key="no-results" isDisabled className="py-4 text-center">
              <span className="text-gray-500 text-sm">No items found</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default CustomDropdown;