import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Showcase Studio",
  description: "Code Showcase Studio",
  authors: [
    {
      name: "Klub Pemrograman TI POLNES",
      url: "https://github.com/pemrogrammer",
    },
  ],
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
