import { TDepartment, TSemester } from "./academicManagement.types";

export type TUserType = "student" | "teacher" | "admin";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  fullName: string;
  id: string;
  user: TUser;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  academicSemester: TSemester;
  academicDepartment: TDepartment;
  isDeleted: boolean;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  id: string;
  password: string;
  email: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "teacher";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};
