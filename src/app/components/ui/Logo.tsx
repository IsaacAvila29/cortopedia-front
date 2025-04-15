import React from "react";

interface LogoProps {
  height?: string | number;
  width?: string | number;
}

const Logo: React.FC<LogoProps> = ({ height = "auto", width = "auto" }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img src={"/Logo.png"} style={{ height, width }} alt="Logo" />
    </div>
  );
};

export default Logo;
