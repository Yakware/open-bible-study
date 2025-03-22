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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-primary font-bold text-2xl px-1">{APP_NAME}</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/study">
                    <BookOpenIcon /> Study
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/study-groups">
                    <Users2Icon /> Study Groups
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/study-plans">
                    <BookHeartIcon />
                    Study Plans
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/notes">
                    <NotebookPenIcon />
                    Notes
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/community">
                    <PersonStandingIcon />
                    Community
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
