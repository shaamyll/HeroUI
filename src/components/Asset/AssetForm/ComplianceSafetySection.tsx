"use client"

import { Shield } from "lucide-react"
import { useState } from "react"
import CustomInput from "@/components/common/CustomInput"
import SearchableSelect from "@/components/Reusable/SearchableSelect"
import DynamicDatePicker from "@/components/Reusable/DynamicDatePicker" // ✅ Adjust path if needed

// Define option type
interface DropdownOption {
  value: string;
  label: string;
}

// Date range type
interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

function ComplianceSafetySection() {
  const [formData, setFormData] = useState({
    certification: "",
    safetyRequirements: "",
    complianceStatus: "",
    // inspection dates will be managed via date range
  });

  // State for inspection date range
  const [inspectionRange, setInspectionRange] = useState<DateRange>({ from: undefined, to: undefined });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateRangeChange = (range: DateRange) => {
    setInspectionRange(range);
    // Optional: sync to formData if needed later (e.g., on submit)
    // const formatDate = (d: Date | undefined) => d ? d.toISOString().split('T')[0] : '';
    // setFormData(prev => ({
    //   ...prev,
    //   lastInspectionDate: formatDate(range.from),
    //   nextInspectionDate: formatDate(range.to),
    // }));
  };

  // Compliance status options
  const complianceStatusOptions: DropdownOption[] = [
    { value: "compliant", label: "Compliant" },
    { value: "non-compliant", label: "Non-Compliant" },
    { value: "pending", label: "Pending Review" },
    { value: "expired", label: "Expired" },
  ];

  const stringToOption = (value: string, options: DropdownOption[]): DropdownOption | null => {
    return options.find(opt => opt.value === value) || null;
  };

  const optionToString = (option: DropdownOption | null): string => {
    return option?.value || "";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-red-50 rounded-lg">
          <Shield className="w-4 h-4 text-red-600" />
        </div>
        <h2 className="text-sm font-semibold text-red-600">Compliance & Safety</h2>
      </div>

      {/* ✅ Single 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {/* Row 1 */}
        <CustomInput
          labelPlacement="outside"
          label="Certification"
          variant="bordered"
          placeholder="Eg: ISO 9001:2015"
          value={formData.certification}
          onChange={(value) => handleChange("certification", value)}
          classNames={{ label: "text-xs font-semibold" }}
        />

        <CustomInput
          labelPlacement="outside"
          label="Safety Requirements"
          variant="bordered"
          placeholder="Eg: Fire retardant"
          value={formData.safetyRequirements}
          onChange={(value) => handleChange("safetyRequirements", value)}
          classNames={{ label: "text-xs font-semibold" }}
        />

        {/* Row 2 */}
        <SearchableSelect
        showSearch={true}
          label="Compliance Status"
          placeholder="Select an option"
          options={complianceStatusOptions}
          value={stringToOption(formData.complianceStatus, complianceStatusOptions)}
          selectionMode="single"
          onChange={(option) => handleChange("complianceStatus", optionToString(option))}
          labelClassname="text-xs font-semibold"
        />

        {/* Inspection Date Range */}
        <DynamicDatePicker
          mode="range"
          label="Inspection Date Range"
          description="Pick last and next inspection dates"
          value={inspectionRange}
          onChange={handleDateRangeChange}
        />

        {/* No more individual date fields — replaced by range picker */}
      </div>
    </div>
  );
}

export default ComplianceSafetySection;