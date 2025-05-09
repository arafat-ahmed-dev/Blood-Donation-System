// components/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={2 * 60}>
      <main>
        {children}
      </main>
    </SessionProvider>
  );
}
