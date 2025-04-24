import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Roktoshetu",
    default: "Roktoshetu - Blood Donation Platform in Bangladesh",
  },
  description: "Rokto Shetu is a real-time free platform to help blood searchers connect voluntary blood donors around Bangladesh.",
  keywords: ["blood donation", "blood donors", "Bangladesh", "voluntary donors", "blood donation platform", "blood bank"],
  authors: [{ name: "Rokto Shetu Shetu Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
