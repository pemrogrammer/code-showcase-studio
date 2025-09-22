import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import Providers from "./providers";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Code Showcase Studio',
  description: 'Code Showcase Studio',
  authors: [
    {
      name: 'Klub Pemrograman TI POLNES',
      url: 'https://github.com/pemrogrammer',
    },
  ],
}


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
        {/* if you want use tanstack-query */}
				{/* <Providers> */}
          <>
            {children}
            <Toaster richColors position="top-center" />
          </>
				{/* </Providers> */}
			</body>
		</html>
	);
}
