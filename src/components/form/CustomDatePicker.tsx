import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

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
  const { setValue, watch } = useFormContext();

  const formattedValue = watch(name) ? dayjs(watch(name)).toISOString() : null;

  if (watch(name) && watch(name) !== formattedValue) {
    setValue(name, formattedValue);
  }

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
            {...field}
            id={name}
            format={"YYYY-MM-DD"}
            value={field.value ? dayjs(field.value) : undefined}
            onChange={(date) =>
              field.onChange(date ? date.toISOString() : field.value)
            }
            variant="filled"
            size="large"
            style={{ width: "100%" }}
            disabled={disabled}
            placeholder={label}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomDatePicker;
