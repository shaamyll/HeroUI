"use client"

import { BarChart3 } from "lucide-react"
import { useState } from "react"
import CustomInput from "@/components/common/CustomInput"
import SearchableSelect from "@/components/Reusable/SearchableSelect" // ✅ Adjust path if needed

// Define option type
interface DropdownOption {
  value: string
  label: string
}

function FinancialInformationSection() {
  const [formData, setFormData] = useState({
    depreciationMethod: "",
    usefulLife: "",
    salvageValue: "",
    currentValue: "",
    costCenter: "",
    budgetCode: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Depreciation method options
  const depreciationMethodOptions: DropdownOption[] = [
    { value: "straight-line", label: "Straight Line" },
    { value: "declining-balance", label: "Declining Balance" },
    { value: "sum-of-years", label: "Sum of Years" },
    { value: "units-of-production", label: "Units of Production" },
  ]

  // Helper: string → DropdownOption | null
  const stringToOption = (value: string, options: DropdownOption[]): DropdownOption | null => {
    return options.find(opt => opt.value === value) || null
  }

  // Helper: DropdownOption | null → string
  const optionToString = (option: DropdownOption | null): string => {
    return option?.value || ""
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-green-50 rounded-lg">
          <BarChart3 className="w-4 h-4 text-green-600" />
        </div>
        <h2 className="text-sm font-semibold text-green-600">Financial Information</h2>
      </div>

      {/* ✅ Single consistent 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {/* Depreciation Method */}
        <SearchableSelect
          label="Depreciation Method"
          placeholder="Select an option"
          options={depreciationMethodOptions}
          value={stringToOption(formData.depreciationMethod, depreciationMethodOptions)}
          selectionMode="single"
          onChange={(option) => handleChange("depreciationMethod", optionToString(option))}
          labelClassname="text-xs font-semibold"
        />

        {/* Useful Life */}
        <CustomInput
          labelPlacement="outside"
          label="Useful Life"
          variant="bordered"
          placeholder="Eg: 5 years"
          value={formData.usefulLife}
          onChange={(value) => handleChange("usefulLife", value)}
          classNames={{ label: "text-xs font-semibold" }}
        />

        {/* Salvage Value */}
        <CustomInput
          labelPlacement="outside"
          label="Salvage Value"
          variant="bordered"
          placeholder="Eg: 5000"
          value={formData.salvageValue}
          onChange={(value) => handleChange("salvageValue", value)}
          classNames={{ label: "text-xs font-semibold" }}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">₹</span>
            </div>
          }
        />

        {/* Current Value */}
        <CustomInput
          labelPlacement="outside"
          label="Current Value"
          variant="bordered"
          placeholder="Eg: 25000.00"
          value={formData.currentValue}
          onChange={(value) => handleChange("currentValue", value)}
          classNames={{ label: "text-xs font-semibold" }}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">₹</span>
            </div>
          }
        />

        {/* Cost Center */}
        <CustomInput
          labelPlacement="outside"
          label="Cost Center"
          variant="bordered"
          placeholder="Eg: IT-001"
          value={formData.costCenter}
          onChange={(value) => handleChange("costCenter", value)}
          classNames={{ label: "text-xs font-semibold" }}
        />

        {/* Budget Code */}
        <CustomInput
          labelPlacement="outside"
          label="Budget Code"
          variant="bordered"
          placeholder="Eg: CAPEX-2024-001"
          value={formData.budgetCode}
          onChange={(value) => handleChange("budgetCode", value)}
          classNames={{ label: "text-xs font-semibold" }}
        />
      </div>
    </div>
  )
}

export default FinancialInformationSection