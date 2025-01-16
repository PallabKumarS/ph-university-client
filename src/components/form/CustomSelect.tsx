import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
};

const CustomSelect = ({ label, name, options }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
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
