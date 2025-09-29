// ComplianceSafetySection.tsx
"use client";

import { Shield } from "lucide-react";
import CustomInput from "@/components/common/CustomInput";
import SearchableSelect from "@/components/Reusable/SearchableSelect";
import DynamicDatePicker, { type DateRange } from "@/components/Reusable/DynamicDatePicker";

interface DropdownOption {
  value: string;
  label: string;
}

export interface ComplianceSafetyData {
  certification: string;
  safetyRequirements: string;
  complianceStatus: string;
  lastInspectionDate: string | undefined;
  nextInspectionDate: string | undefined;
}

interface ComplianceSafetySectionProps {
  value: ComplianceSafetyData;
  onChange: (data: ComplianceSafetyData) => void;
}

const complianceStatusOptions: DropdownOption[] = [
  { value: "compliant", label: "Compliant" },
  { value: "non-compliant", label: "Non-Compliant" },
  { value: "pending", label: "Pending Review" },
  { value: "expired", label: "Expired" },
];

function ComplianceSafetySection({
  value,
  onChange,
}: ComplianceSafetySectionProps) {
  const handleChange = (
    key: keyof ComplianceSafetyData,
    newValue: string | undefined
  ) => {
    onChange({ ...value, [key]: newValue });
  };

  // Handle inspection date range (DateRange = { startDate, endDate })
  const handleInspectionRangeChange = (range: DateRange | null) => {
    if (range) {
      handleChange("lastInspectionDate", range.startDate);
      handleChange("nextInspectionDate", range.endDate);
    } else {
      handleChange("lastInspectionDate", undefined);
      handleChange("nextInspectionDate", undefined);
    }
  };

  // Build DateRange object for DynamicDatePicker
  const inspectionRangeValue: DateRange | null =
    value.lastInspectionDate && value.nextInspectionDate
      ? { startDate: value.lastInspectionDate, endDate: value.nextInspectionDate }
      : null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-red-50 rounded-lg">
          <Shield className="w-4 h-4 text-red-600" />
        </div>
        <h2 className="text-sm font-semibold text-red-600">Compliance & Safety</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {/* Row 1 */}
        <CustomInput
          labelPlacement="outside"
          label="Certification"
          variant="bordered"
          placeholder="Eg: ISO 9001:2015"
          value={value.certification}
          onChange={(e) => handleChange("certification", e)}
          classNames={{ label: "text-xs font-semibold" }}
        />

        <CustomInput
          labelPlacement="outside"
          label="Safety Requirements"
          variant="bordered"
          placeholder="Eg: Fire retardant"
          value={value.safetyRequirements}
          onChange={(e) => handleChange("safetyRequirements", e)}
          classNames={{ label: "text-xs font-semibold" }}
        />

        {/* Row 2 */}
        <SearchableSelect
          showSearch={true}
          label="Compliance Status"
          placeholder="Select an option"
          options={complianceStatusOptions}
          value={
            complianceStatusOptions.find(
              (opt) => opt.value === value.complianceStatus
            ) || null
          }
          selectionMode="single"
          onChange={(option) => {
            const selected = Array.isArray(option) ? option[0] : option;
            handleChange("complianceStatus", selected?.value || "");
          }}
          labelClassname="text-xs font-semibold"
        />

        {/* Inspection Date Range */}
        <DynamicDatePicker
          mode="range"
          label="Inspection Date Range"
          description="Pick last and next inspection dates"
          rangeValue={inspectionRangeValue}
          onRangeChange={handleInspectionRangeChange}
        />
      </div>
    </div>
  );
}

export default ComplianceSafetySection;
