'use client';

import { FC, useState, useEffect, useContext } from "react";
import { ThemeContext } from '@/shared/context/ThemeContext';
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './Header.module.scss';
import ThemeSwitcher from "@/components/UI/button/ThemeSwitcher";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/cities", label: "Города" },
  { href: "/masters", label: "Мастера" },
  { href: "/salons", label: "Салоны" },
];

const Header: FC = () => {
  const { theme } = useContext(ThemeContext);
  const pathname = usePathname();

  // Хук для отслеживания, был ли компонент уже смонтирован на клиенте
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Сначала показываем без изменения класса темы, чтобы избежать ошибки гидратации
  if (!mounted) {
    return null; // Можно отобразить загрузочный индикатор или просто вернуть null
  }

  return (
    <header className={`${styles.header} flex items-center justify-between px-8 py-2 bg-gray-900 text-white shadow-lg`}>
      {/* Логотип */}
      <div className="text-2xl font-bold text-red-600">Manicure</div>
      
      {/* Навигация */}
      <nav className="flex gap-4">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-white text-sm font-medium py-2 px-4 rounded-md transition-all duration-300 ${pathname === href ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Кнопка переключения темы */}
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
