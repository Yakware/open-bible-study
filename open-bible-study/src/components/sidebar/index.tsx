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
  ChevronsUpDownIcon,
  NotebookPenIcon,
  PersonStandingIcon,
  Users2Icon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { OpenbibleStudyIcon } from "../icons/open-bible-study-icon";
import { useUser } from "@/lib/context/auth-context";
import { UserAvatar } from "../user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const menuItems = [
  {
    path: "/study",
    name: "Study",
    icon: <BookOpenIcon />,
    disabled: false,
  },
  {
    path: "/study-groups",
    name: "Study Groups",
    icon: <Users2Icon />,
    disabled: true,
  },
  {
    path: "/study-plans",
    name: "Study Plans",
    icon: <BookHeartIcon />,
    disabled: true,
  },
  {
    path: "/notes",
    name: "Notes",
    icon: <NotebookPenIcon />,
    disabled: true,
  },
  {
    path: "/community",
    name: "Community",
    icon: <PersonStandingIcon />,
    disabled: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useUser();

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
                  <SidebarMenuButton
                    size="lg"
                    asChild={!item.disabled}
                    disabled={item.disabled}
                  >
                    {item.disabled ? (
                      <>
                        {item.icon} {item.name}
                      </>
                    ) : (
                      <Link href={item.path}>
                        {item.icon} {item.name}
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-full">
              <UserAvatar name={user.name} />
              <p className="text-sm truncate">
                {user.email}
                {user.email}
              </p>
              <ChevronsUpDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>Profile</DropdownMenuItem>
              <DropdownMenuItem disabled>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a
                href="https://github.com/Yakware/open-bible-study"
                target="_blank"
              >
                GitHub
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="https://discord.gg/rqs7Auq2Sy" target="_blank">
                Support
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
