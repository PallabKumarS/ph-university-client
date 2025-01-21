import { Form, Upload } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { File } from "lucide-react";

type TDraggerProps = {
  name: string;
  label?: string;
  extra?: {
    labelCol?: { span: number };
    wrapperCol?: { span: number };
  };
};

const CustomDragger = ({ name, label, extra }: TDraggerProps) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const { setValue, resetField } = useFormContext();

  const handleBeforeUpload = (file: any) => {
    setFileList([file]);
    setValue(name, file);
    return false;
  };

  const handleRemove = () => {
    setFileList([]);
    resetField(name);
  };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            <span style={{ fontWeight: "bold", textAlign: "center" }}>
              {label}
            </span>
          }
          style={{ marginBottom: "10px", textAlign: "center" }}
          {...extra}
        >
          <Upload.Dragger
            onRemove={handleRemove}
            {...field}
            name={name}
            fileList={fileList}
            beforeUpload={handleBeforeUpload}
          >
            <p className="ant-upload-drag-icon">
              {fileList.length > 0 ? (
                <File />
              ) : (
                <InboxOutlined style={{ fontSize: "2rem" }} />
              )}
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Support for a single file.</p>
          </Upload.Dragger>
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CustomDragger;
