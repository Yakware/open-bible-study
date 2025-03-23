import { APP_NAME } from "@/lib/constants";
import {
  Sidebar,
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
import { logout } from "@/modules/auth/actions";
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
import { WordwayIcon } from "../../icons/wordway-icon";

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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-center gap-0">
        <WordwayIcon size={30} />
        <h1 className="text-primary font-bold text-2xl px-1">{APP_NAME}</h1>
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
    </Sidebar>
  );
}
