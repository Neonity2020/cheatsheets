import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Cheat Sheets",
  description: "A collection of cheat sheets for various topics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
