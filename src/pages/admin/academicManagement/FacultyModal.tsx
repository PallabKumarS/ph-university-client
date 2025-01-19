import { SubmitHandler, FieldValues } from "react-hook-form";
import { Button, Modal } from "antd";

import { toast } from "sonner";
import {
  useCreateFacultyMutation,
  useUpdateFacultyMutation,
} from "../../../redux/features/admin/academicManagement/academicFaculty.api";
import { TResponse } from "../../../types/global.type";
import CustomInput from "../../../components/form/CustomInput";
import CustomForm from "../../../components/form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schema/academicManagement.schema";

interface FacultyFormProps {
  isModalOpen: boolean;
  onClose: () => void;
  initialData?: {
    key: string;
    name: string;
  };
}

const FacultyModal = ({
  isModalOpen,
  onClose,
  initialData,
}: FacultyFormProps) => {
  const [createFaculty] = useCreateFacultyMutation();
  const [updateFaculty] = useUpdateFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(
      initialData ? "Updating Faculty..." : "Creating Faculty..."
    );

    try {
      if (initialData) {
        const res = (await updateFaculty({
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
        const res = (await createFaculty(data)) as TResponse<any>;
        if (res.data?.success) {
          onClose();
          toast.success(res.data.message, { id: toastId });
        } else {
          toast.error(res.error?.data?.message || "An error occurred", {
            id: toastId,
          });
        }
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
          {initialData ? "Edit Faculty" : "Create Faculty"}
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
      style={{ overflow: "auto" }}
    >
      <CustomForm
        onSubmit={onSubmit}
        defaultValues={initialData}
        resolver={zodResolver(academicFacultySchema)}
      >
        <CustomInput name="name" label="Academic Faculty Name" type="text" />

        <div className="responsive-button-group">
          <Button type="primary" htmlType="submit">
            {initialData ? "Update Faculty" : "Create Faculty"}
          </Button>
          <Button onClick={onClose} danger>
            Cancel
          </Button>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default FacultyModal;
