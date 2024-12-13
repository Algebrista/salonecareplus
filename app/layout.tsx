import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";


import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Salone CarePlus",
  description: "A Healthcare Management System for Sierra Leone",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
        >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem
        disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
