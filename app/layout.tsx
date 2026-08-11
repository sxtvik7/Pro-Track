import { Geist } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={geist.variable}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}