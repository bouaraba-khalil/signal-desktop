import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";

import { apiClient } from "@/lib/http";
import * as vue from "vue";

export interface UseGetProps {
  path: string;
  query?: Record<string, string | number | boolean>;
  options?: Partial<UseQueryOptions>;
  defaultOperation?: "blob" | "json" | "text" | "arrayBuffer";
}

export const useGet = <response>({
  path,
  query = {},
  options,
  defaultOperation = "json",
}: UseGetProps) => {
  const pathArray = path.split("/");
  const haveParams = vue.computed(() => Object.keys(query).length > 0);
  return useQuery<response, Error, response>({
    queryKey: [...pathArray, query],
    // @ts-expect-error some weird behavior
    queryFn: () =>
      apiClient
        .get<response>(path, { searchParams: haveParams ? query : undefined })
        ?.[defaultOperation](),
    ...options,
  });
};
