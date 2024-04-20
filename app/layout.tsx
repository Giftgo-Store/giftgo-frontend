import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";
import Nav from "./components/Nav";
import { Header } from "./components/Header";

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
    <html lang="en">
      <body
        className={`${inter.className} absolute h-screen w-full bg-[#FAFAFA]`}
      >
        <Providers>
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
