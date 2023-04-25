import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const chitsApi = createApi({
  reducerPath: "chitsApi",
  baseQuery: customFetchBase,
  tagTypes: ["Chit"],
  endpoints: (build) => ({
    getChits: build.query({
      query: () => ({
        url: "/chits",
        method: "GET",
      }),
      providesTags: ["Chit"],
    }),
    getChit: build.query({
      query: (chit_id) => ({
        url: `/chits/${chit_id}`,
        method: "GET",
      }),
    }),
    getChitDetail: build.query({
      query: (chit_id) => ({
        url: `/chits/finddetail/${chit_id}`,
        method: "GET",
      }),
    }),
    postChits: build.mutation({
      query: (chit) => ({
        url: "/chits",
        method: "POST",
        body: chit,
      }),
      invalidatesTags: ["Chit"],
    }),
    postChitList: build.mutation({
      query: (chitDates) => ({
        url: "/chit-lists",
        method: "POST",
        body: chitDates,
      }),
      invalidatesTags: ["Chit"],
    }),
  }),
});

export const {
  useGetChitsQuery,
  useGetChitQuery,
  useGetChitDetailQuery,
  usePostChitsMutation,
  usePostChitListMutation,
} = chitsApi;
