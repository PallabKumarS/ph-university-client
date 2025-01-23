import { Button, Divider, Row, Skeleton } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  academicFormFields,
  guardianFormFields,
  localGuardianFormFields,
  UserFormFields,
} from "../../../constants/user";
import { useState } from "react";
import {
  adminSchema,
  studentSchema,
  teacherSchema,
  updateAdminSchema,
  updateStudentSchema,
  updateTeacherSchema,
} from "../../../schema/userManagement.schema";
import { TStudent, TUserType } from "../../../types/userManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { renderFields } from "../../../utils/formFieldRenderer";
import CustomForm from "../../../components/form/CustomForm";

// type declared here
type TUserFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  initialData?: TStudent;
  userType: TUserType;
  departmentOptions?: { label: string; value: string; disabled?: boolean }[];
  semesterOptions?: { label: string; value: string; disabled?: boolean }[];
  onCancel: () => void;
  edit: boolean;
};

// map userType to schema
const schemaMap = {
  student: studentSchema,
  teacher: teacherSchema,
  admin: adminSchema,
};

const updateSchemaMap = {
  student: updateStudentSchema,
  teacher: updateTeacherSchema,
  admin: updateAdminSchema,
};

const UserForm = ({
  edit = false,
  onSubmit,
  initialData,
  userType,
  departmentOptions = [],
  onCancel,
  semesterOptions = [],
}: TUserFormProps) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // steps for different information of user
  const steps = [
    {
      title: "Personal Info",
      fields: initialData
        ? UserFormFields
        : UserFormFields.concat([
            { name: "profileImage", label: "Profile Image", type: "file" },
          ]),
    },
    {
      title: "Guardian Info",
      fields: guardianFormFields.concat(localGuardianFormFields),
    },
    {
      title: "Academic Info",
      fields: academicFormFields.filter((field) =>
        userType === "student" ? field.name !== "designation" : true
      ),
    },
  ];

  if (edit) {
    if (!initialData) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      );
    }
  }

  return (
    <CustomForm
      defaultValues={{
        ...initialData,
        academicSemester: initialData?.academicSemester?._id,
        academicDepartment: initialData?.academicDepartment?._id,
      }}
      onSubmit={onSubmit}
      resolver={zodResolver(
        initialData ? updateSchemaMap[userType] : schemaMap[userType]
      )}
    >
      <Row gutter={[16, 16]}>
        <Divider>{steps[step].title}</Divider>
        {renderFields(steps[step].fields, semesterOptions, departmentOptions)}
      </Row>
      <div className="responsive-button-group" style={{ marginTop: "1.5rem" }}>
        {step > 0 && <Button onClick={prevStep}>Previous</Button>}
        {step < steps.length - 1 && <Button onClick={nextStep}>Next</Button>}
        {step === steps.length - 1 && (
          <Button type="primary" htmlType="submit">
            {initialData
              ? "Submit Edit"
              : `Create ${
                  userType.charAt(0).toUpperCase() + userType.slice(1)
                }`}
          </Button>
        )}
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
      </div>
    </CustomForm>
  );
};

export default UserForm;
