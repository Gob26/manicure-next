import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/index';
import { toggleSidebar as toggleSidebarAction } from '../../../../store/sidebar/sidebarSlice';
import { Menu } from "./menu/Menu";
import { m, LazyMotion, domAnimation } from 'framer-motion';
import styles from './Sidebar.module.scss';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';

export default function Sidebar() {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);

  const handleToggle = () => {
    dispatch(toggleSidebarAction());
  };

  return (
    <LazyMotion features={domAnimation}>
    <m.aside
      className={styles.sidebar}
      animate={{
        width: isCollapsed ? "56px" : "224px", // Соответствует классу w-56 (14rem = 224px)
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <button
        className={styles.toggle}
        onClick={handleToggle}
      >
        {isCollapsed ? <SquareChevronLeft/> : <SquareChevronRight/>}
      </button>
      <Menu />
    </m.aside>
    </LazyMotion>
  );
}
