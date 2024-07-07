"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Nav from "../../components/navigation/Nav";
import { Providers } from "../../providers/providers";
import { Header } from "../../components/headers/Header";
import { Suspense } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname= usePathname()
  return (
    <Providers>
      <div className="flex bg-[#FAFAFA]" suppressHydrationWarning>
        {pathname !== "/admin/auth/login" && <Nav />}
        <div className="h-screen w-full overflow-y-auto">
          <div className="sm:px-6 px-3 flex flex-col">
            {pathname !== "/admin/auth/login" && <Header />}
            <div suppressHydrationWarning className="pt-6">
              <Suspense>{children}</Suspense>
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
}
