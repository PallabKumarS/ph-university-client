import { TDepartment } from "../../../../types/academicManagement.types";
import { TResponseRedux } from "../../../../types/global.type";
import baseApi from "../../../api/baseApi";

const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create department api
    createDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["departments"],
    }),

    // get all department api
    getAllDepartment: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
      providesTags: ["departments"],
      transformResponse: (response: TResponseRedux<TDepartment[]>) => {
        // console.log("hit", response);
        return response;
      },
    }),

    // get single department api
    updateDepartment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/academic-departments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["departments"],
    }),

    // delete department api
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/academic-departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["departments"],
    }),
  }),
});

export const {
  useGetAllDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = academicDepartmentApi;
export default academicDepartmentApi;
