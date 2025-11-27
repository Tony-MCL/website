import React from "react";

const watermarkUrl = new URL(
  "mcl-watermark.svg",
  import.meta.env.BASE_URL
).href;

const WatermarkLayer: React.FC = () => {
  return (
    <div className="watermark-layer">
      <img src={watermarkUrl} alt="MCL watermark" />
    </div>
  );
};

export default WatermarkLayer;
