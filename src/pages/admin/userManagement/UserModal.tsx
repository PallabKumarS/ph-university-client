import { Modal } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import "./../../../index.css";
import {
  TDepartment,
  TSemester,
} from "../../../types/academicManagement.types";
import UserForm from "./UserForm";
import { TTableUserData, TUserType } from "../../../types/userManagement.type";
import {
  useCreateStudentMutation,
  useGetSingleStudentQuery,
} from "../../../redux/features/admin/userManagement/studentManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";

type TModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  initialData?: TTableUserData;
  userType: TUserType;
  departmentData?: {
    data?: TDepartment[];
  };
  semesterData?: {
    data?: TSemester[];
  };
};

const UserModal = ({
  onClose,
  initialData,
  userType,
  isModalOpen,
  departmentData,
  semesterData,
}: TModalProps) => {
  // api hooks
  const [createStudent] = useCreateStudentMutation();
  const { data: studentData, isFetching: isSFetching } =
    useGetSingleStudentQuery(initialData?.key, {
      skip: userType === "student" && initialData ? false : true,
    });

  // convert to options for select field
  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name || "",
    value: department._id || "",
  }));

  const semesterOptions = semesterData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}` || "",
    value: semester._id || "",
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(`Creating ${userType}...`);

    const formData = new FormData();

    const { profileImage, ...restData } = data;

    const userData = {
      password: "123456",
      studentData: restData,
    };

    const studentData = JSON.stringify(userData);
    formData.append("data", studentData);

    if (data.profileImage) {
      formData.append("file", profileImage.fileList[0].originFileObj);
    }

    try {
      const res = (await createStudent(formData)) as TResponse<any>;
      if (res.data?.success) {
        onClose();
        toast.success(res.data.message, { id: toastId });
      } else {
        toast.error(res.error?.data?.message || "An error occurred", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("An error occurred", { id: toastId });
    }
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
        semesterOptions={semesterOptions}
        initialData={isSFetching ? undefined : studentData?.data}
      ></UserForm>
    </Modal>
  );
};

export default UserModal;
