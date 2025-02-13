// src/components/layout/RootLayout.tsx
import Sidebar from '@/components/sideBar/components/SidebarDynamic'; // Импортируем динамическую версию Sidebar
import { ThemeProvider } from "@/shared/context/ThemeContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Layout from "@/components/layout/Layout";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Маникюр",
  description: "Маникюр и не только. В нашем каталоге есть все!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <ReactQueryProvider>
            <Layout title="Салоны и не только">
              <Sidebar /> {/* Теперь используем динамически загруженный сайдбар */}
              {children}
            </Layout>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
