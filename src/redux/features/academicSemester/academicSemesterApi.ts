import baseApi from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.mutation({
      query: () => ({
        url: "/academic-semester",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllSemesterMutation } = academicSemesterApi;
