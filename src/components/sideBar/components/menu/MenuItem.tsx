'use client'
import { sidebarOpenAtom } from "@/store/sideBarAtom";
import { IMenuItem } from "./menu.data";
import { useAtom } from 'jotai';

export function MenuItem({ item }: { item: IMenuItem }) {
  const [isCollapsed] = useAtom(sidebarOpenAtom);
  
  return (
    <a href={item.link} rel="noopener noreferrer" target="_blank">
      <item.icon />
      {!isCollapsed && <span>{item.name}</span>}
    </a>
  );
}