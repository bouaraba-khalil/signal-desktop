import ky from "ky";

import { authClient } from "./better-auth";

const apiClient = ky.create({
  baseUrl: `http://127.0.0.1:8080`,
  prefix: "/api",
  timeout: false,
  retry: 0,
  hooks: {
    beforeRequest: [
      async (state) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            window.location.href = "/";
            await authClient.signOut();
            return;
          }
          state.request.headers.set("Authorization", `Bearer ${token}`);
        } catch (err) {
          console.log(err);
        }
      },
    ],
    afterResponse: [
      // async (request, options, response) => {
      // refresh token logic here
      // if (response.status === 403) {
      //   // Get a fresh token
      //   const token = await ky("https://example.com/token").text();
      //   // Retry with the token
      //   request.headers.set("Authorization", `token ${token}`);
      //   return ky(request);
      // }
      // },
    ],
  },
});

export { apiClient };
