import { TSemesterRegistration } from "../../../../types/courseManagement.type";
import { TQueryParams, TResponseRedux } from "../../../../types/global.type";
import baseApi from "../../../api/baseApi";

const semesterRegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create semesterRegistrations api
    createSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semesterRegistrations"],
    }),

    // get all semesterRegistrations api
    getAllSemesterRegistrations: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.length > 0 &&
          args.forEach((arg: TQueryParams) => {
            params.append(arg.name, arg.value as string);
          });

        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      providesTags: ["semesterRegistrations"],
      transformResponse: (
        response: TResponseRedux<TSemesterRegistration[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // get single SemesterRegistration api
    getSingleSemesterRegistration: builder.query({
      query: (id) => ({
        url: `/semester-registrations/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TSemesterRegistration>) => {
        return response;
      },
    }),

    // update SemesterRegistration api
    updateSemesterRegistration: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/semester-registrations/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["semesterRegistrations"],
      transformResponse: (response: TResponseRedux<TSemesterRegistration>) => {
        return response;
      },
    }),

    // delete SemesterRegistration api
    deleteSemesterRegistration: builder.mutation({
      query: (id) => ({
        url: `/semester-registrations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["semesterRegistrations"],
    }),
  }),
});

export const {
  useCreateSemesterRegistrationMutation,
  useGetAllSemesterRegistrationsQuery,
  useGetSingleSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,
  useDeleteSemesterRegistrationMutation,
} = semesterRegistrationApi;
