import { Card, CardHeader, CardBody, Image } from "@heroui/react";

interface ImageCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: any;
  description?: string;
  imageWidth?: number;
  className?: string;
}

export default function ImageCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  description,
}: ImageCardProps) {
  return (
    <Card className="flex flex-col h-full bg-gray-100 shadow-md hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <CardHeader className="pb-2 pt-4 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold text-gray-600">{subtitle}</p>
        <small className="text-default-500">{description}</small>
        <h4 className="font-bold text-medium line-clamp-2">{title}</h4>
      </CardHeader>

      <CardBody className="py-2 px-4 flex justify-center">
        <div className="w-full h-48 overflow-hidden rounded-xl">
          <Image
            alt={imageAlt}
            className="w-full h-full object-cover"
            src={imageSrc}
          />
        </div>
      </CardBody>
    </Card>
  );
}
