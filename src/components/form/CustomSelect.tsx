import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
  extra?: { labelCol?: { span: number }; wrapperCol?: { span: number } };
};

const CustomSelect = ({ label, name, options, extra }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={<span className="form-item-label">{label}</span>}
          style={{ fontWeight: "bold", marginBottom: "10px" }}
          {...extra}
        >
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
