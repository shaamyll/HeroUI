import {Card, CardHeader, CardBody, Image} from "@heroui/react";


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
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{subtitle}</p>
        <small className="text-default-500">{description}</small>
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={imageAlt}
          className="object-cover rounded-xl h-48"
          src={imageSrc}
          width={270}
        />
      </CardBody>
    </Card>
  );
}
