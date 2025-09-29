// TechnicalSpecificationsSection.tsx
import { Wrench } from "lucide-react";
import CustomInput from "@/components/common/CustomInput";

export interface TechnicalSpecificationsData {
  dimensions: string;
  weight: string;
  power: string;
  capacity: string;
  operatingSystem: string;
  customFields: string;
}

interface TechnicalSpecificationsSectionProps {
  value: TechnicalSpecificationsData;
  onChange: (data: TechnicalSpecificationsData) => void;
}

function TechnicalSpecificationsSection({
  value,
  onChange,
}: TechnicalSpecificationsSectionProps) {
  const handleChange = (
    key: keyof TechnicalSpecificationsData,
    newValue: string
  ) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Wrench className="w-4 h-4 text-gray-600" />
        </div>
        <h2 className="text-sm font-semibold text-gray-600">Technical Specifications</h2>
      </div>

      <div className="space-y-6">
        {/* Technical Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            labelPlacement="outside"
            label="Dimensions"
            variant="bordered"
            placeholder="Eg: 24 x 18 x 12 inches"
            value={value.dimensions}
            onChange={(e) => handleChange("dimensions", e)}
            classNames={{ label: "text-xs font-semibold" }}
          />

          <CustomInput
            labelPlacement="outside"
            label="Weight"
            variant="bordered"
            placeholder="Eg: 15.5 lbs"
            value={value.weight}
            onChange={(e) => handleChange("weight", e)}
            classNames={{ label: "text-xs font-semibold" }}
          />

          <CustomInput
            labelPlacement="outside"
            label="Power"
            variant="bordered"
            placeholder="Eg: 110V AC, 500W"
            value={value.power}
            onChange={(e) => handleChange("power", e)}
            classNames={{ label: "text-xs font-semibold" }}
          />

          <CustomInput
            labelPlacement="outside"
            label="Capacity"
            variant="bordered"
            placeholder="Eg: 2TB, 500 users"
            value={value.capacity}
            onChange={(val) => handleChange("capacity", val)}
            classNames={{ label: "text-xs font-semibold" }}
          />

          <CustomInput
            labelPlacement="outside"
            label="Operating System"
            variant="bordered"
            placeholder="Eg: Windows 11"
            value={value.operatingSystem}
            onChange={(val) => handleChange("operatingSystem", val)}
            classNames={{ label: "text-xs font-semibold" }}
          />

          <CustomInput
            labelPlacement="outside"
            label="Custom Fields"
            variant="bordered"
            placeholder="Eg: Bluetooth 5.0"
            value={value.customFields}
            onChange={(val) => handleChange("customFields", val)}
            classNames={{ label: "text-xs font-semibold" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TechnicalSpecificationsSection;