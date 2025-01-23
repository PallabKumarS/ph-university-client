import { TQueryParams, TResponseRedux } from "../../../../types/global.type";
import { TTeacher } from "../../../../types/userManagement.type";
import baseApi from "../../../api/baseApi";

const teacherManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create teacher api
    createTeacher: builder.mutation({
      query: (data) => ({
        url: "/users/create-teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teachers"],
    }),

    // get all teacher api
    getAllTeachers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.length > 0 &&
          args.forEach((arg: TQueryParams) => {
            params.append(arg.name, arg.value as string);
          });

        return {
          url: "/teachers",
          method: "GET",
          params,
        };
      },
      providesTags: ["teachers"],
      transformResponse: (response: TResponseRedux<TTeacher[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // get single teacher api
    getSingleTeacher: builder.query({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TTeacher>) => {
        return response;
      },
    }),

    // update teacher api
    updateTeacher: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/teachers/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["teachers"],
      transformResponse: (response: TResponseRedux<TTeacher>) => {
        return response;
      },
    }),

    // delete teacher api
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teachers"],
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useGetAllTeachersQuery,
  useGetSingleTeacherQuery,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherManagementApi;
