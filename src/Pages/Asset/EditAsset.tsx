import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssetForm, { type AssetFormData } from "@/Pages/Asset/AssetForm";

export default function EditAsset() {
  const { id } = useParams();
  const [assetData, setAssetData] = useState<AssetFormData | null>(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAsset = async () => {
//       try {
//         const data = await getAssetById(id!);
//         setAssetData(data);
//       } catch (error) {
//         console.error("Failed to load asset:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchAsset();
//   }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!assetData) return <div>Asset not found</div>;

  return (
    <AssetForm initialData={assetData} isEditing={true} />
  )
}