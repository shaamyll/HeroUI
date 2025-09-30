import { useState } from "react";
import { Tag } from "lucide-react";
import CustomInput from "../../../components/common/CustomInput";
import SearchableSelect from "../../../components/Reusable/SearchableSelect";
import DynamicDatePicker from "@/components/Reusable/DynamicDatePicker";
import { BudgetAllocation } from "./BudgetAllocation";

const Currency: DropdownOption[] = [
    { value: "SAR", label: "SAR" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
];

const categoryOptions: DropdownOption[] = [
    { value: "laptop", label: "Laptop" },
    { value: "phone", label: "Phone" },
    { value: "tablet", label: "Tablet" },
];

const subcategoryOptions: DropdownOption[] = [
    { value: "mac", label: "MacBook" },
    { value: "windows", label: "Windows Laptop" },
];

const modelNumberOptions: DropdownOption[] = [
    { value: "mbp16", label: "MacBook Pro 16\"" },
    { value: "xps15", label: "Dell XPS 15" },
];

const priorityOptions: DropdownOption[] = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" },
];

const projectTypeOptions: DropdownOption[] = [
    { value: "internal", label: "Internal" },
    { value: "external", label: "External" },
    { value: "client", label: "Client Project" },
];

interface DropdownOption {
    value: string;
    label: string;
}

interface Phase {
    id: string;
    name: string;
    budget: number;
}

interface FormData {
    currency: DropdownOption | null;
    totalBudget: string;
    phases: Phase[];
    description: string;
    startDate: [Date | null, Date | null] | null;
    endDate: [Date | null, Date | null] | null;
    launchingDate: [Date | null, Date | null] | null;
    handoverDate: [Date | null, Date | null] | null;
    priorityLevel: DropdownOption | null;
    projectType: DropdownOption | null;
}

function CreateProjectFormStep4() {
    const [formData, setFormData] = useState<FormData>({
        currency: Currency[0], // Default to SAR
        totalBudget: "0",
        phases: [
            { id: "1", name: "Phase 1", budget: 0 },
            { id: "2", name: "Phase 2", budget: 0 },
            { id: "3", name: "Phase 3", budget: 0 },
        ],
        description: "",
        startDate: null,
        endDate: null,
        launchingDate: null,
        handoverDate: null,
        priorityLevel: null,
        projectType: null,
    });

    // Calculate remaining budget
    const totalAllocated = formData.phases.reduce((sum, phase) => sum + phase.budget, 0);
    const remainingBudget = Number(formData.totalBudget) - totalAllocated;

    // Handle phase budget changes
    const handlePhaseBudgetChange = (phaseId: string, budget: number) => {
        setFormData((prev) => ({
            ...prev,
            phases: prev.phases.map((phase) =>
                phase.id === phaseId ? { ...phase, budget } : phase
            ),
        }));
    };

    // Handle input changes
    const handleChange = (key: keyof FormData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Handle numeric input (remove non-numeric characters)
    const handleNumericChange = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        return numericValue.replace(/^0+/, '') || '0';
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
                    Budget Information
                </h2>
                <h3>Define the financial aspects of your project</h3>
            </div>

            <div className="space-y-6 text-md py-2">
                {/* First row - Currency and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SearchableSelect
                        isRequired={true}
                        selectionMode="single"
                        label="Currency"
                        placeholder="Select Currency"
                        options={Currency}
                        value={formData.currency}
                        onChange={(val) => handleChange("currency", val)}
                        labelClassname="text-xs font-semibold"
                    />
                    <CustomInput
                        label="Total Budget (optional)"
                        variant="bordered"
                        labelPlacement="outside"
                        value={formData.totalBudget}
                        onChange={(val) => handleChange("totalBudget", handleNumericChange(val))}
                        classNames={{ label: "text-xs font-semibold" }}
                        placeholder="Enter total budget"
                    />
                    <CustomInput
                        label="Remaining Budget"
                        isRequired={true}
                        variant="bordered"
                        labelPlacement="outside"
                        value={remainingBudget.toFixed(2)}
                        isReadOnly
                        color={remainingBudget < 0 ? "danger" : "default"}
                        classNames={{
                            label: "text-xs font-semibold",
                            inputWrapper: remainingBudget < 0 ? "bg-red-50" : "bg-gray-50",
                        }}
                    />
                </div>

                {/* Budget Allocation Component */}
                <div className="w-full">
                    <BudgetAllocation
                        phases={formData.phases}
                        totalBudget={Number(formData.totalBudget)}
                        currency={formData.currency?.value || "SAR"}
                        onPhaseBudgetChange={handlePhaseBudgetChange}
                    />
                </div>


                {/* Date Range - Start and End */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomInput
                        label="Funding Source (optional)"
                        variant="bordered"
                        labelPlacement="outside"
                        value={formData.totalBudget}
                        onChange={(val) => handleChange("totalBudget", handleNumericChange(val))}
                        classNames={{ label: "text-xs font-semibold" }}
                        placeholder="Enter Funding Source"
                    /><CustomInput
                        label="Budget Owner (optional)"
                        variant="bordered"
                        labelPlacement="outside"
                        value={formData.totalBudget}
                        onChange={(val) => handleChange("totalBudget", handleNumericChange(val))}
                        classNames={{ label: "text-xs font-semibold" }}
                        placeholder="Enter Budget owner name"
                    />
                </div>

                {/* Date Range - Launching and Handover */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <CustomInput
                        label="Budget Notes (optional)"
                        variant="bordered"
                        labelPlacement="outside"
                        value={formData.totalBudget}
                        onChange={(val) => handleChange("totalBudget", handleNumericChange(val))}
                        classNames={{ label: "text-xs font-semibold" }}
                        placeholder="Add any additional budget-related notes"
                    />

                </div>

              
            </div>
        </div>
    );
}

export default CreateProjectFormStep4;