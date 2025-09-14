import React from "react";
import CommonComponents, { animals } from "../components/common/CommonComponents";

const DisplayComponents: React.FC = () => {
  // Props for the Accordion
  const accordionProps = {
    itemClasses: {
      base: "py-0 w-full",
      title: "font-normal text-medium",
      trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
      indicator: "text-medium",
      content: "text-small px-2",
    },
    defaultContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  // Props for the Autocomplete
  const autocompleteProps = {
    defaultItems: animals,
  };

  // No specific props needed for Alerts, Badge with Button, Badge with Avatar, Buttons with Icons, or Dropdowns as their data is self-contained in this example.

  return (
    <div>
      <CommonComponents
        accordionProps={accordionProps}
        autocompleteProps={autocompleteProps}
        alertProps={{}} // Empty props, can be expanded
        badgeButtonProps={{}} // Empty props
        badgeAvatarProps={{}} // Empty props
        buttonIconProps={{}} // Empty props
        dropdownProps={{}} // Empty props
      />
    </div>
  );
};

export default DisplayComponents;