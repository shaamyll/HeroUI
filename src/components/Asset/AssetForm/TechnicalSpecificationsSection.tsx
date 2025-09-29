import { Wrench } from "lucide-react"
import { useState } from "react"
import CustomInput from "@/components/common/CustomInput"

function TechnicalSpecificationsSection() {
    const [formData, setFormData] = useState({
        dimensions: "",
        weight: "",
        power: "",
        capacity: "",
        operatingSystem: "",
        customFields: "",
    })

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

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
                    <div>
                        <CustomInput
                            labelPlacement="outside"
                            label="Dimensions"
                            variant="bordered"
                            placeholder="Eg: 24 x 18 x 12 inches"
                            value={formData.dimensions}
                            onChange={(value) => handleChange("dimensions", value)}
                            classNames={{ label: "text-xs font-semibold" }}
                        />
                    </div>

                    <div>
                        <CustomInput
                            labelPlacement="outside"
                            label="Weight"
                            variant="bordered"
                            placeholder="Eg: 15.5 lbs"
                            value={formData.weight}
                            onChange={(value) => handleChange("weight", value)}
                            classNames={{ label: "text-xs font-semibold" }}
                        />
                    </div>

                    <div>
                        <CustomInput
                            labelPlacement="outside"
                            label="Power"
                            variant="bordered"
                            placeholder="Eg: 110V AC, 500W"
                            value={formData.power}
                            onChange={(value) => handleChange("power", value)}
                            classNames={{ label: "text-xs font-semibold" }}
                        />
                    </div>

                    <div>
                        <CustomInput
                            labelPlacement="outside"
                            label="Capacity"
                            variant="bordered"
                            placeholder="Eg: 2TB, 500 users"
                            value={formData.capacity}
                            onChange={(value) => handleChange("capacity", value)}
                            classNames={{ label: "text-xs font-semibold" }}
                        />
                    </div>

                    <div>
                        <CustomInput
                            labelPlacement="outside"
                            label="Operating System"
                            variant="bordered"
                            placeholder="Eg: Windows 11"
                            value={formData.operatingSystem}
                            onChange={(value) => handleChange("operatingSystem", value)}
                            classNames={{ label: "text-xs font-semibold" }}
                        />
                    </div>

                    <div>
                        <CustomInput
                            labelPlacement="outside"
                            label="Custom Fields"
                            variant="bordered"
                            placeholder="Eg: Bluetooth 5.0"
                            value={formData.customFields}
                            onChange={(value) => handleChange("customFields", value)}
                            classNames={{ label: "text-xs font-semibold" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TechnicalSpecificationsSection
