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
import { TSemester } from "../../../types/academicManagement.types";

type TModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  editData?: FieldValues;
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
    const toastId = toast.loading("Creating semester...");
    // convert code to name
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      if (edit) {
        updateSemester({ id: editData?._id, body: semesterData });
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
      title={edit ? "Edit Semester" : "Create Semester"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
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
