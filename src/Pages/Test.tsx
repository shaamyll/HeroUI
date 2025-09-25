import CustomDropdown from "@/components/Reusable/CustomDropdown";
import SearchableSelect from "@/components/Reusable/SearchableSelect";
import { useEffect, useState } from "react";

function Test() {
  // For CustomDropdown
  const [customDropdownValue, setCustomDropdownValue] = useState<string>("");
  const [customDropdownOptions, setCustomDropdownOptions] = useState<any[]>([]);

  // For SearchableSelect
  const [searchableSelectValue, setSearchableSelectValue] = useState<string>("");
  const [searchableSelectOptions, setSearchableSelectOptions] = useState<any[]>([]);

  // Handle changes
  const handleCustomDropdownChange = (value: string) => {
    console.log("CustomDropdown selected:", value);
    setCustomDropdownValue(value);
  };

  const handleSearchableSelectChange = (value: string) => {
    console.log("SearchableSelect selected:", value);
    setSearchableSelectValue(value);
  };

  // Fetch data once
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => {
        const formattedOptions = data.map((item: any) => ({
          value: item.id.toString(),
          label: item.title,
        }));
        setCustomDropdownOptions(formattedOptions);
        setSearchableSelectOptions(formattedOptions);
      });
  }, []);

  return (
    <div className="p-4 min-h-screen w-full flex flex-col gap-6">
      <h2 className="mb-2 text-lg font-semibold">Test Dropdowns</h2>

      {/* Custom Dropdown */}
      <CustomDropdown
        options={customDropdownOptions}
        value={customDropdownValue}
        onChange={handleCustomDropdownChange}
        placeholder="Select an option"
        buttonClassName="w-full sm:w-1/2 lg:w-1/3" // responsive widths
        showSearch={true}
        selectionMode="multiple"
        matchWidth={true}
      />

      {/* Searchable Select */}
      <SearchableSelect
        options={searchableSelectOptions}
        value={searchableSelectValue}
        onChange={handleSearchableSelectChange}
        label="Select an Area"
        placeholder="Select an Area"
        buttonClassName="w-full sm:w-3/4 lg:w-1/3" // responsive widths
        showSearch={true}
        selectionMode="multiple"
      />
    </div>
  );
}

export default Test;
