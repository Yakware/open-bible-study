import {
  NavigationMenu,
  NavigationMenuList,
} from "@/modules/common/components/ui/navigation-menu";
import { VersionNavigation } from "./version-navigation";
import { BookNavigation } from "./book-navigation";
import { ChapterNavigation } from "./chapter-navigation";

export function BibleNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <VersionNavigation />
        <BookNavigation />
        <ChapterNavigation />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
