import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/modules/common/components/ui/navigation-menu";
import { parseAsInteger, useQueryState } from "nuqs";
import { useBooks } from "@/lib/context/study-context";

export function BookNavigation() {
  const books = useBooks();
  const [bookId, setBookId] = useQueryState("book", {
    ...parseAsInteger,
    shallow: false,
  });

  const selectedBook = books.find((book) => book.id === bookId);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        {selectedBook ? selectedBook.abbreviation : "Book"}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-3 gap-1 p-4 md:w-[400px] lg:w-[500px]">
          {books.map((book) => (
            <li key={book.id}>
              <NavigationMenuLink onClick={() => setBookId(book.id)}>
                {book.name}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
