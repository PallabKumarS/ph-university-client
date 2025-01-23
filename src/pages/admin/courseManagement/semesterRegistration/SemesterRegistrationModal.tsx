import { Button, Modal, Skeleton } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomForm from "../../../../components/form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "../../../../components/form/CustomSelect";
import { toast } from "sonner";
import { TResponse } from "../../../../types/global.type";
import {
  useCreateSemesterRegistrationMutation,
  useUpdateSemesterRegistrationMutation,
} from "../../../../redux/features/admin/courseManagement/semesterRegistration.api";
import { useGetAllSemesterQuery } from "../../../../redux/features/admin/academicManagement/academicSemester.api";
import { RegistrationStatusOptions } from "../../../../constants/course";
import {
  createSemesterRegistrationSchema,
  updateSemesterRegistrationSchema,
} from "../../../../schema/courseManagement.schema";
import CustomDatePicker from "../../../../components/form/CustomDatePicker";
import CustomInput from "../../../../components/form/CustomInput";
import { TTableSemesterRegistrationData } from "./SemesterRegistration";

type TModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
  initialData?: TTableSemesterRegistrationData;
  edit?: boolean;
};

const SemesterRegistrationModal = ({
  edit = false,
  onClose,
  isModalOpen,
  initialData,
}: TModalProps) => {
  const [createSemesterRegistration] = useCreateSemesterRegistrationMutation();
  const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation();
  const { data: semesterData, isFetching: isSemFetching } =
    useGetAllSemesterQuery([{ name: "sort", value: "year" }], {
      refetchOnReconnect: true,
    });

  const semesterOptions = semesterData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}` || "",
    value: semester._id || "",
    disabled: isSemFetching,
  }));

  // submit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const toastId = toast.loading(
      initialData
        ? "Updating Semester Registration..."
        : "Creating Semester Registration..."
    );

    try {
      if (initialData) {
        const res = (await updateSemesterRegistration({
          id: initialData?.key,
          updatedData: data,
        })) as TResponse<any>;

        res?.data?.success
          ? (onClose(), toast.success(res?.data?.message, { id: toastId }))
          : toast.error(res?.error?.data?.message || "An error occurred", {
              id: toastId,
            });
      } else {
        const res = (await createSemesterRegistration(data)) as TResponse<any>;
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

  if (edit) {
    if (!initialData) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      );
    }
  }

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
    >
      <CustomForm
        onSubmit={onSubmit}
        resolver={zodResolver(
          initialData
            ? updateSemesterRegistrationSchema
            : createSemesterRegistrationSchema
        )}
        defaultValues={{
          ...initialData,
          academicSemester: initialData?.academicSemester._id,
        }}
      >
        {/* name of semester  */}
        <CustomSelect
          label="Select Semester"
          name="academicSemester"
          options={semesterOptions || []}
        />

        {/* status  */}
        <CustomSelect
          label="Select Status"
          name="status"
          options={RegistrationStatusOptions}
        />

        {/* start date */}
        <CustomDatePicker label="Select Start Date" name="startDate" />

        {/* end date */}
        <CustomDatePicker label="Select End Date" name="endDate" />

        {/* min credit  */}
        <CustomInput type="number" label="Min Credit" name="minCredit" />

        {/* max credit  */}
        <CustomInput type="number" label="Max Credit" name="maxCredit" />

        <div className="responsive-button-group">
          <Button type="primary" htmlType="submit">
            {initialData
              ? "Update Academic Semester Registration"
              : "Create Academic Semester Registration"}
          </Button>
          <Button onClick={onClose} danger>
            Cancel
          </Button>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default SemesterRegistrationModal;
