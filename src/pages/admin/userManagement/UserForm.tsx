import { Button, Col, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  academicFormFields,
  guardianFormFields,
  localGuardianFormFields,
  TField,
  UserFormFields,
} from "../../../constants/user";
import CustomSelect from "../../../components/form/CustomSelect";
import CustomInput from "../../../components/form/CustomInput";
import CustomForm from "../../../components/form/CustomForm";
import CustomDatePicker from "../../../components/form/CustomDatePicker";
import CustomDragger from "../../../components/form/CustomDragger";
import { useState } from "react";
import {
  adminSchema,
  studentSchema,
  teacherSchema,
} from "../../../schema/userManagement.schema";
import { TStudent, TUserType } from "../../../types/userManagement.type";
import { zodResolver } from "@hookform/resolvers/zod";
type TUserFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  initialData?: TStudent;
  userType: TUserType;
  departmentOptions?: { label: string; value: string }[];
  semesterOptions?: { label: string; value: string }[];
  onCancel: () => void;
};

const schemaMap = {
  student: studentSchema,
  teacher: teacherSchema,
  admin: adminSchema,
};

const UserForm = ({
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
      fields: UserFormFields.concat([
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

  // rendering logic for form fields
  const renderFields = (fields: TField[]) =>
    fields.map((field) => {
      if (field.type === "select") {
        return (
          <Col span={24} lg={8} md={12} key={field.name}>
            <CustomSelect
              name={field.name}
              label={field.label}
              options={
                field.options ||
                (field.name === "academicDepartment"
                  ? departmentOptions
                  : semesterOptions)
              }
            />
          </Col>
        );
      } else if (field.type === "text" || field.type === "file") {
        return (
          <Col
            span={field.type === "file" ? 24 : 24}
            lg={field.type === "file" ? 24 : 8}
            md={field.type === "file" ? 24 : 12}
            key={field.name}
          >
            {field.type === "file" ? (
              <CustomDragger name={field.name} label={field.label} />
            ) : (
              <CustomInput
                name={field.name}
                label={field.label}
                type={field.type}
              />
            )}{" "}
          </Col>
        );
      } else {
        return (
          <Col span={24} lg={8} md={12} key={field.name}>
            <CustomDatePicker name={field.name} label={field.label} />
          </Col>
        );
      }
    });

  console.log(initialData);

  return (
    <CustomForm
      defaultValues={initialData}
      onSubmit={onSubmit}
      resolver={zodResolver(schemaMap[userType])}
    >
      <Row gutter={[16, 16]}>
        <Divider>{steps[step].title}</Divider>
        {renderFields(steps[step].fields)}
      </Row>
      <div className="responsive-button-group" style={{ marginTop: "1.5rem" }}>
        {step > 0 && <Button onClick={prevStep}>Previous</Button>}
        {step < steps.length - 1 && <Button onClick={nextStep}>Next</Button>}
        {step === steps.length - 1 && (
          <Button type="primary" htmlType="submit">
            {initialData
              ? `Edit ${userType.charAt(0).toUpperCase() + userType.slice(1)}`
              : `Create ${
                  userType.charAt(0).toUpperCase() + userType.slice(1)
                }`}{" "}
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
