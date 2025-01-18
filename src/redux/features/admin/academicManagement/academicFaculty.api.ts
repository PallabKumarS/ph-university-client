import { TFaculty } from "../../../../types/academicManagement.types";
import { TResponseRedux } from "../../../../types/global.type";
import baseApi from "../../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create faculty api
    createFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faculties"],
    }),

    // get all faculty api
    getAllFaculty: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      providesTags: ["faculties"],
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return response;
      },
    }),

    // get single faculty api
    updateFaculty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academic-faculties/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faculties"],
    }),

    // delete faculty api
    deleteFaculty: builder.mutation({
      query: (id) => ({
        url: `/academic-faculties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faculties"],
    }),
  }),
});

export const {
  useGetAllFacultyQuery,
  useCreateFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
} = academicFacultyApi;
export default academicFacultyApi;
