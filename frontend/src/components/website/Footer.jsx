import React from "react";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer
        className="bg-[#051D41] text-[#F3F4F4] py-8 text-center border-t-2 border-[#B5992B]"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <p className="text-sm md:text-base font-medium">
          © 2026 GoldenBear Jewelry ✦ All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Crafted with elegance in Porac, Pampanga
        </p>
      </footer>
    </>
  );
};

export default Footer;
