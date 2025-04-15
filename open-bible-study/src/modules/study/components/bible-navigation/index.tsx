import { VersionNavigation } from "./version-navigation";
import { BookNavigation } from "./book-navigation";
import { ChapterNavigation } from "./chapter-navigation";
import { HomeButton } from "./home-button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function BibleNavigation() {
  return (
    <div className="flex items-center gap-1">
      <HomeButton />
      <NavigationMenu>
        <NavigationMenuList>
          <VersionNavigation />
          <BookNavigation />
          <ChapterNavigation />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
