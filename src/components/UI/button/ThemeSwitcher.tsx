import { ThemeContext } from '@/shared/context/ThemeContext';
import React, { useContext, useEffect } from 'react';
import './ThemeSwitcher.module.scss'; // Подключаем SCSS

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div
      className={`ios-toggle ${theme === 'dark' ? 'dark' : ''} cursor-pointer relative`}
      onClick={toggleTheme}
    >
      <div className="toggle-circle absolute top-0 left-0 transition-transform"></div>
    </div>
  );
};

export default ThemeToggleButton;
