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
  useUpdateStudentMutation,
} from "../../../redux/features/admin/userManagement/studentManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { USER_ROLE } from "../../../constants/user";
import {
  useCreateTeacherMutation,
  useGetSingleTeacherQuery,
  useUpdateTeacherMutation,
} from "../../../redux/features/admin/userManagement/teacherManagement.api";

type TModalProps = {
  isEdit?: boolean;
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
  dependency: {
    isDFetching: boolean;
    isSemFetching: boolean;
  };
};

const UserModal = ({
  isEdit,
  onClose,
  initialData,
  userType,
  isModalOpen,
  departmentData,
  semesterData,
  dependency,
}: TModalProps) => {
  // handle dynamic data based on userType
  let createMutation: any;
  let getSingleQuery: any;
  let updateMutation: any;

  switch (userType || "student") {
    case USER_ROLE.student:
      createMutation = useCreateStudentMutation();
      getSingleQuery = useGetSingleStudentQuery(initialData?.key, {
        skip: !initialData,
      });
      updateMutation = useUpdateStudentMutation();
      break;
    case USER_ROLE.teacher:
      createMutation = useCreateTeacherMutation();
      getSingleQuery = useGetSingleTeacherQuery(initialData?.key, {
        skip: !initialData,
      });
      updateMutation = useUpdateTeacherMutation();
      break;
    case USER_ROLE.admin:
      createMutation = useCreateTeacherMutation();
      getSingleQuery = useGetSingleTeacherQuery(initialData?.key, {
        skip: !initialData,
      });
      updateMutation = useUpdateTeacherMutation();
      break;
    default:
      createMutation = null;
      getSingleQuery = null;
      updateMutation = null;
      break;
  }

  // convert to options for select field
  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name || "",
    value: department._id || "",
    disabled: dependency.isDFetching,
  }));

  const semesterOptions = semesterData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}` || "",
    value: semester._id || "",
    disabled: dependency.isSemFetching,
  }));

  const [createUser] = createMutation || [() => {}];
  const { data: singleUserData, isFetching: isUserFetching } = getSingleQuery;
  const [updateUser] = updateMutation || [() => {}];

  // handle submit form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(
      `${initialData ? "Updating" : "Creating"} ${userType}...`
    );

    if (initialData) {
      try {
        let userData: {
          studentData?: any;
          teacherData?: any;
          adminData?: any;
        } = {};

        if (userType === USER_ROLE.teacher) {
          userData.teacherData = data;
        } else if (userType === USER_ROLE.student) {
          userData.studentData = data;
        } else {
          userData.adminData = data;
        }

        // updating user
        const res = (await updateUser({
          id: initialData?.key,
          updatedData: userData,
        })) as TResponse<any>;

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
    }

    // creating user
    else {
      const formData = new FormData();

      const { profileImage, ...restData } = data;

      let userData: {
        password: string;
        studentData?: any;
        teacherData?: any;
        adminData?: any;
      } = {
        password: "123456",
      };

      if (userType === USER_ROLE.teacher) {
        userData.teacherData = restData;
      } else if (userType === USER_ROLE.student) {
        userData.studentData = restData;
      } else {
        userData.adminData = restData;
      }

      const jsonData = JSON.stringify(userData);
      formData.append("data", jsonData);

      if (data.profileImage) {
        formData.append("file", profileImage.fileList[0].originFileObj);
      }

      try {
        const res = (await createUser(formData)) as TResponse<any>;
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
        initialData={isUserFetching ? undefined : singleUserData?.data}
        edit={isEdit ? true : false}
      ></UserForm>
    </Modal>
  );
};

export default UserModal;
