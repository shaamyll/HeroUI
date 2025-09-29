import { Building2 } from "lucide-react"
import SearchableSelect from "@/components/Reusable/SearchableSelect"
import { useState } from "react"

interface DropdownOption {
  value: string
  label: string
}

function LocalAssignment_Section() {
  const assignmentTypes: DropdownOption[] = [
    { value: "self", label: "Self" },
    { value: "employee", label: "Employee" },
    { value: "department", label: "Department" },
    { value: "location", label: "Location" },
  ]

  const employees: DropdownOption[] = [
    { value: "bala-d", label: "Bala D" },
    { value: "john-doe", label: "John Doe" },
    { value: "jane-smith", label: "Jane Smith" },
    { value: "mike-johnson", label: "Mike Johnson" },
  ]

  const [formData, setFormData] = useState<{
    assignment_Type: DropdownOption | null
    employee: DropdownOption[]
  }>({
    assignment_Type: null,
    employee: [],
  })

  const handleChange = (
    key: keyof typeof formData,
    value: DropdownOption | DropdownOption[] | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

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
        {/* Assignment Type (single select) */}
        <SearchableSelect
          label="Assignment Type"
          selectionMode="single"
          placeholder="Select assignment type"
          options={assignmentTypes}
          value={formData.assignment_Type}
          onChange={(val) => handleChange("assignment_Type", val)}
          labelClassname="text-xs font-semibold"
        />

        {/* Employee (multi select) */}
        <SearchableSelect
          selectionMode="multiple"
          label="Employee"
          placeholder="Select employee"
          options={employees}
          value={formData.employee}
          onChange={(val) => handleChange("employee", val)}
          labelClassname="text-xs font-semibold"
        />
      </div>
    </div>
  )
}

export default LocalAssignment_Section
