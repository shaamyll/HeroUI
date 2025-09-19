import CustomDropdown from "@/components/Reusable/CustomDropdown";
import React, { useState } from "react";

function Test() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value: string) => {
    console.log("Selected value:", value);
    setSelectedValue(value);
  };

  const options = [
    { value: "1", label: "Option One" },
    { value: "2", label: "Option Two" },
    { value: "3", label: "Option Three" },
  ];

  return (
    <div className="p-4">
      <h2 className="mb-2 text-lg font-semibold">Test Dropdown</h2>
      <CustomDropdown
        options={options}
        value={selectedValue}
        onChange={handleChange}
        placeholder="Select an option"
        buttonClassName="w-82"
        dropdownClassName="w-82"
        showSearch={true}
      />
    </div>
  );
}

export default Test;
