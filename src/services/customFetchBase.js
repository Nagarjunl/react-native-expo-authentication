import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { addTokens, removeTokens } from "../features/auth/authSlice";

const mutex = new Mutex();

const baseUrl = "http://localhost:3005";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: { access_token },
    } = getState();
    headers.set("authorization", access_token ? `Bearer ${access_token}` : "");
    return headers;
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.data?.statusCode === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const {
          auth: { refresh_token },
        } = api.getState();
        const refreshResult = await baseQuery(
          {
            url: "/authentication/refresh-tokens",
            method: "POST",
            body: {
              refreshToken: refresh_token,
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(addTokens(refreshResult.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(removeTokens());
          window.location.href = "/sign-in";
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export default customFetchBase;
