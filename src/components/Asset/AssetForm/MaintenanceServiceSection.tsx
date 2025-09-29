"use client"

import { Clock } from "lucide-react"
import { useState } from "react"
import CustomInput from "@/components/common/CustomInput"
import SearchableSelect from "@/components/Reusable/SearchableSelect"
import DynamicDatePicker from "@/components/Reusable/DynamicDatePicker"

interface DropdownOption {
    value: string
    label: string
}

// Define date range type
interface DateRange {
    from: Date | undefined
    to: Date | undefined
}

function MaintenanceServiceSection() {
    const [formData, setFormData] = useState({
        maintenanceFrequency: "",
        serviceProvider: "",
        serviceContract: "",
        criticalityLevel: "",
    })

    const [warrantyRange, setWarrantyRange] = useState<DateRange>({ from: undefined, to: undefined })

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleDateRangeChange = (range: DateRange) => {
        setWarrantyRange(range)
    }

    // Dropdown options
    const maintenanceFrequencyOptions: DropdownOption[] = [
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
        { value: "annually", label: "Annually" },
    ]

    const criticalityLevelOptions: DropdownOption[] = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" },
    ]

    const stringToOption = (value: string, options: DropdownOption[]): DropdownOption | null => {
        return options.find(opt => opt.value === value) || null
    }

    const optionToString = (option: DropdownOption | null): string => {
        return option?.value || ""
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-orange-50 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-sm font-semibold text-orange-600">Maintenance & Service</h2>
            </div>

            {/* ✅ Single 2-column grid for all fields */}
            <div className="grid grid-cols-2 gap-4">
                {/* Row 1 */}
                <div className="col-span-1">
                    <SearchableSelect
                        label="Maintenance Frequency"
                        placeholder="Select an option"
                        options={maintenanceFrequencyOptions}
                        value={stringToOption(formData.maintenanceFrequency, maintenanceFrequencyOptions)}
                        selectionMode="single"
                        onChange={(option) => handleChange("maintenanceFrequency", optionToString(option))}
                        labelClassname="text-xs font-semibold"
                    />
                </div>
                <div className="col-span-1">
                    <DynamicDatePicker
                        mode="range"
                        label="Maintainence Date Range"
                        description="Pick a Date Range"
                        value={warrantyRange}
                        onChange={handleDateRangeChange}
                    />
                </div>

                {/* Row 2 */}
                <div className="col-span-1">
                    <CustomInput
                        labelPlacement="outside"
                        label="Service Provider"
                        variant="bordered"
                        placeholder="Eg: Dell Support"
                        value={formData.serviceProvider}
                        onChange={(value) => handleChange("serviceProvider", value)}
                        classNames={{ label: "text-xs font-semibold" }}
                    />
                </div>
                <div className="col-span-1">
                    <CustomInput
                        labelPlacement="outside"
                        label="Service Contract"
                        variant="bordered"
                        placeholder="Eg: 3-year warranty"
                        value={formData.serviceContract}
                        onChange={(value) => handleChange("serviceContract", value)}
                        classNames={{ label: "text-xs font-semibold" }}
                    />
                </div>

                {/* Row 3 */}
                <div className="col-span-1">
                    <SearchableSelect
                        label="Criticality Level"
                        placeholder="Select an option"
                        options={criticalityLevelOptions}
                        value={stringToOption(formData.criticalityLevel, criticalityLevelOptions)}
                        selectionMode="single"
                        onChange={(option) => handleChange("criticalityLevel", optionToString(option))}
                        labelClassname="text-xs font-semibold"
                    />
                </div>
                {/* Empty cell on bottom right (to match design) */}
                <div className="col-span-1"></div>
            </div>
        </div>
    )
}

export default MaintenanceServiceSection