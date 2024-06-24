import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/providers";
import AppWrapper from "./components/AppWrapper";
import { RefetchProvider } from "./context/refetchContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        className={`${inter.className} absolute h-screen w-full`}
        suppressHydrationWarning
      >
        <RefetchProvider>
          <Providers>
            <AppWrapper>{children}</AppWrapper>
            <ToastContainer />
          </Providers>
        </RefetchProvider>
      </body>
    </html>
  );
}
