import { Tag } from "lucide-react"

function BasicInfo_Section() {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
      {/* Section header with icon and title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Tag className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-medium font-semibold text-gray-900">Basic Information</h2>
      </div>

      <div className="space-y-6">
        {/* This is where you'll add your form inputs */}
        <div className="text-gray-500 text-center py-8">Form inputs will be added here</div>
      </div>
    </div>
  )
}

export default BasicInfo_Section
