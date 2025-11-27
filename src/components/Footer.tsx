import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      Morning Coffee Labs © {year}
    </footer>
  );
};

export default Footer;
