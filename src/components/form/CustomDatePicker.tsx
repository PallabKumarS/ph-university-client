import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
  extra?: { labelCol?: { span: number }; wrapperCol?: { span: number } };
  disabled?: boolean;
};

const CustomDatePicker = ({
  name,
  label,
  extra,
  disabled,
}: TDatePickerProps) => {
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
          <DatePicker
            // format={"YYYY-MM-DD"}
            defaultValue={field.value}
            variant="filled"
            {...field}
            size="large"
            style={{ width: "100%" }}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomDatePicker;
