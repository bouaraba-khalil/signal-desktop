import { useQuery, type UseQueryOptions, type UseQueryReturnType } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

import { apiClient } from "@/lib/http";

export interface UseGetProps<TResponse> {
  path: MaybeRefOrGetter<string>;
  query?: MaybeRefOrGetter<Record<string, string | number | boolean>>;
  options?: MaybeRefOrGetter<Partial<UseQueryOptions<TResponse, Error>>>;
  defaultOperation?: MaybeRefOrGetter<"blob" | "json" | "text" | "arrayBuffer">;
}

export const useGet = <TResponse>({
  path,
  query,
  options,
  defaultOperation = "json",
}: UseGetProps<TResponse>): UseQueryReturnType<TResponse, Error> => {
  const resolvedQuery = computed(() => toValue(query) ?? {});

  const resolvedOptions = computed(() => toValue(options) ?? {});

  return useQuery<TResponse, Error, TResponse>(
    computed(() => {
      const pathValue = toValue(path);
      const queryValue = resolvedQuery.value;
      const operation = toValue(defaultOperation);
      const hasParams = Object.keys(queryValue).length > 0;

      return {
        queryKey: [...pathValue.split("/"), queryValue],
        queryFn: (): Promise<TResponse> =>
          apiClient
            .get<TResponse>(pathValue, {
              searchParams: hasParams ? queryValue : undefined,
            })
            ?.[operation]() as Promise<TResponse>,
        ...resolvedOptions.value,
      };
    }),
  );
};
