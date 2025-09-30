import { ArrowLeft } from "lucide-react"
import BasicInformationSection, { type BasicInformationData } from "@/components/Asset/AssetForm/BasicInformationSection"
import LocalAssignment_Section, { type LocalAssignmentData } from "@/components/Asset/AssetForm/LocalAssignment_Section"
import PurchaseWarrantyInformation, { type PurchaseWarrantyData } from "@/components/Asset/AssetForm/PurchaseWarrantyInformation"
import TechnicalSpecificationsSection, { type TechnicalSpecificationsData } from "@/components/Asset/AssetForm/TechnicalSpecificationsSection"
import MaintenanceServiceSection, { type MaintenanceServiceData } from "@/components/Asset/AssetForm/MaintenanceServiceSection"
import FinancialInformationSection, { type FinancialInformationData } from "@/components/Asset/AssetForm/FinancialInformationSection"
import ComplianceSafetySection, { type ComplianceSafetyData } from "@/components/Asset/AssetForm/ComplianceSafetySection"
import AssetTagsSection, { type AssetTagsData } from "@/components/Asset/AssetForm/AssetTags"
import AssetPreviewSection from "@/components/Asset/AssetForm/AssetPreviewSection"
import CustomButton from "@/components/common/CustomButton"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ImagesDocumentsSection from "@/components/Asset/AssetForm/ImagesDocumentsSection"

export interface AssetFormData {
  basicInformation: BasicInformationData;
  localAssignment: LocalAssignmentData;
  purchaseWarranty: PurchaseWarrantyData;
  technicalSpecifications: TechnicalSpecificationsData;
  maintenanceService: MaintenanceServiceData;
  complianceSafety: ComplianceSafetyData;
  financialInformation: FinancialInformationData;
  assetTags: AssetTagsData;
  media: ImagesDocumentsData;
}

function AssetForm() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState<AssetFormData>({
    basicInformation: {
      prefix: "141",
      suffix: "ADRS",
      assetName: "",
      customCode: "",
      department: null,
      category: null,
      subcategory: null,
      modelNumber: null,
      serialNumber: "",
    },
    localAssignment: {
      assignmentType: null,
      assignee: null,
      store: null,
    },
    purchaseWarranty: {
      purchaseDate: undefined,
      purchasePrice: "",
      vendor: null,
      warrantyType: null,
      warrantyDuration: "",
      warrantyStartDate: undefined,
      warrantyEndDate: undefined,
      coverageType: null,
      warrantyNumber: "",
      hasExtendedWarranty: false,
      extendedWarrantyCost: "",
    },
    technicalSpecifications: {
      dimensions: "",
      weight: "",
      power: "",
      capacity: "",
      operatingSystem: "",
      customFields: "",
    },
    maintenanceService: {
      maintenanceFrequency: "",
      serviceProvider: "",
      serviceContract: "",
      criticalityLevel: "",
      maintenanceStartDate: undefined,
      maintenanceEndDate: undefined,
    },
    financialInformation: {
      depreciationMethod: "",
      usefulLife: "",
      salvageValue: "",
      currentValue: "",
      costCenter: "",
      budgetCode: "",
    },
    complianceSafety: {
      certification: "",
      safetyRequirements: "",
      complianceStatus: "",
      lastInspectionDate: undefined,
      nextInspectionDate: undefined,
    },
    assetTags: {
      tags: [],
    },
    media: {
      images: [],
      documents: [],
    },
  });

  const handleBasicInfoChange = (data: BasicInformationData) => {
    setFormData((prev) => ({
      ...prev,
      basicInformation: data,
    }));
  };

  // New handler for Local Assignment
  const handleLocalAssignmentChange = (data: LocalAssignmentData) => {
    setFormData((prev) => ({ ...prev, localAssignment: data }));
  };

  const handlePurchaseWarrantyChange = (data: PurchaseWarrantyData) => {
    setFormData((prev) => ({ ...prev, purchaseWarranty: data }));
  };

  const handleTechnicalSpecsChange = (data: TechnicalSpecificationsData) => {
    setFormData((prev) => ({ ...prev, technicalSpecifications: data }));
  };

  const handleMaintenanceServiceChange = (data: MaintenanceServiceData) => {
    setFormData(prev => ({ ...prev, maintenanceService: data }));
  };

  const handleComplianceSafetyChange = (data: ComplianceSafetyData) => {
    setFormData(prev => ({ ...prev, complianceSafety: data }));
  };

  const handleFinancialInformationChange = (data: FinancialInformationData) => {
    setFormData(prev => ({ ...prev, financialInformation: data }));
  };

  const handleAssetTagsChange = (data: AssetTagsData) => {
    setFormData(prev => ({ ...prev, assetTags: data }));
  };

  const handleMediaChange = (data: ImagesDocumentsData) => {
    setFormData(prev => ({ ...prev, media: data }));
  };

  const handleSubmit = () => {
    console.log("Full Form Data:", formData);
    // TODO: API call
  };

  return (
    <div className="max-w-[1400px] mx-auto mt-8 min-h-screen px-2 pb-20">
      {/* Header section with purple background matching the design */}
      <div className="bg-purple-950 text-white px-6 py-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 cursor-pointer hover:opacity-80" />
            <div>
              <h1 className="text-lg font-semibold">Add New Asset</h1>
              <p className=" text-xs">Create and configure a new asset in the system</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AssetPreview */}
        <div className="order-1 lg:order-2">
          <AssetPreviewSection data={formData} />
        </div>

        {/* Left column - Basic Information form */}
        <div className="order-2 lg:order-1 lg:col-span-2">
          <div className="space-y-5">

            <BasicInformationSection
              value={formData.basicInformation}
              onChange={handleBasicInfoChange}
            />

            <LocalAssignment_Section
              value={formData.localAssignment}
              onChange={handleLocalAssignmentChange}
            />

            <PurchaseWarrantyInformation
              value={formData.purchaseWarranty}
              onChange={handlePurchaseWarrantyChange}
            />

            <TechnicalSpecificationsSection
              value={formData.technicalSpecifications}
              onChange={handleTechnicalSpecsChange}
            />

            <MaintenanceServiceSection
              value={formData.maintenanceService}
              onChange={handleMaintenanceServiceChange}
            />

            <FinancialInformationSection
              value={formData.financialInformation}
              onChange={handleFinancialInformationChange}
            />

            <ComplianceSafetySection
              value={formData.complianceSafety}
              onChange={handleComplianceSafetyChange}
            />

            <AssetTagsSection
              value={formData.assetTags}
              onChange={handleAssetTagsChange}
            />

            <ImagesDocumentsSection
              value={formData.media}
              onChange={handleMediaChange}
            />

          </div>

          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-300">
            <CustomButton
              label="Cancel"
              variant="bordered"
              color="default"
              radius="md"
              size="md"
              className=" text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 font-medium"
              onClick={() => {
                navigate(-1)
              }}
            />
            <CustomButton
              label="Add Asset"
              type="submit"
              variant="solid"
              onPress={handleSubmit}
              size="md"
              radius="md"
              className=" text-white bg-purple-900 hover:bg-purple-800 font-medium"
            />
          </div>

        </div>
      </div>

    </div>
  )
}

export default AssetForm
