import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus HMS",
  description: "AI-Powered Hospital Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F5F7FA] text-[#1E293B] antialiased`}>
        <div className="flex min-h-screen">
          {/* Main Sidebar */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col ml-64 min-h-screen overflow-hidden">
            {/* Top Navigation */}
            <Header />
            
            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
