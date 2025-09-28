import { useState } from "react";
import { Tag } from "lucide-react";
import CustomInput from "../../../components/common/CustomInput";
import SearchableSelect from "../../../components/Reusable/SearchableSelect";
import DynamicDatePicker from "@/components/Reusable/DynamicDatePicker"
//project Basicinformation.tx
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


function ProjectBasicInformation() {
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
    const [dateRange, setDateRange] = useState<[Date | null, Date | null] | null>(null);
    const handleDateRangeChange = (value: [Date | null, Date | null] | null) => {
        console.log('Selected date range:', value);
        setDateRange(value); // if you want to keep it in state
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


                </div>
                {/* Third row */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <CustomInput
                        label="Description"
                        placeholder="Eg: Laptop"
                        isRequired={true}
                        variant="bordered"
                        labelPlacement="outside"
                        onChange={(val) => handleChange("prefix", val)}
                        classNames={{ label: "text-xs font-semibold" }}
                    />

                   
                </div>
                {/* Fourth row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <DynamicDatePicker
                        label="Start Date"
                        onChange={handleDateRangeChange}
                        value={dateRange}

                    />  <DynamicDatePicker
                        label="End Date"
                        onChange={handleDateRangeChange}
                        value={dateRange}
                        description="Pick a end date"
                    />
                </div>

                {/* Fourth row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DynamicDatePicker
                        label="Launching Date"
                        onChange={handleDateRangeChange}
                        value={dateRange}
                        description="Pick a date"
                    />  <DynamicDatePicker
                        label="Handover Date"
                        onChange={handleDateRangeChange}
                        value={dateRange}
                        description="Pick a date"
                    />

                </div>

                {/* Fifth row */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    <SearchableSelect
                        isRequired={true}
                        selectionMode="single"
                        label="Priority level"
                        placeholder="Select a category first"
                        options={subcategoryOptions}
                        value={formData.subcategory}
                        onChange={(val) => handleChange("subcategory", val)}
                        labelClassname="text-xs font-semibold"
                    />
                    <SearchableSelect
                        selectionMode="single"
                        label="Project Type"
                        placeholder="Select Model Number"
                        options={modelNumberOptions}
                        value={formData.modelNumber}
                        onChange={(val) => handleChange("modelNumber", val)}
                        labelClassname="text-xs font-semibold"
                    />
                </div>

            </div>
        </div>
    );
}

export default ProjectBasicInformation;
