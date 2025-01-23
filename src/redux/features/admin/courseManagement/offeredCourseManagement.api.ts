import { TOfferedCourse } from "../../../../types/courseManagement.type";
import { TQueryParams, TResponseRedux } from "../../../../types/global.type";
import baseApi from "../../../api/baseApi";

const offeredCourseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create offered course api
    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourses"],
    }),

    // get all offered course api
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.length > 0 &&
          args.forEach((arg: TQueryParams) => {
            params.append(arg.name, arg.value as string);
          });

        return {
          url: "/offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["offeredCourses"],
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // get single offered course api
    getSingleOfferedCourse: builder.query({
      query: (id) => ({
        url: `/offered-courses/${id}`,
        method: "GET",
      }),
      providesTags: ["offeredCourses"],
      transformResponse: (response: TResponseRedux<TOfferedCourse>) => {
        return response;
      },
    }),

    // update offered course api
    updateOfferedCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/offered-courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["offeredCourses"],
    }),

    // delete offered course api
    deleteOfferedCourse: builder.mutation({
      query: (id) => ({
        url: `/offered-courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["offeredCourses"],
    }),
  }),
});

export const {
  useCreateOfferedCourseMutation,
  useGetAllOfferedCoursesQuery,
  useGetSingleOfferedCourseQuery,
  useUpdateOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
} = offeredCourseManagementApi;
