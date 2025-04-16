import { useQueryState } from "nuqs";

export function useBookName() {
  const queryState = useQueryState("book", {
    shallow: false,
    history: "push",
  });

  return queryState;
}
