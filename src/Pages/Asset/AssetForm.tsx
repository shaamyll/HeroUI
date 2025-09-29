import { ArrowLeft, ChevronDown } from "lucide-react"
import BasicInfo_Section from "@/components/Asset/AssetForm/BasicInfo_Section"
import AssetPreview from "@/components/Asset/AssetForm/AssetPreview"
import LocalAssignment_Section from "@/components/Asset/AssetForm/LocalAssignment_Section"
import PurchaseWarrantyInformation from "@/components/Asset/AssetForm/PurchaseWarrantyInformation"
import TechnicalSpecificationsSection from "@/components/Asset/AssetForm/TechnicalSpecificationsSection"
import MaintenanceServiceSection from "@/components/Asset/AssetForm/MaintenanceServiceSection"
import FinancialInformationSection from "@/components/Asset/AssetForm/FinancialInformationSection"
import ComplianceSafetySection from "@/components/Asset/AssetForm/ComplianceSafetySection"

function AssetForm() {
  return (
    <div className="max-w-[1400px] mx-auto mt-8 min-h-screen px-2 pb-36">
      {/* Header section with purple background matching the design */}
      <div className="bg-purple-950 text-white px-6 py-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ArrowLeft className="w-5 h-5 cursor-pointer hover:opacity-80" />
            <div>
              <h1 className="text-lg font-semibold">Add New Asset</h1>
              <p className="text-purple-200 text-xs">Create and configure a new asset in the system</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column - Basic Information form */}
           <div className="lg:col-span-2">
          <div className="space-y-5">
            <BasicInfo_Section />
            <LocalAssignment_Section />
            <PurchaseWarrantyInformation/>
            <TechnicalSpecificationsSection/>
            <MaintenanceServiceSection/>
            <FinancialInformationSection/>
            <ComplianceSafetySection/>
          </div>
        </div>

        {/* Right column - Asset Preview and Guidelines (placeholder) */}
        <AssetPreview/>

       
      </div>

      
    </div>
  )
}

export default AssetForm
