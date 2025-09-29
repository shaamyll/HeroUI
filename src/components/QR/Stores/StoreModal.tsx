import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@heroui/react";
import { Tag, Calendar, QrCode, ToggleLeft, ToggleRight, Pencil } from "lucide-react";

export default function QRStoresModal() {
  const [isBlocked, setIsBlocked] = React.useState(false);
  
  // Sample store data (extracted from first code structure)
  const storeData = {
    name: "Ishbiliyah-Al Sahaba Rd–3208",
    address: "The Coffee address for trading company",
    slug: "ishbiliyah-al-sahaba",
    createdAt: "19 April 2025",
    itemsCount: 24,
    avatarUrl: "https://heroui.com/avatars/avatar-1.png"
  };

  const handleQrCode = () => {
    console.log("Show QR Code for:", storeData.slug);
  };

  const handleEdit = () => {
    console.log("Edit store:", storeData.name);
  };

  const handleToggleStatus = () => {
    setIsBlocked(!isBlocked);
    console.log("Toggle status:", !isBlocked ? "Disabled" : "Enabled");
  };

  return (
    <Card className="max-w-[380px] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="justify-between pb-2">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-shrink-0">
            <Avatar
              isBordered
              radius="lg"
              size="md"
              src={storeData.avatarUrl}
              className="flex-shrink-0"
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isBlocked ? 'bg-red-500' : 'bg-green-500'} ${!isBlocked && 'animate-pulse'}`}></div>
          </div>
          <div className="flex flex-col gap-1 items-start justify-center flex-1 min-w-0">
            <h4 className="text-small font-semibold leading-tight text-default-700 truncate">
              {storeData.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Tag size={12} className="text-orange-500 flex-shrink-0" />
              <span className="text-xs text-default-500 truncate">
                {storeData.address}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleQrCode}
          className="ml-2 flex-shrink-0 p-2 rounded-md hover:bg-orange-50 transition-colors"
        >
          <QrCode size={16} className="text-orange-500" />
        </button>
      </CardHeader>

      <CardBody className="px-4 py-3 text-small gap-2">
        <div className="flex items-center gap-2 text-default-500">
          <Tag size={16} className="text-orange-500 flex-shrink-0" />
          <span className="text-tiny">Store Code: <span className="font-medium text-default-700">{storeData.slug}</span></span>
        </div>
        <div className="flex items-center gap-2 text-default-500">
          <Calendar size={16} className="text-orange-500 flex-shrink-0" />
          <span className="text-tiny">Created: <span className="font-medium text-default-700">{storeData.createdAt}</span></span>
        </div>
      </CardBody>

      <CardFooter className="gap-2 pt-2 flex-wrap">
        <div className="flex gap-1 items-center px-3 py-1 bg-default-100 rounded-full">
          <p className="font-semibold text-default-700 text-tiny">{storeData.itemsCount}</p>
          <p className="text-default-500 text-tiny">Items</p>
        </div>

        <div className="flex-1" />

        <Button
          isIconOnly
          size="sm"
          variant="flat"
          color="warning"
          onPress={handleEdit}
          className="min-w-unit-8 w-8 h-8"
        >
          <Pencil size={16} />
        </Button>

        <Button
          isIconOnly
          size="sm"
          variant="flat"
          color={isBlocked ? "success" : "danger"}
          onPress={handleToggleStatus}
          className="min-w-unit-8 w-8 h-8"
        >
          {isBlocked ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
        </Button>
      </CardFooter>
    </Card>
  );
}