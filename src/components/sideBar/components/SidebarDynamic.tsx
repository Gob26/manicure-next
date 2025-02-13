"use client";  // Добавляем директиву для клиента

// src/components/sideBar/components/SidebarDynamic.tsx
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });

export default Sidebar;

