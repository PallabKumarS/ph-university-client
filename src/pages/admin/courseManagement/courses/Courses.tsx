import { Button } from "antd";
import { TQueryParams, TResponse } from "../../../../types/global.type";
import { useState } from "react";
import { TCourse } from "../../../../types/courseManagement.type";
import CourseModal from "./courseModal";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/admin/courseManagement/courseManagement.api";
import { toast } from "sonner";
import "./../../../../index.css";
import CourseTable from "./courseTable";

// type declaration here
export type TTableCourseData = Pick<
  TCourse,
  "title" | "code" | "prefix" | "preRequisiteCourses" | "credits"
> & {
  key: string;
};

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<TTableCourseData | null>(null);
  const [params, setParams] = useState<TQueryParams[]>([]);

  // api hooks for semesterRegistration
  const { data: courseData, isFetching } = useGetAllCoursesQuery(params, {
    refetchOnReconnect: true,
  });
  const [deleteCourse] = useDeleteCourseMutation();

  // handle delete function for delete button
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Semester registration...");

    try {
      const res = (await deleteCourse(id)) as TResponse<any>;
      res?.data?.success
        ? toast.success(res?.data?.message, { id: toastId })
        : toast.error(res?.error?.data?.message || "An error occurred", {
            id: toastId,
          });
    } catch (error) {
      toast.error("An error occurred", { id: toastId });
    }
  };

  // handle edit function for edit button
  const handleEdit = (record: TTableCourseData) => {
    setEditRecord(record);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div
        className="responsive-flex-div"
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <h1 className="responsive-flex-items" style={{ marginBottom: "1rem" }}>
          All Courses
        </h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Course
        </Button>
      </div>

      {/* create modal here  */}
      {isModalOpen && (
        <CourseModal
          courseData={courseData}
          isCFetching={isFetching}
          onClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}

      {/* edit modal here  */}
      {isEditModalOpen && (
        <CourseModal
          courseData={courseData}
          isCFetching={isFetching}
          onClose={() => setIsEditModalOpen(false)}
          isModalOpen={isEditModalOpen}
          edit={true}
          initialData={editRecord || undefined}
        />
      )}

      {/* table here  */}
      <CourseTable
        courseData={courseData}
        setParams={setParams}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isFetching={isFetching}
      />

      {/* edit modal here  */}
      {isEditModalOpen && (
        <CourseModal
          courseData={courseData}
          isCFetching={isFetching}
          onClose={() => setIsEditModalOpen(false)}
          isModalOpen={isEditModalOpen}
          edit={true}
          initialData={editRecord || undefined}
        />
      )}
    </div>
  );
};

export default Courses;
