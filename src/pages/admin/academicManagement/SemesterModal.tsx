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
} from "../../../redux/features/admin/academicManagement/academicSemester.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";

type TModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
  initialData?: {
    key: string;
    name: string;
    code: string;
    year: number;
    startMonth: string;
    endMonth: string;
  };
};

const SemesterModal = ({ onClose, isModalOpen, initialData }: TModalProps) => {
  const [updateSemester] = useUpdateSemesterMutation();
  const [createSemester] = useCreateSemesterMutation();

  // submit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(
      initialData ? "Updating Semester..." : "Creating Semester..."
    );
    // convert code to name
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name: name ? name : initialData?.name,
      code: name ? data.name : initialData?.code,
      year: String(data.year),
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      if (initialData) {
        const res = (await updateSemester({
          id: initialData?.key,
          data: semesterData,
        })) as TResponse<any>;

        res?.data?.success
          ? (onClose(), toast.success(res?.data?.message, { id: toastId }))
          : toast.error(res?.error?.data?.message || "An error occurred", {
              id: toastId,
            });
      } else {
        const res = (await createSemester(semesterData)) as TResponse<any>;

        res?.data?.success
          ? (onClose(), toast.success(res?.data?.message, { id: toastId }))
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
      key={initialData ? initialData?.key : "add"}
      title={
        <h2 style={{ textAlign: "center" }}>
          {initialData ? "Edit Semester" : "Create Semester"}
        </h2>
      }
      open={isModalOpen}
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
        resolver={zodResolver(academicSemesterSchema)}
        defaultValues={initialData}
      >
        {/* name of semester  */}
        <CustomSelect
          label="Select Name"
          name="name"
          options={semesterOptions}
        />

        {/* year */}
        <CustomSelect label="Select Year" name="year" options={yearOptions} />

        {/* start month */}
        <CustomSelect
          label="Select Start Month"
          name="startMonth"
          options={monthsOptions}
        />

        {/* end month */}
        <CustomSelect
          label="Select End Month"
          name="endMonth"
          options={monthsOptions}
        />

        <div className="responsive-button-group">
          <Button type="primary" htmlType="submit">
            {initialData
              ? "Update Academic Semester"
              : "Create Academic Semester"}
          </Button>
          <Button onClick={onClose} danger>
            Cancel
          </Button>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default SemesterModal;
