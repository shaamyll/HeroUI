import { BarChart3 } from "lucide-react";
import CustomInput from "@/components/common/CustomInput";
import SearchableSelect from "@/components/Reusable/SearchableSelect";

interface DropdownOption {
  value: string;
  label: string;
}

export interface FinancialInformationData {
  depreciationMethod: string;
  usefulLife: string;
  salvageValue: string;
  currentValue: string;
  costCenter: string;
  budgetCode: string;
}

interface FinancialInformationSectionProps {
  value: FinancialInformationData;
  onChange: (data: FinancialInformationData) => void;
}

const depreciationMethodOptions: DropdownOption[] = [
  { value: "straight-line", label: "Straight Line" },
  { value: "declining-balance", label: "Declining Balance" },
  { value: "sum-of-years", label: "Sum of Years" },
  { value: "units-of-production", label: "Units of Production" },
];

function FinancialInformationSection({
  value,
  onChange,
}: FinancialInformationSectionProps) {
  const handleChange = (
    key: keyof FinancialInformationData,
    newValue: string
  ) => {
    onChange({ ...value, [key]: newValue });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-green-50 rounded-lg">
          <BarChart3 className="w-4 h-4 text-green-600" />
        </div>
        <h2 className="text-sm font-semibold text-green-600">Financial Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {/* Depreciation Method */}
        <SearchableSelect
          label="Depreciation Method"
          placeholder="Select an option"
          options={depreciationMethodOptions}
          value={
            depreciationMethodOptions.find(
              (opt) => opt.value === value.depreciationMethod
            ) || null
          }
          selectionMode="single"
          onChange={(option) => {
            const selected = Array.isArray(option) ? option[0] : option;
            handleChange("depreciationMethod", selected?.value || "");
          }}
          labelClassname="text-xs font-semibold"
        />

        {/* Useful Life */}
        <CustomInput
          labelPlacement="outside"
          label="Useful Life"
          variant="bordered"
          placeholder="Eg: 5 years"
          value={value.usefulLife}
          onChange={(e) => handleChange("usefulLife", e)}
          classNames={{ label: "text-xs font-semibold" }}
        />

        {/* Salvage Value */}
        <CustomInput
          labelPlacement="outside"
          label="Salvage Value"
          variant="bordered"
          placeholder="Eg: 5000"
          value={value.salvageValue}
          onChange={(e) => handleChange("salvageValue", e)}
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
          value={value.currentValue}
          onChange={(e) => handleChange("currentValue", e)}
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
          value={value.costCenter}
          onChange={(e) => handleChange("costCenter", e)}
          classNames={{ label: "text-xs font-semibold" }}
        />

        {/* Budget Code */}
        <CustomInput
          labelPlacement="outside"
          label="Budget Code"
          variant="bordered"
          placeholder="Eg: CAPEX-2024-001"
          value={value.budgetCode}
          onChange={(e) => handleChange("budgetCode", e)}
          classNames={{ label: "text-xs font-semibold" }}
        />
      </div>
    </div>
  );
}

export default FinancialInformationSection;