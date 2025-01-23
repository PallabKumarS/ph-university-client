import { TCourse } from "../../../../types/courseManagement.type";
import { TQueryParams, TResponseRedux } from "../../../../types/global.type";
import baseApi from "../../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create courses api
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),

    // get all courses api
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.length > 0 &&
          args.forEach((arg: TQueryParams) => {
            params.append(arg.name, arg.value as string);
          });

        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // get single course api
    getSingleCourse: builder.query({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TCourse>) => {
        return response;
      },
    }),

    // update course api
    updateCourse: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["courses"],
      transformResponse: (response: TResponseRedux<TCourse>) => {
        return response;
      },
    }),

    // delete course api
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),

    // assign course teacher api
    assignCourseTeacher: builder.mutation({
      query: ({ courseId, teachers }) => ({
        url: `/courses/${courseId}/assign-teacher`,
        method: "PATCH",
        body: teachers,
      }),
      invalidatesTags: ["courses"],
    }),

    // remove course teacher api
    removeTeacherFromCourse: builder.mutation({
      query: ({ courseId, teachers }) => ({
        url: `/courses/${courseId}/remove-teacher`,
        method: "PATCH",
        body: teachers,
      }),
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useAssignCourseTeacherMutation,
  useRemoveTeacherFromCourseMutation,
} = courseManagementApi;
