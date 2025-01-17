import { TSemester } from "../../../types/academicManagement.types";
import { TQueryParams, TResponseRedux } from "../../../types/global.type";
import baseApi from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create semester api
    createSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semesters"],
    }),

    // get all semester api
    getAllSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.length > 0 &&
          args.forEach((arg: TQueryParams) => {
            params.append(arg.name, arg.value as string);
          });

        return {
          url: "/academic-semesters",
          method: "GET",
          //   params,
        };
      },
      providesTags: ["semesters"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // get single semester api
    getSingleSemester: builder.query({
      query: (id) => ({
        url: `/academic-semesters/${id}`,
        method: "GET",
      }),
    }),

    // update semester api
    updateSemester: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academic-semesters/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["semesters"],
      // transformResponse: (response: TResponseRedux<Partial<TSemester>>) => {
      //   console.log(response);
      //   return response;
      // },
    }),

    // delete semester api
    deleteSemester: builder.mutation({
      query: (id) => ({
        url: `/academic-semesters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["semesters"],
    }),
  }),
});

export const {
  useGetAllSemesterQuery,
  useCreateSemesterMutation,
  useDeleteSemesterMutation,
  useGetSingleSemesterQuery,
  useUpdateSemesterMutation,
} = academicManagementApi;
