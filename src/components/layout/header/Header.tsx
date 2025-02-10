'use client';  

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './Header.module.scss';

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/cities", label: "Города" },
  { href: "/masters", label: "Мастера" },
  { href: "/salons", label: "Салоны" },
];

const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      {/* Логотип */}
      <div className={styles.logo}>Manicure</div>
      
      {/* Навигация */}
      <nav className={styles.navLinks}>
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? styles.active : ""}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
