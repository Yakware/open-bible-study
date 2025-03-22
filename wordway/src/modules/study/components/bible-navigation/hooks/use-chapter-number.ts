import { useQueryState } from "nuqs";

export function useChapterNumber() {
  const queryState = useQueryState("chapter", {
    shallow: false,
  });

  return queryState;
}
