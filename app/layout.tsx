import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter";

export const metadata: Metadata = {
  title: "Zook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
