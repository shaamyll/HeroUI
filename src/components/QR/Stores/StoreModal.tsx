import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@heroui/react";
import { Tag, Calendar, QrCode, Shield, ShieldOff, Pencil, Eye } from "lucide-react";

// TypeScript interfaces
export interface StoreData {
  name: string;
  address: string;
  slug: string;
  createdAt: string;
  avatarUrl: string;
  isBlocked?: boolean;
}

interface QRStoreCardProps {
  storeData: StoreData;
  onQrCode?: (storeData: StoreData) => void;
  onView?: (storeData: StoreData) => void;
  onEdit?: (storeData: StoreData) => void;
  onToggleStatus?: (storeData: StoreData) => void;
}

const QRStoreCard: React.FC<QRStoreCardProps> = ({ 
  storeData,
  onQrCode,
  onView,
  onEdit,
  onToggleStatus
}) => {
  const [isBlocked, setIsBlocked] = React.useState(storeData?.isBlocked || false);

  const handleQrCode = () => {
    if (onQrCode) {
      onQrCode(storeData);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(storeData);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(storeData);
    }
  };

  const handleToggleStatus = () => {
    const newStatus = !isBlocked;
    setIsBlocked(newStatus);
    if (onToggleStatus) {
      onToggleStatus(storeData);
    }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <CardHeader className="justify-between p-3 pb-1">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-shrink-0">
            <Avatar
              isBordered
              radius="lg"
              size="sm"
              src={storeData.avatarUrl}
              className="flex-shrink-0 w-10 h-10"
            />
            <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${isBlocked ? 'bg-red-500' : 'bg-green-500'} ${!isBlocked && 'animate-pulse'}`}></div>
          </div>
          <div className="flex flex-col gap-0.5 items-start justify-center flex-1 min-w-0">
            <h4 className="text-sm font-medium leading-tight text-default-700 truncate w-full">
              {storeData.name}
            </h4>
            <div className="flex items-center gap-1 w-full">
              <Tag size={12} className="text-orange-500 flex-shrink-0" />
              <span className="text-xs text-gray-500 truncate">
                {storeData.address}
              </span>
            </div>
          </div>
          <button
            onClick={handleQrCode}
            className="ml-1 flex-shrink-0 p-1.5 rounded-md hover:bg-orange-50 transition-colors z-10 self-start"
          >
            <QrCode size={16} className="text-orange-500" />
          </button>
        </div>
      </CardHeader>

      <CardBody className="p-3 pt-1 pb-2 text-small">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          <Tag size={14} className="text-orange-500 flex-shrink-0" />
          <span className="text-xs">
            <span className="font-medium text-gray-700">{storeData.slug}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={14} className="text-orange-500 flex-shrink-0" />
          <span className="text-xs">
            <span className="font-medium text-gray-700">{storeData.createdAt}</span>
          </span>
        </div>
      </CardBody>

      <CardFooter className="gap-1.5 p-3 pt-0 flex-wrap justify-end">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          color="default"
          onPress={handleView}
          className="min-w-7 w-7 h-7 bg-gray-100 hover:bg-gray-200"
        >
          <Eye size={14} />
        </Button>

        <button
          onClick={handleEdit}
          className="min-w-[28px] w-7 h-7 rounded-md bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
        >
          <Pencil size={14} />
        </button>

        <button
          onClick={handleToggleStatus}
          className={`min-w-[28px] w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
            isBlocked 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isBlocked ? <Shield size={14} /> : <ShieldOff size={14} />}
        </button>
      </CardFooter>
    </Card>
  );
}

// Usage Demo Component
// export default function StoresDemo() {
//   const stores: StoreData[] = [
//     {
//       name: "Ishbiliyah-Al Sahaba Rd–3208",
//       address: "The Coffee address for trading company",
//       slug: "ishbiliyah-al-sahaba",
//       createdAt: "19 April 2025",
//       avatarUrl: "https://heroui.com/avatars/avatar-1.png",
//       isBlocked: false
//     },
//     {
//       name: "Downtown Coffee Hub",
//       address: "Main Street Business District",
//       slug: "downtown-coffee-hub",
//       createdAt: "15 March 2025",
//       avatarUrl: "https://heroui.com/avatars/avatar-2.png",
//       isBlocked: false
//     },
//     {
//       name: "North Plaza Branch",
//       address: "North Plaza Shopping Center",
//       slug: "north-plaza-branch",
//       createdAt: "22 February 2025",
//       avatarUrl: "https://heroui.com/avatars/avatar-3.png",
//       isBlocked: true
//     }
//   ];

//   const handleQrCode = (store: StoreData): void => {
//     alert(`Opening QR Code for: ${store.name}`);
//   };

//   const handleView = (store: StoreData): void => {
//     alert(`Viewing details for: ${store.name}`);
//   };

//   const handleEdit = (store: StoreData): void => {
//     alert(`Editing: ${store.name}`);
//   };

//   const handleToggleStatus = (store: StoreData): void => {
//     const newStatus = !store.isBlocked;
//     console.log(`${store.name} status: ${newStatus ? "Disabled" : "Enabled"}`);
//     alert(`${store.name} ${newStatus ? "disabled" : "enabled"} successfully!`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
//           <p className="text-gray-600 mt-2">
//             Reusable QRStoreCard component with View, Edit, and Toggle actions
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {stores.map((store) => (
//             <QRStoreCard
//               key={store.slug}
//               storeData={store}
//               onQrCode={handleQrCode}
//               onView={handleView}
//               onEdit={handleEdit}
//               onToggleStatus={handleToggleStatus}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

 export { QRStoreCard };