"use client";

import React, { ReactNode } from "react";
import Header from "./LandingHeader";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import "../globals.css";
import Image from "next/image";

const AppWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  // const path = pathname.includes
  return (
    <div className="relative">
      {!pathname.includes("admin") && (
        <div className="relative">
          <Header />
          <div className="top-[600px] sticky right-[4px] flex justify-center items-center gap-0 z-0 cursor-pointer hover:z-[999]">
            <Image
              src="/whatsapp.svg"
              alt=""
              width={168}
              height={68}
              className="absolute right-2"
            />
          </div>
          {children}
          <Footer />
        </div>
      )}
      {pathname.includes("admin") && <>{children}</>}
    </div>
  );
};

export default AppWrapper;
