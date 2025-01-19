import { Modal } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import "./../../../index.css";
import { TDepartment } from "../../../types/academicManagement.types";
import UserForm from "./UserForm";

type TModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  initialData?: FieldValues;
  userType: "student" | "faculty" | "admin";
  departmentData?: {
    data?: TDepartment[];
  };
};

const UserModal = ({
  onClose,
  initialData,
  userType,
  isModalOpen,
  departmentData,
}: TModalProps) => {
  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name || "",
    value: department._id || "",
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <Modal
      open={isModalOpen}
      title={
        <h2 style={{ textAlign: "center" }}>
          {initialData
            ? `Edit ${userType.charAt(0).toUpperCase() + userType.slice(1)}`
            : `Create ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
        </h2>
      }
      onCancel={onClose}
      footer={null}
      width={{
        xs: "90%",
        sm: "85%",
        md: "80%",
        lg: "70%",
        xl: "60%",
        xxl: "50%",
      }}
      centered
    >
      <UserForm
        onSubmit={onSubmit}
        userType={userType}
        departmentOptions={departmentOptions}
        onCancel={onClose}
      ></UserForm>
    </Modal>
  );
};

export default UserModal;
