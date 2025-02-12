import React from "react";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"; // Importerar ikoner

function AppHeader({ hideSidebar = false }) {
  return (
    <div className="p-4 shadow-sm flex items-center justify-between w-full">
      <Image
        src="/DLCLOGA.png"
        alt="logo"
        width={100}
        height={100}
        layout="intrinsic"
        quality={100}
        className="w-[80px] h-[80px] rounded-md"
      />

      <div className="flex space-x-6">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-[#E1306C] hover:text-[#C13584]"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-[#1877F2] hover:text-[#0E56A5]"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-[#FF0000] hover:text-[#C4302B]"
        >
          <FaYoutube />
        </a>
      </div>
    </div>
  );
}

export default AppHeader;
