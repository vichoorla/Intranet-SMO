import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import { CrudProvider } from "./context/CrudContext";

import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intranet SMO",
  description: "Sistema de gestión de consultas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <AuthProvider>
          <CrudProvider>
            <div
              style={{
                display: "flex",
                minHeight: "100vh",
              }}
            >
              <Sidebar />

              <main
                style={{
                  flex: 1,
                  padding: "25px",
                  background: "#f4f6f9",
                }}
              >
                {children}
              </main>
            </div>
          </CrudProvider>
        </AuthProvider>
      </body>
    </html>
  );
}