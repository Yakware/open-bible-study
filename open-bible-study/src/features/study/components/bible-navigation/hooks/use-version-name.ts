import { useQueryState } from "nuqs";

export function useVersionName() {
  const queryState = useQueryState("version", {
    shallow: false,
    history: "push",
  });

  return queryState;
}
