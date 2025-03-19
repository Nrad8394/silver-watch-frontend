import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/custom/QueryProvider"; // Import new wrapper
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Silver Watch",
  description: "A modern watch store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background`}>
          <QueryProvider> {/* Wrap in QueryProvider */}
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
                <Toaster richColors  expand={true} position="bottom-right" />
              </ThemeProvider>
            </AuthProvider>
          </QueryProvider>
      </body>
    </html>
  );
}
