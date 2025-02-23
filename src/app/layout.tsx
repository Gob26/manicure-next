// src/app/layout.tsx
import "@/styles/_globals.scss";
import Sidebar from '@/components/sideBar/components/SidebarDynamic';
import { ThemeProvider } from "@/shared/context/ThemeContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import LayoutComponent from "@/components/layout/Layout";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthInitializer } from "@/components/screens/auth/AuthInitializer";
// import { AuthProvider } from '@/providers/AuthProvider'; // Убираем AuthProvider

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Маникюр - Салоны красоты и мастера маникюра",
    description: "Найдите лучшие салоны маникюра и квалифицированных мастеров в вашем городе. Широкий выбор услуг и удобный поиск.",
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
                        {/* <AuthProvider> {/* Убираем AuthProvider */}
                            <LayoutComponent title={metadata.title} description={metadata.description}>
                                <Sidebar />
                                {children}
                            </LayoutComponent>
                        {/* </AuthProvider> {/* Убираем AuthProvider */}
                        <AuthInitializer /> {/* Добавляем AuthInitializer для инициализации Jotai */}
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}