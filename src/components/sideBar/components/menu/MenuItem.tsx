'use client'
import { sidebarOpenAtom } from "@/store/sideBarAtom";
import { IMenuItem } from "./menu.data";
import { useAtom } from 'jotai';
import Link from "next/link";

export function MenuItem({ item }: { item: IMenuItem }) {
  const [isCollapsed] = useAtom(sidebarOpenAtom);
  
  return (
    <Link href={item.link} rel="noopener noreferrer">
      <item.icon />
      {!isCollapsed && <span>{item.name}</span>}
    </Link>
  );
}