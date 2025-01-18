import { useState } from "react";
import { Button } from "antd";
import SemesterModal from "./SemesterModal";
import "./../../../index.css";
import {
  useDeleteSemesterMutation,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement/academicSemester.api";
import { TSemester } from "../../../types/academicManagement.types";
import { TQueryParams, TResponse } from "../../../types/global.type";
import { toast } from "sonner";
import SemesterTable from "./SemesterTable";

// type declared here
export type TTableSemesterData = Pick<
  TSemester,
  "name" | "year" | "startMonth" | "endMonth" | "code"
> & {
  key: string;
};

const AcademicSemester = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<TTableSemesterData | null>(null);
  const [params, setParams] = useState<TQueryParams[]>([]);

  // api related hooks
  const { data: semesterData, isFetching } = useGetAllSemesterQuery(params, {
    refetchOnReconnect: true,
  });
  const [deleteSemester] = useDeleteSemesterMutation();

  // handle delete function for delete button
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Semester...");

    try {
      const res = (await deleteSemester(id)) as TResponse<any>;
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
  const handleEdit = (record: TTableSemesterData) => {
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
          Academic Semesters
        </h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Semester
        </Button>
      </div>
      {/* create modal here  */}
      {isModalOpen && (
        <SemesterModal
          onClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}
      {/* table here  */}
      <SemesterTable
        data={semesterData}
        isFetching={isFetching}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        setParams={setParams}
      />
      {/* edit modal here */}{" "}
      {isEditModalOpen && editRecord && (
        <SemesterModal
          isModalOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditRecord(null);
          }}
          initialData={editRecord}
        />
      )}
    </div>
  );
};

export default AcademicSemester;
