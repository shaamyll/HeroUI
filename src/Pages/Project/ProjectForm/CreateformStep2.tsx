import { useState } from "react";
import { Tag, AlertCircle } from "lucide-react";
import CustomInput from "../../../components/common/CustomInput";
import SearchableSelect from "../../../components/Reusable/SearchableSelect";
import DynamicDatePicker from "@/components/Reusable/DynamicDatePicker";
import LocationPickerMap from "@/components/Reusable/LocationPickerMap";

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
    // Location fields
    location: string;
    siteArea: string;
    buildingType: string;
    branchType: string;
    city: string;
    zoning: string;
    amps: string;
    electricityType: string;
}

function CreateProjectFormStep2() {
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
        // Initialize location fields
        location: '',
        siteArea: '',
        buildingType: '',
        branchType: '',
        city: '',
        zoning: '',
        amps: '',
        electricityType: '',
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [dateRange, setDateRange] = useState<[Date | null, Date | null] | null>(null);

    // Generic update handler for dropdown/input fields
    const handleChange = (
        key: keyof FormData,
        value: DropdownOption | DropdownOption[] | null | string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Handler for location input changes
    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear validation errors
        setValidationErrors((prev) => {
            const updatedErrors = { ...prev };
            if (field === 'location' && value) {
                delete updatedErrors.location;
            }
            return updatedErrors;
        });
    };

    const handleSubmit = () => {
        console.log("Form Data:", formData);
    };

    const handleDateRangeChange = (value: [Date | null, Date | null] | null) => {
        console.log('Selected date range:', value);
        setDateRange(value);
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

            {/* Location Map Section */}
            <div className={`mb-6 ${validationErrors.location ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}>
                <LocationPickerMap
                    center={[24.7136, 46.6753]} // Saudi Arabia center
                    zoom={13}
                    style={{
                        height: '300px',
                        zIndex: '10',
                        border: validationErrors.location ? '2px solid red' : 'none',
                    }}
                    onLocationSelect={(lat, lng) => {
                        const latlng = `${lat},${lng}`;
                        handleInputChange('location', latlng);
                    }}
                    initialPosition={
                        formData.location
                            ? (() => {
                                const coords = formData.location.split(',');
                                return coords.length === 2 && !isNaN(Number(coords[0])) && !isNaN(Number(coords[1]))
                                    ? [parseFloat(coords[0]), parseFloat(coords[1])] as [number, number]
                                    : undefined;
                            })()
                            : undefined
                    }
                    className={validationErrors.location ? 'border-red-300' : ''}
                    showInstructions={true}
                    markerColor="#dc2626"
                />
                {validationErrors.location && (
                    <p className="mt-1 flex items-center text-sm font-light text-red-500">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        {validationErrors.location}
                    </p>
                )}
            </div>

            <div className="space-y-6 text-md py-2">
                {/* First row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                        label="Site Area(SQ. Mtr.)"
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
                        label="Building Type"
                        placeholder="Select Building Type"
                        options={departmentOptions}
                        value={formData.department}
                        onChange={(val) => handleChange("department", val)}
                        labelClassname="text-xs font-semibold"
                    />
                </div>

                {/* Second row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SearchableSelect
                        isRequired={true}
                        selectionMode="single"
                        label="City"
                        placeholder="Select City"
                        options={departmentOptions}
                        value={formData.department}
                        onChange={(val) => handleChange("department", val)}
                        labelClassname="text-xs font-semibold"
                    />
                    <CustomInput
                        label="Area"
                        placeholder="Enter Area i.e AI-RAWADAH"
                        isRequired={true}
                        variant="bordered"
                        labelPlacement="outside"
                        onChange={(val) => handleChange("assetName", val)}
                        classNames={{ label: "text-xs font-semibold" }}
                    />
                </div>

                {/* Third row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SearchableSelect
                        isRequired={true}
                        selectionMode="single"
                        label="Branch Type"
                        placeholder="Select Branch Type"
                        options={departmentOptions}
                        value={formData.department}
                        onChange={(val) => handleChange("department", val)}
                        labelClassname="text-xs font-semibold"
                    />
                    <CustomInput
                        label="Electricity - Volts (optional)"
                        placeholder="Enter Electricity i.e. 110 V"
                        isRequired={true}
                        variant="bordered"
                        labelPlacement="outside"
                        onChange={(val) => handleChange("customCode", val)}
                        classNames={{ label: "text-xs font-semibold" }}
                    />
                </div>

                {/* Fourth row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                        label="Ampere (optional)"
                        placeholder="Enter Ampere"
                        isRequired={true}
                        variant="bordered"
                        labelPlacement="outside"
                        onChange={(val) => handleChange("customCode", val)}
                        classNames={{ label: "text-xs font-semibold" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateProjectFormStep2;