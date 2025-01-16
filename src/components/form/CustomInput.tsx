import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type?: string;
  name: string;
  label?: string;
};

const CustomInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input type={type} id={name} {...field} size="large" />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CustomInput;
