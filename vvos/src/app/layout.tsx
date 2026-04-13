import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VVOS — Via Vinho Operating System",
  description: "Internal operations dashboard for Via Vinho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="h-full flex">
        <Sidebar />
        <main className="flex-1 bg-zinc-50 overflow-auto">{children}</main>
      </body>
    </html>
  );
}
