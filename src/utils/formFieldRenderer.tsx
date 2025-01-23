import { Col } from "antd";
import CustomSelect from "../components/form/CustomSelect";
import { TField } from "../constants/user";
import CustomDragger from "../components/form/CustomDragger";
import CustomInput from "../components/form/CustomInput";
import CustomDatePicker from "../components/form/CustomDatePicker";

type TSelectFiled = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const renderFields = (
  fields: TField[],
  semesterOptions: TSelectFiled[],
  departmentOptions: TSelectFiled[]
) =>
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
