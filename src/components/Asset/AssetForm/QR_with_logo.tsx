// src/components/QR_with_logo.tsx
import { useEffect, useRef, useMemo } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRWithLogoProps {
  url: string;
  logo?: string;
  size?: number; 
}

const QR_with_logo = ({ url, logo, size = 120 }: QRWithLogoProps) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const qrCode = useMemo(
    () =>
      new QRCodeStyling({
        width: size,
        height: size,
        type: "svg",
        data: url,
        image: logo,
        dotsOptions: {
          color: "#000000",
          type: "rounded",
        },
        cornersSquareOptions: {
          color: "#000000", // optional: ensures corner squares match dot color
          type: "square",
        },
        backgroundOptions: {
          color: "#ffffff",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 2,
        },
      }),
    [url, logo, size]
  );

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  return <div ref={qrRef} />;
};

export default QR_with_logo;