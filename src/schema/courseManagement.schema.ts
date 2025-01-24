import { z } from "zod";
import { semesterRegistrationStatus } from "../constants/course";

export const createSemesterRegistrationSchema = z.object({
  academicSemester: z.string({
    required_error: "Academic Semester is required",
  }),
  status: z.enum([...(semesterRegistrationStatus as [string, ...string[]])], {
    message: "Status is required",
  }),
  startDate: z
    .string({
      required_error: "start date is required",
      invalid_type_error: "start date must be a valid date",
    })
    .datetime(),
  endDate: z
    .string({
      required_error: "start date is required",
      invalid_type_error: "start date must be a valid date",
    })
    .datetime(),
  minCredit: z
    .number({
      required_error: "min credit is required",
      invalid_type_error: "min credit must be a number of 3 to 6",
    })
    .min(3)
    .max(6),
  maxCredit: z
    .number({
      required_error: "min credit is required",
      invalid_type_error: "min credit must be a number of 15 to 20",
    })
    .min(15)
    .max(20),
});

export const updateSemesterRegistrationSchema =
  createSemesterRegistrationSchema.partial();

export const createCourseSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  prefix: z.string({ required_error: "Prefix is required" }),
  code: z.number({ required_error: "Code is required" }),
  credits: z.number({ required_error: "Credits is required" }),
  preRequisiteCourses: z.array(z.string()).optional() || undefined,
});
export const updateCourseSchema = createCourseSchema.partial();

export const teachersWithCourseSchema = z.object({
  teachers: z.array(z.string()),
});
