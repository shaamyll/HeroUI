import { ArrowLeft, ChevronDown } from "lucide-react"
import BasicInfo_Section from "@/components/Asset/AssetForm/BasicInfo_Section"
import AssetPreview from "@/components/Asset/AssetForm/AssetPreview"

function AssetForm() {
  return (
    <div className="max-w-[1400px] mx-auto mt-8 min-h-screen">
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
          <BasicInfo_Section />
        </div>

        {/* Right column - Asset Preview and Guidelines (placeholder) */}
        <AssetPreview/>
      </div>
    </div>
  )
}

export default AssetForm
