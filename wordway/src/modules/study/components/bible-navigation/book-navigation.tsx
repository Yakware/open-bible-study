import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/modules/common/components/ui/navigation-menu";
import { useBooks } from "@/lib/context/study-context";
import { useBookName } from "./hooks/use-book-name";
import { useChapterNumber } from "./hooks/use-chapter-number";
import { useVersionName } from "./hooks/use-version-name";

export function BookNavigation() {
  const books = useBooks();
  const [bookName, setBookName] = useBookName();
  const [, setChapterNumber] = useChapterNumber();
  const [versionName] = useVersionName();

  const updateBookName = (book: string) => {
    setBookName(book);
    setChapterNumber("1");
  };

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="rounded-4xl" disabled={!versionName}>
        {bookName ? bookName : "Book"}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-3 gap-1 p-4 md:w-[400px] lg:w-[500px]">
          {books.map((book) => (
            <li key={book.id}>
              <NavigationMenuLink onClick={() => updateBookName(book.name)}>
                {book.name}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
