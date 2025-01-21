import { TSemester } from "../../../../types/academicManagement.types";
import { TQueryParams, TResponseRedux } from "../../../../types/global.type";
import { TStudent } from "../../../../types/userManagement.type";
import baseApi from "../../../api/baseApi";

const studentManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create student api
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["students"],
    }),

    // get all semester api
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.length > 0 &&
          args.forEach((arg: TQueryParams) => {
            params.append(arg.name, arg.value as string);
          });

        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      providesTags: ["students"],
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // get single semester api
    getSingleStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
      providesTags: ["students"],
    }),

    // update semester api
    updateStudent: builder.mutation({
      query: ({ id, studentData }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: studentData,
      }),
      invalidatesTags: ["students"],
      transformResponse: (response: TResponseRedux<Partial<TSemester>>) => {
        return response;
      },
    }),

    // delete semester api
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["students"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} = studentManagementApi;
