import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../actions";
import { useStudyContext } from "@/lib/context/study-context";

export function useNotes() {
  const { currentChapter } = useStudyContext();

  const query = useQuery({
    queryKey: ["notes", currentChapter?.id],
    queryFn: () => fetchNotes(currentChapter?.id),
  });

  return query;
}
