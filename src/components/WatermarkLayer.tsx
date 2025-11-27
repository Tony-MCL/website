import React from "react";

const assetBase = import.meta.env.BASE_URL || "/";
const watermarkUrl = `${assetBase}mcl-watermark.svg`;

const WatermarkLayer: React.FC = () => {
  return (
    <div className="watermark-layer">
      <img src={watermarkUrl} alt="MCL watermark" />
    </div>
  );
};

export default WatermarkLayer;
