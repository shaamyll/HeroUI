import { useState } from "react";
import { Tag } from "lucide-react";
import CustomInput from "../../common/CustomInput";
import SearchableSelect from "../../Reusable/SearchableSelect";

const departmentOptions: DropdownOption[] = [
  { value: "it", label: "IT" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
];

const categoryOptions: DropdownOption[] = [
  { value: "laptop", label: "Laptop" },
  { value: "phone", label: "Phone" },
  { value: "tablet", label: "Tablet" },
  { value: "laptodp", label: "Laptop" },
  { value: "phonedd", label: "Phone" },
  { value: "tabldet", label: "Tablet" },
];

const subcategoryOptions: DropdownOption[] = [
  { value: "mac", label: "MacBook" },
  { value: "windows", label: "Windows Laptop" },
];

const modelNumberOptions: DropdownOption[] = [
  { value: "mbp16", label: "MacBook Pro 16\"" },
  { value: "xps15", label: "Dell XPS 15" },
];

interface DropdownOption {
  value: string,
  label: string
}

interface FormData {
  prefix: string;
  suffix: string;
  assetName: string;
  customCode: string;
  department: DropdownOption | null;
  category: DropdownOption[];
  subcategory: DropdownOption | null;
  modelNumber: DropdownOption | null;
  serialNumber: string;
}


function BasicInfo_Section() {
  const [formData, setFormData] = useState<FormData>({
    prefix: "141",
    suffix: "",
    assetName: "",
    customCode: "",
    department: null,
    category: [],
    subcategory: null,
    modelNumber: null,
    serialNumber: "",
  });

  // generic update handler
  const handleChange = (
    key: keyof FormData,
    value: DropdownOption | DropdownOption[] | null | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-1 bg-blue-50 rounded-lg">
          <Tag className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-small font-semibold text-blue-600">
          Basic Information
        </h2>
      </div>

      <div className="space-y-6 text-md py-2">
        {/* First row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            label="Prefix"
            defaultValue={formData.prefix}
            isRequired={true}
            variant="bordered"
            labelPlacement="outside"
            onChange={(val) => handleChange("prefix", val)}
            classNames={{ label: "text-xs font-semibold" }}
          />
          <CustomInput
            label="Suffix (Optional)"
            placeholder="Eg: HQ"
            variant="bordered"
            labelPlacement="outside"
            onChange={(val) => handleChange("prefix", val)}
            classNames={{ label: "text-xs font-semibold" }}
          />
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            label="Asset Name"
            placeholder="Eg: Laptop"
            isRequired={true}
            variant="bordered"
            labelPlacement="outside"
            onChange={(val) => handleChange("prefix", val)}
            classNames={{ label: "text-xs font-semibold" }}
          />
          <CustomInput
            label="Custom Code"
            placeholder="Enter custom code"
            variant="bordered"
            labelPlacement="outside"
            onChange={(val) => handleChange("prefix", val)}
            classNames={{ label: "text-xs font-semibold" }}
          />
        </div>

        {/* Third row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SearchableSelect
            isRequired={true}
            selectionMode="single"
            label="Department"
            placeholder="Select Department"
            options={departmentOptions}
            value={formData.department}
            onChange={(val) => handleChange("department", val)}
            labelClassname="text-xs font-semibold"
          />
          <SearchableSelect
            isRequired={true}
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={formData.category}
            selectionMode="multiple"
            onChange={(val) => handleChange("category", val)}
            labelClassname="text-xs font-semibold"
            showSearch={true}
          />
        </div>

        {/* Fourth row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SearchableSelect
            isRequired={true}
            selectionMode="single"
            label="Subcategory"
            placeholder="Select a category first"
            options={subcategoryOptions}
            value={formData.subcategory}
            onChange={(val) => handleChange("subcategory", val)}
            labelClassname="text-xs font-semibold"
          />
          <SearchableSelect
            selectionMode="single"
            label="Model Number"
            placeholder="Select Model Number"
            options={modelNumberOptions}
            value={formData.modelNumber}
            onChange={(val) => handleChange("modelNumber", val)}
            labelClassname="text-xs font-semibold"
          />
        </div>

        {/* Fifth row */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          <CustomInput
            label="Serial Number"
            placeholder="Eg: SN123456789"
            variant="bordered"
            labelPlacement="outside"
            onChange={(val) => handleChange("prefix", val)}
            classNames={{ label: "text-xs font-semibold" }}

          />
        </div>

      </div>
    </div>
  );
}

export default BasicInfo_Section;
