import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@/store/store";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Email Tester",
  description: "Email Tester",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#27282D]`}>
        <main>
          <AppProvider>{children}</AppProvider>
          <Toaster position="top-right" richColors />
        </main>
      </body>
    </html>
  );
}
