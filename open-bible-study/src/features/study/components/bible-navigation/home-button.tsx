import { HomeIcon } from "lucide-react";
import { useBookName } from "./hooks/use-book-name";
import { useChapterNumber } from "./hooks/use-chapter-number";
import { Button } from "@/components/ui/button";

export function HomeButton() {
  const [, setBookName] = useBookName();
  const [, setChapterNumber] = useChapterNumber();

  const reset = () => {
    setBookName(null);
    setChapterNumber(null);
  };

  return (
    <Button size="icon" variant="ghost" onClick={reset} className="rounded-xl">
      <HomeIcon />
    </Button>
  );
}
