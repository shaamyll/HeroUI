import { Info, AlertTriangle } from "lucide-react"

function AssetPreviewSection() {
  return (
    <div className="space-y-4">
      {/* Asset Preview Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Asset Preview</h3>

        {/* QR Code and Asset ID */}
        <div className="flex flex-col items-center space-y-3 py-6 border rounded-lg">
          <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-8 gap-1 w-24 h-24">
              {Array.from({ length: 64 }, (_, i) => (
                <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
              ))}
            </div>
          </div>

          {/* Asset ID */}
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">141-18-0292</p>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-6">Guidelines</h3>

        <div className="space-y-4">
          {/* Asset IDs guideline */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-md  flex items-center justify-center mt-0.5">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">
              Asset IDs are unique identifiers that cannot be changed once generated
            </p>
          </div>

          {/* QR codes guideline */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">QR codes contain essential asset information for mobile scanning</p>
          </div>

          {/* Required fields guideline */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600">
              Required fields are marked with <span className="text-red-500 font-medium">*</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetPreviewSection
