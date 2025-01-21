import { Button } from "antd";
import { useState } from "react";
import UserModal from "./UserModal";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartment.api";
import {
  useChangeBlockedMutation,
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "../../../redux/features/admin/userManagement/studentManagement.api";
import { TQueryParams, TResponse } from "../../../types/global.type";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement/academicSemester.api";
import "./../../../index.css";
import UserTable from "./UserTable";
import { toast } from "sonner";
import { TTableUserData } from "../../../types/userManagement.type";

const StudentData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [editData, setEditData] = useState<TTableUserData | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // api related hooks
  const { data: departmentData, isFetching: isDFetching } =
    useGetAllDepartmentQuery(undefined, {
      refetchOnReconnect: true,
    });

  const { data: studentData, isFetching: isSFetching } = useGetAllStudentsQuery(
    [...params, { name: "limit", value: 4 }, { name: "page", value: page }],
    {
      refetchOnReconnect: true,
    }
  );

  const { data: semesterData, isFetching: isSemFetching } =
    useGetAllSemesterQuery(undefined, {
      refetchOnReconnect: true,
    });

  const [changeBlocked] = useChangeBlockedMutation();

  const [deleteStudent] = useDeleteStudentMutation();

  // handle edit
  const handleEdit = (record: TTableUserData) => {
    setEditData(record);
    setEditModalOpen(true);
  };

  // handle delete
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Student...");

    try {
      const res = (await deleteStudent(id)) as TResponse<any>;

      if (res.data?.success) {
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

  // handle status change of student
  const handleStatusChange = async (id: string, status: boolean) => {
    const toastId = toast.loading("Changing Status...");

    try {
      const res = (await changeBlocked({ id, status })) as TResponse<any>;

      if (res.data?.success) {
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
    <div>
      <div
        className="responsive-flex-div"
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <h1 className="responsive-flex-items" style={{ marginBottom: "1rem" }}>
          All Students
        </h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Student
        </Button>
      </div>

      {/* create modal here  */}
      {isModalOpen && (
        <UserModal
          isModalOpen={isModalOpen}
          departmentData={departmentData}
          semesterData={semesterData}
          onClose={() => {
            setIsModalOpen(false);
          }}
          userType="student"
        />
      )}

      {/* table here  */}
      <UserTable
        page={page}
        setPage={setPage}
        userType="student"
        data={studentData}
        isSFetching={isSFetching}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        setParams={setParams}
        handleStatusChange={handleStatusChange}
      />

      {/* edit modal here  */}
      {editModalOpen && (
        <UserModal
          isModalOpen={editModalOpen}
          departmentData={departmentData}
          semesterData={semesterData}
          onClose={() => {
            setEditModalOpen(false);
          }}
          initialData={editData || undefined}
          userType="student"
        />
      )}
    </div>
  );
};

export default StudentData;
