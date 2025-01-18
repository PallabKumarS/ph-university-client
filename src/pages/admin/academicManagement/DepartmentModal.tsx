import { SubmitHandler, FieldValues } from "react-hook-form";
import { Button, Modal } from "antd";

import { toast } from "sonner";
import {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../../../redux/features/admin/academicManagement/academicDepartment.api";
import { TResponse } from "../../../types/global.type";
import CustomInput from "../../../components/form/CustomInput";
import CustomForm from "../../../components/form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schema/academicManagement.schema";
import { TFaculty } from "../../../types/academicManagement.types";
import CustomSelect from "../../../components/form/CustomSelect";
import { useEffect, useState } from "react";
import { TTableDepartmentData } from "./AcademicDepartment";

type DepartmentFormProps = {
  isModalOpen: boolean;
  onClose: () => void;
  initialData?: TTableDepartmentData;
  facultyData?: {
    data?: TFaculty[];
  };
};

const DepartmentModal = ({
  isModalOpen,
  onClose,
  initialData,
  facultyData,
}: DepartmentFormProps) => {
  const [dataWithFaculty, setDataWithFaculty] = useState<FieldValues>({});
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();

  //   convert data to select options for select input
  const facultyOptions = facultyData?.data?.map((faculty) => ({
    label: faculty.name || "",
    value: faculty._id || "",
  }));

  useEffect(() => {
    if (initialData) {
      setDataWithFaculty({
        name: initialData?.name || "",
        academicFaculty: initialData?.academicFaculty?._id || "",
      });
    }
  }, [initialData]);

  console.log(dataWithFaculty);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(
      initialData ? "Updating Department..." : "Creating Department..."
    );

    try {
      if (initialData) {
        const res = (await updateDepartment({
          id: initialData.key,
          data,
        })) as TResponse<any>;
        if (res.data?.success) {
          onClose();
          toast.success(res.data.message, { id: toastId });
        } else {
          toast.error(res.error?.data?.message || "An error occurred", {
            id: toastId,
          });
        }
      } else {
        // const res = (await createDepartment(data)) as TResponse<any>;
        // if (res.data?.success) {
        //   onClose();
        //   toast.success(res.data.message, { id: toastId });
        // } else {
        //   toast.error(res.error?.data?.message || "An error occurred", {
        //     id: toastId,
        //   });
        // }
        console.log(data);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Modal
      open={isModalOpen}
      title={
        <h2 style={{ textAlign: "center" }}>
          {initialData ? "Edit Department" : "Create Department"}
        </h2>
      }
      onCancel={onClose}
      footer={null}
      width={{
        xs: "80%",
        sm: "70%",
        md: "60%",
        lg: "50%",
        xl: "40%",
        xxl: "30%",
      }}
      centered
      style={{ overflow: "scroll" }}
    >
      <CustomForm
        onSubmit={onSubmit}
        defaultValues={initialData && dataWithFaculty}
        resolver={zodResolver(academicDepartmentSchema)}
      >
        <CustomInput name="name" label="Academic Department Name" type="text" />

        <CustomSelect
          name="academicFaculty"
          label="Select Academic Faculty"
          options={facultyOptions || []}
        />

        <div className="responsive-button-group">
          <Button type="primary" htmlType="submit">
            {initialData ? "Update Department" : "Create Department"}
          </Button>
          <Button onClick={onClose} danger>
            Cancel
          </Button>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default DepartmentModal;
