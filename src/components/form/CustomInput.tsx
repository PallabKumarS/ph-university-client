import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type?: string;
  name: string;
  label?: string;
  extra?: { labelCol?: { span: number }; wrapperCol?: { span: number } };
};

const CustomInput = ({ type, name, label, extra }: TInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            <span title={label} className="form-item-label">
              {label}
            </span>
          }
          style={{
            marginBottom: "10px",
            fontWeight: "bold",
          }}
          {...extra}
        >
          <Input
            type={type}
            id={name}
            {...field}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomInput;
