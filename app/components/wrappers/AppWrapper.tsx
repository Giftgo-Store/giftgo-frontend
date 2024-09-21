"use client";

import React, { ReactNode } from "react";
import Header from "../headers/LandingHeader";
import Footer from "../footer/Footer";
import { usePathname } from "next/navigation";
import "../../globals.css";
import Image from "next/image";
import Link from "next/link";

const AppWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <div className="relative" suppressHydrationWarning>
      {!pathname?.includes("admin") && (
        <div className="relative">
          <Header />
          <Link
            href="https://wa.me/2349114140300?text=Hello+i+want+to+make+enquiry,+My+Name+is"
            target="_blank"
            rel="noreferrer"
            className="top-[650px] 2xl:bottom-[30%] sticky right-[4px] flex justify-center items-center gap-0 cursor-pointer z-[9999]"
          >
            <Image
              src="/whatsapp2.png"
              alt=""
              width={168}
              height={68}
              className="absolute right-2"
            />
          </Link>
            {children}
          <Footer />
        </div>
      )}
      {pathname?.includes("admin") && <div>{children}</div>}
    </div>
  );
};

export default AppWrapper;
