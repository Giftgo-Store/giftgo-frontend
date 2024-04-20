import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { Providers } from "./providers/providers";
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
          <div className="flex">
            <Nav />
            <div className="h-screen w-full overflow-y-auto">
              <div className="sm:px-6 px-3 flex flex-col">
                <Header />
                <div className="py-6">{children}</div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
