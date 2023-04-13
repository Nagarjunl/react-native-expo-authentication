import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
const root = "authentication";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    sendOtp: build.mutation({
      query: (mobile_number) => ({
        url: `${root}/send-otp`,
        method: "POST",
        body: { mobile_number: mobile_number },
      }),
    }),
    verifyOtp: build.mutation({
      query: (payload) => ({
        url: `${root}/validate-otp`,
        method: "POST",
        body: payload,
      }),
    }),
    logout: build.mutation({
      query: (payload) => ({
        url: `${root}/logout/:oId`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = authApi;
