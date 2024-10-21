import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeComponentProps {
  url: string;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ url }) => {
  const downloadQRCode = (): void => {
    const svg = document.getElementById("qr-code") as SVGSVGElement | null;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "payment-qr-code";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className=" bg-white">
        <QRCodeSVG
          id="qr-code"
          value={url}
          size={256}
          level="H"
          includeMargin={true}
        />
      </div>
      <button
        onClick={downloadQRCode}
        className="w-full bg-lightMode-button-background dark:bg-darkMode-button-background text-lightMode-button-text dark:text-darkMode-button-text py-2 px-4 rounded-full focus:outline-none transition-colors duration-300 text-base dark:hover:bg-darkMode-button-background/90 hover:bg-lightMode-button-background/90 disabled:opacity-40 flex items-center justify-center"
      >
        Download QR Code
      </button>
      <p className=" text-sm">
        or click
        {" "}<a href={url} target="_blank" className=" text-lightMode-brand-accent hover:underline ">here</a>
      </p>
    </div>
  );
};

export default QRCodeComponent;
