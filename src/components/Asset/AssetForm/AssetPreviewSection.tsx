import type { AssetFormData } from "@/Pages/Asset/AssetForm";
import { Info, AlertTriangle } from "lucide-react"
import QR_with_logo from "./QR_with_logo";
import logo from '@/assets/logo.png'

interface AssetPreviewSectionProps {
  data: AssetFormData;
}

function AssetPreviewSection({ data }: AssetPreviewSectionProps) {

  const prefix = data.basicInformation.prefix || "";
  const suffix = data.basicInformation.suffix || "";

  const assetId = `${prefix}-18-0292${suffix ? `-${suffix}` : ''}`;

  const qrData = assetId;

  return (
    <div className="space-y-4">
      {/* Asset Preview Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Asset Preview</h3>

         {/* QR Code and Asset ID */}
        <div className="flex flex-col items-center space-y-3 py-7 border-2 rounded-lg">
          {/* QR component */}
          <div className="w-32 h-32 flex items-center justify-center border-2  rounded-md">
            <QR_with_logo
              url={qrData}
              size={120}
              logo={logo}
            />
          </div>

          {/* Asset ID */}
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">{assetId}</p>
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