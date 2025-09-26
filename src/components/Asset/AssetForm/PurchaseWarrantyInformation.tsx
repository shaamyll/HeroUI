import { DollarSign, Calendar } from "lucide-react"
import { useState } from "react"
import CustomInput from "@/components/common/CustomInput"
import SearchableSelect from "@/components/Reusable/SearchableSelect"
import { Checkbox, Divider } from "@heroui/react"
import DynamicDatePicker from "@/components/Reusable/DynamicDatePicker"

function PurchaseWarrantyInformation() {
    const vendorOptions = [
        { value: "vendor1", label: "Vendor 1" },
        { value: "vendor2", label: "Vendor 2" },
        { value: "vendor3", label: "Vendor 3" },
    ]

    const warrantyTypeOptions = [
        { value: "manufacturer", label: "Manufacturer Warranty" },
        { value: "extended", label: "Extended Warranty" },
        { value: "service", label: "Service Warranty" },
    ]

    const coverageOptions = [
        { value: "full", label: "Full Coverage" },
        { value: "partial", label: "Partial Coverage" },
        { value: "limited", label: "Limited Coverage" },
    ]

    const [formData, setFormData] = useState({
        vendor: null,
        warrantyType: null,
        coverage: null,
        department: null,
    })

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

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
                    <CustomInput
                        placeholder="Pick a date"
                        startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                        variant="bordered"
                        labelPlacement="outside"
                        label="Purchase Date"
                        classNames={{ label: "text-xs font-semibold" }}
                    />

                    <CustomInput
                        placeholder="Eg: 25000"
                        startContent={<DollarSign className="w-4 h-4 text-gray-400" />}
                        variant="bordered"
                        labelPlacement="outside"
                        label="Purchase Price"
                        classNames={{ label: "text-xs font-semibold" }}
                    />
                </div>

                <Divider />
                <div className="mt-4">
                    {/* Vendor */}
                    <h3 className="mb-3 text-sm font-medium text-gray-700">
                        Vendor Information
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <SearchableSelect
                            selectionMode="single"
                            label="Vendor"
                            placeholder="Select Vendor"
                            options={vendorOptions}
                            value={formData.vendor}
                            onChange={(val) => handleChange("vendor", val)}
                            labelClassname="text-xs font-semibold"
                        />
                    </div>
                </div>

                <Divider />

                {/* Warranty Details */}
                <div className="space-y-6 text-md py-2">
                    <h3 className="text-sm font-medium text-gray-700">Warranty Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SearchableSelect
                            selectionMode="single"
                            label="Warranty Type"
                            placeholder="Select Warranty Type"
                            options={warrantyTypeOptions}
                            value={formData.warrantyType}
                            onChange={(val) => handleChange("warrantyType", val)}
                            labelClassname="text-xs font-semibold"
                        />

                        <CustomInput
                            placeholder="Eg: 2 years or 24 months"
                            variant="bordered"
                            labelPlacement="outside"
                            label="Duration"
                            classNames={{ label: "text-xs font-semibold" }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DynamicDatePicker
                            label="Warranty Range"
                        />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SearchableSelect
                            selectionMode="single"
                            label="Coverage Type"
                            placeholder="Select Coverage"
                            options={coverageOptions}
                            value={formData.coverage}
                            onChange={(val) => handleChange("coverage", val)}
                            labelClassname="text-xs font-semibold"
                        />

                        <CustomInput
                            placeholder="Eg: WR-2024-ABC123"
                            variant="bordered"
                            labelPlacement="outside"
                            label="Warranty Number"
                            classNames={{ label: "text-xs font-semibold" }}
                        />
                    </div>

                    {/* Extended Warranty */}
                    <div className="flex items-center gap-2">
                        <Checkbox radius="md" size="md"><span className="text-sm">Extended Warranty Available</span></Checkbox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseWarrantyInformation
