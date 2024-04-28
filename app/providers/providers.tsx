// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
      const pathname = usePathname();
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
}
