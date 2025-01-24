import { Button, Modal, Skeleton } from "antd";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../../../../redux/features/admin/courseManagement/courseManagement.api";
import { TTableCourseData } from "./Courses";
import { TCourse } from "../../../../types/courseManagement.type";
import CustomForm from "../../../../components/form/CustomForm";
import { TMeta, TResponse } from "../../../../types/global.type";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomSelect from "../../../../components/form/CustomSelect";
import CustomInput from "../../../../components/form/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCourseSchema,
  updateCourseSchema,
} from "../../../../schema/courseManagement.schema";

type TModalProps = {
  onClose: () => void;
  isModalOpen: boolean;
  initialData?: TTableCourseData;
  edit?: boolean;
  courseData?: {
    data?: TCourse[];
    meta?: TMeta;
  };
  isCFetching: boolean;
};

const CourseModal = ({
  onClose,
  isModalOpen,
  initialData,
  edit = false,
  courseData,
  isCFetching,
}: TModalProps) => {
  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();

  const courseOptions = courseData?.data?.map((course) => ({
    label: course.title,
    value: course.title || "",
    disabled: isCFetching,
  }));

  // submit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(
      initialData ? "Updating Course..." : "Creating Course..."
    );

    const courseData = {
      ...data,
      preRequisiteCourses:
        data.preRequisiteCourses?.map(
          (course: { label: string; value: string }) => {
            return {
              course: course.value,
              isDeleted: false,
            };
          }
        ) || [],
    };

    try {
      if (initialData) {
        const res = (await updateCourse({
          id: initialData?.key,
          updatedData: courseData,
        })) as TResponse<any>;

        res?.data?.success
          ? (onClose(), toast.success(res?.data?.message, { id: toastId }))
          : toast.error(res?.error?.data?.message || "An error occurred", {
              id: toastId,
            });
      } else {
        const res = (await createCourse(courseData)) as TResponse<any>;

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
        defaultValues={initialData}
        resolver={zodResolver(
          initialData ? updateCourseSchema : createCourseSchema
        )}
      >
        {/* title */}
        <CustomInput type="text" label="Course Title" name="title" />

        {/* prerequisite courses  */}
        <CustomSelect
          mode="multiple"
          label="Select Prerequisite Courses"
          name="preRequisiteCourses"
          options={courseOptions || []}
        />

        {/* credits */}
        <CustomInput type="number" label="Credits" name="credits" />

        {/* prefix */}
        <CustomInput type="text" label="Prefix" name="prefix" />

        {/* code  */}
        <CustomInput type="number" label="Code" name="code" />

        <div className="responsive-button-group">
          <Button type="primary" htmlType="submit">
            {initialData ? "Update Course" : "Create Course"}
          </Button>

          {/* cancel button  */}
          <Button onClick={onClose} danger>
            Cancel
          </Button>
        </div>
      </CustomForm>
    </Modal>
  );
};

export default CourseModal;
