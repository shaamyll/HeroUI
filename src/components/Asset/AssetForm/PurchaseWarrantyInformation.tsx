// PurchaseWarrantyInformation.tsx
import { DollarSign } from "lucide-react";
import CustomInput from "@/components/common/CustomInput";
import SearchableSelect from "@/components/Reusable/SearchableSelect";
import { Checkbox, Divider } from "@heroui/react";
import DynamicDatePicker, { type DateRange } from "@/components/Reusable/DynamicDatePicker";

interface DropdownOption {
  value: string;
  label: string;
}

// Updated to use ISO string format for dates
export interface PurchaseWarrantyData {
  purchaseDate: string | undefined;
  purchasePrice: string;
  vendor: DropdownOption | null;
  warrantyType: DropdownOption | null;
  warrantyDuration: string;
  warrantyStartDate: string | undefined;
  warrantyEndDate: string | undefined;
  coverageType: DropdownOption | null;
  warrantyNumber: string;
  hasExtendedWarranty: boolean;
  extendedWarrantyCost: string;
}

interface PurchaseWarrantyInformationProps {
  value: PurchaseWarrantyData;
  onChange: (data: PurchaseWarrantyData) => void;
}

const vendorOptions: DropdownOption[] = [
  { value: "vendor1", label: "Vendor 1" },
  { value: "vendor2", label: "Vendor 2" },
  { value: "vendor3", label: "Vendor 3" },
];

const warrantyTypeOptions: DropdownOption[] = [
  { value: "manufacturer", label: "Manufacturer Warranty" },
  { value: "extended", label: "Extended Warranty" },
  { value: "service", label: "Service Warranty" },
];

const coverageOptions: DropdownOption[] = [
  { value: "full", label: "Full Coverage" },
  { value: "partial", label: "Partial Coverage" },
  { value: "limited", label: "Limited Coverage" },
];

function PurchaseWarrantyInformation({
  value,
  onChange,
}: PurchaseWarrantyInformationProps) {
  const handleChange = (
    key: keyof PurchaseWarrantyData,
    newValue: any
  ) => {
    const updatedData = {
      ...value,
      [key]: newValue,
    };
    console.log(`Updated ${key}:`, newValue);
    console.log('Complete Purchase & Warranty Data:', updatedData);
    onChange(updatedData);
  };

  // Handle purchase date (single date) - receives ISO string
  const handlePurchaseDateChange = (date: string | undefined) => {
    handleChange("purchaseDate", date);
  };

  // Handle warranty date range - receives DateRange object
  const handleWarrantyDateRangeChange = (range: DateRange | null) => {
    console.log('Warranty Range Changed:', range);
    
    if (!range) {
      console.log('Clearing warranty dates');
      onChange({
        ...value,
        warrantyStartDate: undefined,
        warrantyEndDate: undefined,
      });
      return;
    }

    const { startDate, endDate } = range;
    
    const updatedData = {
      ...value,
      warrantyStartDate: startDate,
      warrantyEndDate: endDate,
    };
    console.log('Complete Purchase & Warranty Data:', updatedData);
    onChange(updatedData);
  };

  const rangeValue: DateRange | null =
    value.warrantyStartDate && value.warrantyEndDate
      ? {
          startDate: value.warrantyStartDate,
          endDate: value.warrantyEndDate,
        }
      : null;


  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-green-50 rounded-lg">
          <DollarSign className="w-4 h-4 text-green-600" />
        </div>
        <h2 className="text-sm font-semibold text-green-600">
          Purchase & Warranty Information
        </h2>
      </div>

      <div className="space-y-6">
        {/* Purchase Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DynamicDatePicker
            mode="single"
            label="Purchase Date"
            onSingleChange={handlePurchaseDateChange}
            singleValue={value.purchaseDate}
            description="Pick a date"
            showDescription={true}
          />

          <CustomInput
            value={value.purchasePrice}
            onChange={(val) => handleChange("purchasePrice", val)}
            placeholder="Eg: 25000"
            startContent={<DollarSign className="w-4 h-4" />}
            variant="bordered"
            labelPlacement="outside"
            label="Purchase Price"
            classNames={{ label: "text-xs font-semibold" }}
          />
        </div>

        <Divider />
        
        <div className="mt-4">
          <h3 className="mb-3 text-sm font-medium text-gray-700">
            Vendor Information
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SearchableSelect
              selectionMode="single"
              label="Vendor"
              placeholder="Select Vendor"
              options={vendorOptions}
              value={value.vendor}
              onChange={(val) => handleChange("vendor", val)}
              labelClassname="text-xs font-semibold"
            />
          </div>
        </div>

        <Divider />

        {/* Warranty Details */}
        <div className="space-y-6 text-md py-1">
          <h3 className="text-sm font-medium text-gray-700">Warranty Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SearchableSelect
              selectionMode="single"
              label="Warranty Type"
              placeholder="Select Warranty Type"
              options={warrantyTypeOptions}
              value={value.warrantyType}
              onChange={(val) => handleChange("warrantyType", val)}
              labelClassname="text-xs font-semibold"
            />

            <CustomInput
              value={value.warrantyDuration}
              onChange={(val) => handleChange("warrantyDuration", val)}
              placeholder="Eg: 2 years or 24 months"
              variant="bordered"
              labelPlacement="outside"
              label="Duration"
              classNames={{ label: "text-xs font-semibold" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DynamicDatePicker
              mode="range"
              label="Warranty Range"
              onRangeChange={handleWarrantyDateRangeChange}
              rangeValue={rangeValue}
              description="Pick a Date Range"
              showDescription={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchableSelect
              selectionMode="single"
              label="Coverage Type"
              placeholder="Select Coverage"
              options={coverageOptions}
              value={value.coverageType}
              onChange={(val) => handleChange("coverageType", val)}
              labelClassname="text-xs font-semibold"
            />

            <CustomInput
              value={value.warrantyNumber}
              onChange={(val) => handleChange("warrantyNumber", val)}
              placeholder="Eg: WR-2024-ABC123"
              variant="bordered"
              labelPlacement="outside"
              label="Warranty Number"
              classNames={{ label: "text-xs font-semibold" }}
            />
          </div>

          {/* Extended Warranty */}
          <div className="flex items-center gap-2">
            <Checkbox
              isSelected={value.hasExtendedWarranty}
              onValueChange={(isSelected) =>
                handleChange("hasExtendedWarranty", isSelected)
              }
              radius="md"
              size="md"
            >
              <span className="text-sm text-primary">Extended Warranty Available</span>
            </Checkbox>
          </div>

          {value.hasExtendedWarranty && (
           <div className="pt-0.5">
             <CustomInput
              value={value.extendedWarrantyCost}
              onChange={(val) => handleChange("extendedWarrantyCost", val)}
              placeholder="Eg: 500"
              startContent={<DollarSign className="w-4 h-4 text-gray-400" />}
              variant="bordered"
              labelPlacement="outside"
              label="Extended Warranty Cost"
              classNames={{ label: "text-xs font-semibold" }}
            />
           </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaseWarrantyInformation;