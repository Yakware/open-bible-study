import { useCurrentChapter } from "@/lib/context/study-context";
import { getNotesForChapter } from "@/modules/study/actions";
import { useQuery } from "@tanstack/react-query";

export function useNotes() {
  const currentChapter = useCurrentChapter();

  const query = useQuery({
    queryKey: ["notes", currentChapter?.id],
    queryFn: async () => {
      if (currentChapter) {
        return getNotesForChapter(currentChapter.id);
      }
    },
  });

  return query;
}
