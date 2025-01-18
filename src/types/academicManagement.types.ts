export type TSemester = {
  _id: string;
  name: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TDepartment = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  academicFaculty: TFaculty;
};
