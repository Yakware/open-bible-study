import {
  NavigationMenu,
  NavigationMenuList,
} from "@/modules/common/components/ui/navigation-menu";
import { VersionNavigation } from "./version-navigation";
import { BookNavigation } from "./book-navigation";
import { ChapterNavigation } from "./chapter-navigation";
import { HomeButton } from "./home-button";

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
