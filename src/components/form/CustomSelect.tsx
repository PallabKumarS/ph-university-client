import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
  extra?: { labelCol?: { span: number }; wrapperCol?: { span: number } };
  disabled?: boolean;
};

const CustomSelect = ({
  label,
  name,
  options,
  extra,
  disabled,
}: TSelectProps) => {
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
            variant="filled"
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomSelect;
