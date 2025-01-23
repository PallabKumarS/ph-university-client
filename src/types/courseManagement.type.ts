import { TDepartment, TFaculty, TSemester } from "./academicManagement.types";
import { TTeacher } from "./userManagement.type";

export type TPreRequisiteCourses = {
  course: TCourse;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TCourseTeacher = {
  course: TCourse;
  teachers: [TTeacher];
};

export type TSemesterRegistration = {
  academicSemester: TSemester;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TDays = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TOfferedCourse = {
  semesterRegistration: TSemesterRegistration;
  academicSemester?: TSemester;
  academicFaculty: TFaculty;
  academicDepartment: TDepartment;
  course: TCourse;
  teacher: TTeacher;
  maxCapacity: number;
  section: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};

export type TSchedule = {
  days: TDays[];
  startTime: string;
  endTime: string;
};
