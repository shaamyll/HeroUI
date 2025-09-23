import React, { useState } from "react";
import { Card } from "@heroui/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Chip, VisuallyHidden, tv, useCheckbox } from "@heroui/react";

// Custom Checkbox as per your provided code
const CheckIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface CustomCheckboxProps {
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
}

function CustomCheckbox({ isSelected, onChange }: CustomCheckboxProps) {
  const {
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    isSelected,
    onValueChange: onChange,
  });

  const checkbox = tv({
    slots: {
      base: "border-default hover:bg-default-200 rounded-full",
      content: "text-default-500",
    },
    variants: {
      isSelected: {
        true: {
          base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
          content: "text-primary-foreground pl-1",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-solid outline-transparent ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
}

interface LargeCardDropdownProps {
  cardTitle: string;
  dropdownItems: string[];
}

export function LargeCardDropdown({ cardTitle, dropdownItems }: LargeCardDropdownProps) {
  const [checkboxEnabled, setCheckboxEnabled] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  // Remove chip handler
  const handleRemoveChip = (key) => {
    setSelectedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Card
          radius="lg"
          className="w-[400px] h-20 flex items-center justify-between px-6 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="material-icons text-gray-500">arrow_drop_down</span>
            <span className="font-semibold text-lg">{cardTitle}</span>
          </div>
          <CustomCheckbox
            isSelected={checkboxEnabled}
            onChange={setCheckboxEnabled}
          />
        </Card>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select options"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        className="p-2"
      >
        <div className="flex flex-wrap gap-2">
          {dropdownItems.map((item) => (
            <DropdownItem key={item}>
              <Chip
                onClose={() => handleRemoveChip(item)}
                color="primary"
                variant="flat"
              >
                {item}
              </Chip>
            </DropdownItem>
          ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}