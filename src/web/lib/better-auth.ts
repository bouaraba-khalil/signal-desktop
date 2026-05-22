import { createAuthClient } from "better-auth/vue";
export const authClient = createAuthClient({
  baseURL: "http://127.0.0.1:8080",
  plugins: [],
  sessionOptions: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 10 * 60 * 1000,
  },
});
