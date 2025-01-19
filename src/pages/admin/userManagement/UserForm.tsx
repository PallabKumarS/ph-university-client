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
type TUserFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  initialData?: FieldValues;
  userType: "student" | "faculty" | "admin";
  departmentOptions?: { label: string; value: string }[];
  onCancel: () => void;
};

// const schemaMap = {
//   student: studentSchema,
//   faculty: facultySchema,
//   admin: adminSchema,
// };

const UserForm = ({
  onSubmit,
  initialData,
  userType,
  departmentOptions = [],
  onCancel,
}: TUserFormProps) => {
  const renderFields = (fields: TField[]) =>
    fields.map((field) =>
      field.type === "select" ? (
        <Col span={24} lg={8} md={12} key={field.name}>
          <CustomSelect
            name={field.name}
            label={field.label}
            options={
              field.options ||
              (field.name === "academicDepartment" ? departmentOptions : [])
            }
          />
        </Col>
      ) : (
        <Col span={24} lg={8} md={12} key={field.name}>
          <CustomInput
            name={field.name}
            label={field.label}
            type={field.type}
          />
        </Col>
      )
    );

  return (
    <CustomForm
      onSubmit={onSubmit}
      //   resolver={zodResolver(schemaMap[userType])}
      defaultValues={initialData}
    >
      <Row gutter={[16, 16]}>
        <Divider>Personal Info</Divider>
        {renderFields(
          userType === "student"
            ? UserFormFields.filter((field) => field.name !== "designation")
            : UserFormFields
        )}
        {userType === "student" && (
          <>
            <Divider>Guardian Info</Divider>
            {renderFields(guardianFormFields)}
            <Divider>Local Guardian Info</Divider>
            {renderFields(localGuardianFormFields)}
            <Divider>Academic Info</Divider>
            {renderFields(academicFormFields)}
          </>
        )}
        {userType === "faculty" && renderFields([academicFormFields[1]])}
      </Row>

      <div className="responsive-button-group" style={{ marginTop: "1.5rem" }}>
        <Button type="primary" htmlType="submit">
          {initialData
            ? `Edit ${userType.charAt(0).toUpperCase() + userType.slice(1)}`
            : `Create ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
        </Button>
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
      </div>
    </CustomForm>
  );
};

export default UserForm;
