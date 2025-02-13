'use client'
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';
import { useAtom } from 'jotai';
import styles from './Sidebar.module.scss';
import { sidebarOpenAtom } from '@/store/sideBarAtom';
import { Menu } from './menu/Menu';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useAtom(sidebarOpenAtom);
  
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <LazyMotion features={domAnimation}>
      <m.aside
        className={styles.sidebar}
        animate={{
          width: isCollapsed ? "56px" : "224px",
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <button
          className={styles.toggle}
          onClick={handleToggle}
        >
          {isCollapsed ? <SquareChevronLeft /> : <SquareChevronRight />}
        </button>
        <Menu />
      </m.aside>
    </LazyMotion>
  );
}