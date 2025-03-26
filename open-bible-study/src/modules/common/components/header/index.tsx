"use client";
import { SidebarTrigger } from "../ui/sidebar";
import { useHeaderConfig } from "./use-header-config";

export function Header() {
  const { title, slot } = useHeaderConfig();

  return (
    <header className="bg-white w-full p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="hover:cursor-pointer" />
        {title && <h3 className="font-semibold text-xl">{title}</h3>}
      </div>

      {slot && <div>{slot}</div>}
    </header>
  );
}
