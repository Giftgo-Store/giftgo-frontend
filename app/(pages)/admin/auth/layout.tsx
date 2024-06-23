import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers/providers";
import { Suspense } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giftgo",
  description: "dropshipping",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
              <Suspense>{children}</Suspense>    
    </Providers>
  );
}
