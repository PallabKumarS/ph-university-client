import { Button, Modal } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { semesterOptions, yearOptions } from "../../../constants/semester";
import CustomForm from "../../../components/form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/academicManagement.schema";
import CustomSelect from "../../../components/form/CustomSelect";
import { monthsOptions } from "../../../constants/global";
import {
  useCreateSemesterMutation,
  useUpdateSemesterMutation,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";

type TModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  editData?: {
    key: string;
    name: string;
    code: string;
    year: number;
    startMonth: string;
    endMonth: string;
  };
  edit?: boolean;
};

const SemesterModal = ({
  setIsModalOpen,
  isModalOpen,
  edit,
  editData,
}: TModalProps) => {
  const [updateSemester] = useUpdateSemesterMutation();
  const [createSemester] = useCreateSemesterMutation();

  // cancel function
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // submit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(
      edit ? "Updating Semester..." : "Creating Semester..."
    );
    // convert code to name
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name: name ? name : editData?.name,
      code: name ? data.name : editData?.code,
      year: String(data.year),
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      if (edit) {
        const res = (await updateSemester({
          id: editData?.key,
          data: semesterData,
        })) as TResponse<any>;

        res?.data?.success
          ? (setIsModalOpen(false),
            toast.success(res?.data?.message, { id: toastId }))
          : toast.error(res?.error?.data?.message || "An error occurred", {
              id: toastId,
            });
      } else {
        const res = (await createSemester(semesterData)) as TResponse<any>;

        res?.data?.success
          ? (setIsModalOpen(false),
            toast.success(res?.data?.message, { id: toastId }))
          : toast.error(res?.error?.data?.message || "An error occurred", {
              id: toastId,
            });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Modal
      key={edit ? editData?.key : "add"}
      centered
      title={edit ? "Edit Semester" : "Create Semester"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
    >
      <CustomForm
        onSubmit={onSubmit}
        resolver={zodResolver(academicSemesterSchema)}
        defaultValues={editData}
      >
        {/* name of semester  */}
        <CustomSelect label="Name" name="name" options={semesterOptions} />

        {/* year */}
        <CustomSelect label="Year" name="year" options={yearOptions} />

        {/* start month */}
        <CustomSelect
          label="Start Month"
          name="startMonth"
          options={monthsOptions}
        />

        {/* end month */}
        <CustomSelect
          label="End Month"
          name="endMonth"
          options={monthsOptions}
        />

        <Button type="primary" htmlType="submit">
          {edit ? "Update Academic Semester" : "Create Academic Semester"}
        </Button>
      </CustomForm>
    </Modal>
  );
};

export default SemesterModal;
