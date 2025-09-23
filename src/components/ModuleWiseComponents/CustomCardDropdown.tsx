import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Chip } from "@heroui/chip";

interface CustomCardDropdownProps {
  cardTitle: string;
  buttonTitles: string[];
  dropdownItems: string[];
}

// Props: cardTitle (string), buttonTitles (array), dropdownItems (array of strings)
export function CustomCardDropdown({ cardTitle, buttonTitles, dropdownItems }: CustomCardDropdownProps) {
  const [buttonIndex, setButtonIndex] = useState(0);

  const handleButtonClick = () => {
    setButtonIndex((prev) => (prev + 1) % buttonTitles.length);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Card
          radius="sm"
          className="w-72 h-12 flex items-center justify-between px-4 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="material-icons text-gray-500">arrow_drop_down</span>
            <span className="font-semibold">{cardTitle}</span>
          </div>
          <Button
            radius="full"
            size="sm"
            onPress={handleButtonClick}
            className="ml-2"
          >
            {buttonTitles[buttonIndex]}
          </Button>
        </Card>
      </DropdownTrigger>
      <DropdownMenu aria-label="Options">
        <div className="flex flex-wrap gap-2 p-2">
          {dropdownItems.map((item) => (
            <DropdownItem key={item}>
              <Chip>{item}</Chip>
            </DropdownItem>
          ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}