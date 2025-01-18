import { createSlice } from "@reduxjs/toolkit";
import { TDepartment } from "../../../../types/academicManagement.types";

type TAcademicManagementState = {
  departments: TDepartment[];
};

const initialState: TAcademicManagementState = {
  departments: [],
};

const academicManagementSlice = createSlice({
  name: "academicManagement",
  initialState,
  reducers: {
    // set departments
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});

export default academicManagementSlice;
export const { setDepartments } = academicManagementSlice.actions;
