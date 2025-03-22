import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/modules/common/components/ui/navigation-menu";
import { useQueryState } from "nuqs";
import { useChapters } from "@/lib/context/study-context";

export function ChapterNavigation() {
  const chapters = useChapters();
  const [chapterNumber, setChapterNumber] = useQueryState("chapter", {
    shallow: false,
  });

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        {chapterNumber ? chapterNumber : "Chapter"}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-6 gap-3 p-4 md:w-[400px] lg:w-[500px]">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <NavigationMenuLink
                onClick={() => setChapterNumber(chapter.number)}
              >
                {chapter.number}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
