import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/modules/common/components/ui/navigation-menu";
import { useChapters } from "@/lib/context/study-context";
import { useChapterNumber } from "./hooks/use-chapter-number";
import { useBookName } from "./hooks/use-book-name";

export function ChapterNavigation() {
  const chapters = useChapters();
  const [chapterNumber, setChapterNumber] = useChapterNumber();
  const [bookName] = useBookName();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="rounded-4xl" disabled={!bookName}>
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
