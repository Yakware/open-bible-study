import { useQueryState } from "nuqs";

export function useChapterNumber() {
  const queryState = useQueryState("chapter", {
    shallow: false,
    history: "push",
    scroll: true,
  });

  return queryState;
}
