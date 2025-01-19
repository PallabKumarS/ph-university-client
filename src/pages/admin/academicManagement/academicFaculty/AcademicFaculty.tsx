import { useState } from "react";
import { TFaculty } from "../../../../types/academicManagement.types";
import { Button } from "antd";
import FacultyModal from "./FacultyModal";
import {
  useDeleteFacultyMutation,
  useGetAllFacultyQuery,
} from "../../../../redux/features/admin/academicManagement/academicFaculty.api";
import { toast } from "sonner";
import { TResponse } from "../../../../types/global.type";
import FacultyTable from "./FacultyTable";
import "./../../../../index.css";

export type TTableFacultyData = Pick<TFaculty, "name"> & {
  key: string;
};

const AcademicFaculty = () => {
  const [editData, setEditData] = useState<TTableFacultyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // api related hooks
  const { data: facultyData, isFetching } = useGetAllFacultyQuery(undefined, {
    refetchOnReconnect: true,
  });
  const [deleteFaculty] = useDeleteFacultyMutation();

  // handle edit function for edit button
  const handleEdit = (record: TTableFacultyData) => {
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
          Academic Faculties
        </h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Faculty
        </Button>

        {/* create modal here  */}
        {isModalOpen && (
          <FacultyModal
            isModalOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
      {/* table here  */}
      <FacultyTable
        data={facultyData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isFetching={isFetching}
      />
      {/* edit modal here */}
      {isEditModalOpen && editData && (
        <FacultyModal
          isModalOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditData(null);
          }}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default AcademicFaculty;
