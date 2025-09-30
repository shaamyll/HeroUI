// MaintenanceServiceSection.tsx
import { Clock } from "lucide-react";
import CustomInput from "@/components/common/CustomInput";
import SearchableSelect from "@/components/Reusable/SearchableSelect";
import DynamicDatePicker, { type DateRange } from "@/components/Reusable/DynamicDatePicker";

interface DropdownOption {
    value: string;
    label: string;
}

export interface MaintenanceServiceData {
    maintenanceFrequency: string;
    serviceProvider: string;
    serviceContract: string;
    criticalityLevel: string;
    maintenanceStartDate: string | undefined;
    maintenanceEndDate: string | undefined;
}

interface MaintenanceServiceSectionProps {
    value: MaintenanceServiceData;
    onChange: (data: MaintenanceServiceData) => void;
}

const maintenanceFrequencyOptions: DropdownOption[] = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "annually", label: "Annually" },
];

const criticalityLevelOptions: DropdownOption[] = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" },
];

function MaintenanceServiceSection({
    value,
    onChange,
}: MaintenanceServiceSectionProps) {
    const handleChange = (
        key: keyof MaintenanceServiceData,
        newValue: string | undefined
    ) => {
        onChange({ ...value, [key]: newValue });
    };

    const handleDateRangeChange = (range: DateRange | null) => {
        console.log(range)
        if (!range) {
            onChange({
                ...value,
                maintenanceStartDate: undefined,
                maintenanceEndDate: undefined
            });
            return
        }

        const { startDate, endDate } = range
        onChange({
            ...value,
            maintenanceStartDate: startDate,
            maintenanceEndDate: endDate
        });
    };

    const dateRangeValue: DateRange | null =
        value.maintenanceStartDate && value.maintenanceEndDate
            ? { startDate: value.maintenanceStartDate, endDate: value.maintenanceEndDate }
            : null;

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-orange-50 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-sm font-semibold text-orange-600">
                    Maintenance & Service
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <SearchableSelect
                    label="Maintenance Frequency"
                    placeholder="Select an option"
                    options={maintenanceFrequencyOptions}
                    value={
                        maintenanceFrequencyOptions.find(
                            (opt) => opt.value === value.maintenanceFrequency
                        ) || null
                    }
                    selectionMode="single"
                    onChange={(option) => {
                        handleChange("maintenanceFrequency", (option as DropdownOption | null)?.value || "");
                    }}
                    labelClassname="text-xs font-semibold"
                />

                <DynamicDatePicker
                    mode="range"
                    label="Maintenance Date Range"
                    description="Pick a Date Range"
                    rangeValue={dateRangeValue}
                    onRangeChange={handleDateRangeChange}
                />

                <CustomInput
                    labelPlacement="outside"
                    label="Service Provider"
                    variant="bordered"
                    placeholder="Eg: Dell Support"
                    value={value.serviceProvider}
                    onChange={(e) => handleChange("serviceProvider", e)}
                    classNames={{ label: "text-xs font-semibold" }}
                />

                <CustomInput
                    labelPlacement="outside"
                    label="Service Contract"
                    variant="bordered"
                    placeholder="Eg: 3-year warranty"
                    value={value.serviceContract}
                    onChange={(e) => handleChange("serviceContract", e)}
                    classNames={{ label: "text-xs font-semibold" }}
                />

                <SearchableSelect
                    label="Criticality Level"
                    placeholder="Select an option"
                    options={criticalityLevelOptions}
                    value={
                        criticalityLevelOptions.find(
                            (opt) => opt.value === value.criticalityLevel
                        ) || null
                    }
                    selectionMode="single"
                    onChange={(option) => {
                        handleChange("criticalityLevel", (option as DropdownOption | null)?.value || "");
                    }}
                    labelClassname="text-xs font-semibold"
                />
            </div>
        </div>
    );
}

export default MaintenanceServiceSection;