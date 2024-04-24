import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Nav from "../../components/Nav";
import { Providers } from "../../providers/providers";
import { Header } from "../../components/Header";

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
          <div className="flex">
            <Nav />
            <div className="h-screen w-full overflow-y-auto">
              <div className="sm:px-6 px-3 flex flex-col">
                <Header />
                <div className="pt-6">{children}</div>
              </div>
            </div>
          </div>
        </Providers>
  );
}
