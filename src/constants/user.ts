import { bloodGroupOptions, genderOptions } from "./global";
import { semesterOptions } from "./semester";

export type TField = {
  name: string;
  label: string;
  type: "text" | "select" | "date";
  options?: { label: string; value: string }[];
};

export const UserFormFields: TField[] = [
  { name: "name.firstName", label: "First Name", type: "text" },
  { name: "name.middleName", label: "Middle Name", type: "text" },
  { name: "name.lastName", label: "Last Name", type: "text" },
  { name: "profileImage", label: "Profile Image", type: "text" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: genderOptions,
  },
  { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  { name: "email", label: "Email", type: "text" },
  { name: "contactNo", label: "Contact Number", type: "text" },
  {
    name: "emergencyContactNo",
    label: "Emergency Contact Number",
    type: "text",
  },
  {
    name: "bloodGroup",
    label: "Blood Group",
    type: "select",
    options: bloodGroupOptions,
  },
  { name: "presentAddress", label: "Present Address", type: "text" },
  { name: "permanentAddress", label: "Permanent Address", type: "text" },
  { name: "designation", label: "Designation", type: "text" },
];

export const academicFormFields: TField[] = [
  {
    name: "admissionSemester",
    label: "Admission Semester",
    type: "select",
    options: semesterOptions,
  },
  {
    name: "academicDepartment",
    label: "Academic Department",
    type: "select",
  },
];

export const localGuardianFormFields: TField[] = [
  {
    name: "localGuardian.fatherName",
    label: "Local Guardian's Name",
    type: "text",
  },
  {
    name: "localGuardian.fatherOccupation",
    label: "Local Guardian's Occupation",
    type: "text",
  },
  {
    name: "localGuardian.fatherContactNo",
    label: "Local Guardian's Contact Number",
    type: "text",
  },
  {
    name: "localGuardian.address",
    label: "Local Guardian's Address",
    type: "text",
  },
];

export const guardianFormFields: TField[] = [
  {
    name: "guardian.fatherName",
    label: "Father's Name",
    type: "text",
  },
  {
    name: "guardian.fatherOccupation",
    label: "Father's Occupation",
    type: "text",
  },
  {
    name: "guardian.fatherContactNo",
    label: "Father's Contact Number",
    type: "text",
  },
  {
    name: "guardian.motherName",
    label: "Mother's Name",
    type: "text",
  },
  {
    name: "guardian.motherOccupation",
    label: "Mother's Occupation",
    type: "text",
  },
  {
    name: "guardian.motherContactNo",
    label: "Mother's Contact Number",
    type: "text",
  },
];
