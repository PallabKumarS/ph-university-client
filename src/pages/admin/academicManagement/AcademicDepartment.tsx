import { useState } from "react";
import { TDepartment } from "../../../types/academicManagement.types";
import { Button } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import DepartmentTable from "./DepartmentTable";
import {
  useDeleteDepartmentMutation,
  useGetAllDepartmentQuery,
} from "../../../redux/features/admin/academicManagement/academicDepartment.api";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement/academicFaculty.api";
import DepartmentModal from "./DepartmentModal";

export type TTableDepartmentData = Pick<
  TDepartment,
  "name" | "academicFaculty"
> & {
  key: string;
};

const AcademicDepartment = () => {
  const [editData, setEditData] = useState<TTableDepartmentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // api related hooks
  const { data: departmentData, isFetching } = useGetAllDepartmentQuery(
    undefined,
    {
      refetchOnReconnect: true,
    }
  );
  const { data: facultyData, isFetching: isFacultyFetching } =
    useGetAllFacultyQuery(undefined, {
      refetchOnReconnect: true,
    });
  const [deleteFaculty] = useDeleteDepartmentMutation();

  // handle edit function for edit button
  const handleEdit = (record: TTableDepartmentData) => {
    setEditData(record);
    setIsEditModalOpen(true);
  };

  // handle delete function for delete button
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Faculty...");
    try {
      const res = (await deleteFaculty(id)) as TResponse<any>;
      res?.data?.success
        ? toast.success(res?.data?.message, { id: toastId })
        : toast.error(res?.error?.data?.message || "An error occurred", {
            id: toastId,
          });
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
          Academic Departments
        </h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Department
        </Button>

        {/* create modal here  */}
        {isModalOpen && (
          <DepartmentModal
            isModalOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
            facultyData={facultyData}
          />
        )}
      </div>

      {/* table here  */}
      <DepartmentTable
        data={departmentData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isFetching={isFetching}
      />

      {/* edit modal here */}
      {isEditModalOpen && editData && (
        <DepartmentModal
          isModalOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditData(null);
          }}
          initialData={editData}
          facultyData={facultyData}
        />
      )}
    </div>
  );
};

export default AcademicDepartment;
