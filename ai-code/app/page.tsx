"use client";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/dance.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-4 left-4 flex flex-col items-start gap-4">
        <Image
          src="/DLCLOGA.png"
          alt="logo"
          width={120}
          height={120}
          className="rounded-md"
        />

        <a
          className="inline-flex justify-center items-center gap-x-3 
          bg-gradient-to-tl from-blue-600 to-violet-600 
          hover:from-violet-600 hover:to-blue-600 
          hover:text-violet-100
          border border-transparent text-white text-sm font-medium 
          rounded-md focus:outline-none focus:ring-2 focus:ring-white 
          py-3 px-6 transition-all duration-300"
          href="/dashboard"
        >
          Start the Ai
        </a>
      </div>
    </div>
  );
}
