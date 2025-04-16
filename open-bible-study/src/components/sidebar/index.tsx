"use client";
import { APP_NAME } from "@/lib/constants";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { logout } from "@/features/auth/actions";
import Link from "next/link";
import {
  BookHeartIcon,
  BookOpenIcon,
  NotebookPenIcon,
  PersonStandingIcon,
  Users2Icon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { OpenbibleStudyIcon } from "../icons/open-bible-study-icon";

const menuItems = [
  {
    path: "/study",
    name: "Study",
    icon: <BookOpenIcon />,
  },
  {
    path: "/study-groups",
    name: "Study Groups",
    icon: <Users2Icon />,
  },
  {
    path: "/study-plans",
    name: "Study Plans",
    icon: <BookHeartIcon />,
  },
  {
    path: "/notes",
    name: "Notes",
    icon: <NotebookPenIcon />,
  },
  {
    path: "/community",
    name: "Community",
    icon: <PersonStandingIcon />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <ShadcnSidebar>
      <SidebarHeader className="flex flex-row items-center justify-center gap-0">
        <OpenbibleStudyIcon size={30} />
        <h1 className="text-primary font-bold text-xl px-1">{APP_NAME}</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem
                  key={item.path}
                  className={cn(pathname === item.path && "font-bold")}
                >
                  <SidebarMenuButton size="lg" asChild>
                    <Link href={item.path}>
                      {item.icon} {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={logout}>Logout</Button>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
