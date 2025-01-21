import baseApi from "../../../api/baseApi";

const allUserManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // change status of user api
    changeUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["users", "students", "teachers", "admins"],
    }),

    // get personal info of user api
    getPersonalInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useChangeUserStatusMutation, useGetPersonalInfoQuery } =
  allUserManagementApi;
