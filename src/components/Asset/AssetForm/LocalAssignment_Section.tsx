// LocalAssignment_Section.tsx
import { Building2 } from "lucide-react";
import SearchableSelect from "@/components/Reusable/SearchableSelect";

interface DropdownOption {
  value: string;
  label: string;
}

export interface LocalAssignmentData {
  assignmentType: DropdownOption | null;
  assignee: DropdownOption | null;
  store: DropdownOption | null;
}

interface LocalAssignmentSectionProps {
  value: LocalAssignmentData;
  onChange: (data: LocalAssignmentData) => void;
}

const assignmentTypes: DropdownOption[] = [
  { value: "self", label: "Self" },
  { value: "store", label: "Store" },
];

const assigneeOptions: DropdownOption[] = [
  { value: "john-doe", label: "John Doe" },
  { value: "mike-johnson", label: "Mike Johnson" },
];

const storeOptions: DropdownOption[] = [
  { value: "ny-store", label: "New York Store" },
  { value: "chicago-store", label: "Chicago Store" },
];

function LocalAssignment_Section({ value, onChange }: LocalAssignmentSectionProps) {
  const handleChange = (
    key: keyof LocalAssignmentData,
    newValue: DropdownOption | null
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  const selectedType = value.assignmentType?.value;

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1 bg-purple-50 rounded-lg">
          <Building2 className="w-4 h-4 text-purple-600" />
        </div>
        <h2 className="text-sm font-semibold text-purple-600">
          Asset Assignment
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assignment Type */}
        <SearchableSelect
          label="Assignment Type"
          selectionMode="single"
          placeholder="Select assignment type"
          options={assignmentTypes}
          value={value.assignmentType}
          onChange={(val) => handleChange("assignmentType", val as DropdownOption | null)}
          labelClassname="text-xs font-semibold"
        />

        {/* Conditional Field */}
        {selectedType === "store" ? (
          <SearchableSelect
            selectionMode="single"
            label="Store"
            placeholder="Select Store"
            options={storeOptions}
            value={value.store}
            onChange={(val) => handleChange("store", val as DropdownOption | null)}
            labelClassname="text-xs font-semibold"
          />
        ) : (
          <SearchableSelect
            selectionMode="single"
            label="Assignee"
            placeholder="Select assignee"
            options={assigneeOptions}
            value={value.assignee}
            onChange={(val) => handleChange("assignee", val as DropdownOption | null)}
            labelClassname="text-xs font-semibold"
          />
        )}
      </div>
    </div>
  );
}

export default LocalAssignment_Section;