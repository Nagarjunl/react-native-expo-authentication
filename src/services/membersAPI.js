import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const membersApi = createApi({
  reducerPath: "membersApi",
  baseQuery: customFetchBase,
  tagTypes: ["Member"],
  endpoints: (build) => ({
    getMembers: build.query({
      query: () => ({
        url: "/members",
        method: "GET",
      }),
      providesTags: ["Member"],
    }),
    getMember: build.query({
      query: (id) => ({
        url: `/members/${id}`,
        method: "GET",
      }),
      providesTags: ["Member"],
    }),
    getMembersWithMaxMembers: build.query({
      query: (chit_id) => ({
        url: `/members/maxmembers/${chit_id}`,
        method: "GET",
      }),
    }),
    postMembers: build.mutation({
      query: (member) => ({
        url: "/members",
        method: "POST",
        body: member,
      }),
      invalidatesTags: ["Member"],
    }),
    patchMembers: build.mutation({
      query: (member) => ({
        url: `/members/${member.id}`,
        method: "PATCH",
        body: member,
      }),
      invalidatesTags: ["Member"],
    }),
  }),
});

export const {
  useGetMemberQuery,
  useGetMembersQuery,
  useLazyGetMembersQuery,
  useGetMembersWithMaxMembersQuery,
  usePostMembersMutation,
  usePatchMembersMutation,
} = membersApi;
