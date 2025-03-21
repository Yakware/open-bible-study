import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/modules/common/components/ui/navigation-menu";
import { parseAsInteger, useQueryState } from "nuqs";
import { useChapters } from "@/lib/context/study-context";

export function ChapterNavigation() {
  const chapters = useChapters();
  const [chapterId, setChapterId] = useQueryState("chapter", {
    ...parseAsInteger,
    shallow: false,
  });

  const selectedChapter = chapters.find((chapter) => chapter.id === chapterId);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        {selectedChapter ? selectedChapter.number : "Chapter"}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-6 gap-3 p-4 md:w-[400px] lg:w-[500px]">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <NavigationMenuLink onClick={() => setChapterId(chapter.id)}>
                {chapter.number}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
