import { z } from "zod";

const userNameSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: "Last name is required" }),
});

const guardianSchema = z.object({
  fatherName: z.string({ required_error: "Father name is required" }),
  fatherOccupation: z.string({
    required_error: "Father occupation is required",
  }),
  fatherContactNo: z.string({
    required_error: "Father contact no is required",
  }),
  motherName: z.string({ required_error: "Mother name is required" }),
  motherOccupation: z.string({
    required_error: "Mother occupation is required",
  }),
  motherContactNo: z.string({
    required_error: "Mother contact no is required",
  }),
});

const localGuardianSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const studentSchema = z.object({
  name: userNameSchema,
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string().datetime().optional(),
  email: z.string({ required_error: "Email is required" }).email(),
  contactNo: z.string({ required_error: "Contact no is required" }),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string({ required_error: "Present address is required" }),
  permanentAddress: z.string().optional(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  academicSemester: z.string({
    required_error: "Academic semester is required",
  }),
  academicDepartment: z.string({
    required_error: "Academic department is required",
  }),
  profileImage: z.any(),
});

export const teacherSchema = z.object({
  name: userNameSchema,
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string().datetime().optional(),
  email: z.string({ required_error: "Email is required" }).email(),
  contactNo: z.string({ required_error: "Contact no is required" }),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string({ required_error: "Present address is required" }),
  permanentAddress: z.string().optional(),
  academicDepartment: z.string({
    required_error: "Academic department is required",
  }),
  designation: z.string({ required_error: "Designation is required" }),
  profileImage: z.any(),
});

export const adminSchema = z.object({
  name: userNameSchema,
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string().datetime().optional(),
  email: z.string({ required_error: "Email is required" }).email(),
  contactNo: z.string({ required_error: "Contact no is required" }),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string({ required_error: "Present address is required" }),
  permanentAddress: z.string().optional(),
  academicDepartment: z.string({
    required_error: "Academic department is required",
  }),
  designation: z.string({ required_error: "Designation is required" }),
  profileImage: z.any(),
});

// export const updateStudentSchema = studentSchema.partial().refine(
//   (data) => {
//     return Object.entries(data).forEach((value) => value !== undefined);
//   },
//   {
//     message:
//       "Fields cannot be empty. Please provide valid data for all fields.",
//   }
// );

export const updateStudentSchema = studentSchema.partial();

export const updateTeacherSchema = teacherSchema.partial();

export const updateAdminSchema = adminSchema.partial();
