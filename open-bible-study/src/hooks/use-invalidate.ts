import { useQueryClient } from "@tanstack/react-query";

export function useInvalidate() {
  const queryClient = useQueryClient();
  const invalidate = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  };

  return invalidate;
}
