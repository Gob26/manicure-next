import "@/styles/_globals.scss"; // Глобальные стили здесь!
import Sidebar from '@/components/sideBar/components/SidebarDynamic';
import { ThemeProvider } from "@/shared/context/ThemeContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import LayoutComponent from "@/components/layout/Layout"; // Переименовали импорт, чтобы не путать с самим layout.tsx
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Маникюр - Салоны красоты и мастера маникюра", // Общий title для сайта
    description: "Найдите лучшие салоны маникюра и квалифицированных мастеров в вашем городе. Широкий выбор услуг и удобный поиск.", // Общий description
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
                        <LayoutComponent title={metadata.title} description={metadata.description}> {/* Используем LayoutComponent и передаем общие title и description */}
                            <Sidebar />
                            {children}
                        </LayoutComponent>
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}