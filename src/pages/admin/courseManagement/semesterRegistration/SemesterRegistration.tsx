import { useState } from "react";
import { TSemesterRegistration } from "../../../../types/courseManagement.type";
import { TQueryParams, TResponse } from "../../../../types/global.type";
import {
  useDeleteSemesterRegistrationMutation,
  useGetAllSemesterRegistrationsQuery,
} from "../../../../redux/features/admin/courseManagement/semesterRegistration.api";
import { toast } from "sonner";
import "./../../../../index.css";
import { Button } from "antd";
import SemesterRegistrationModal from "./SemesterRegistrationModal";
import SemesterRegistrationTable from "./SemesterRegistrationTable";

export type TTableSemesterRegistrationData = Pick<
  TSemesterRegistration,
  | "endDate"
  | "maxCredit"
  | "academicSemester"
  | "minCredit"
  | "startDate"
  | "status"
> & {
  key: string;
  name: string;
};

const SemesterRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] =
    useState<TTableSemesterRegistrationData | null>(null);
  const [params, setParams] = useState<TQueryParams[]>([]);

  // api hooks for semesterRegistration
  const { data: semesterRegistrationData, isFetching } =
    useGetAllSemesterRegistrationsQuery(params, {
      refetchOnReconnect: true,
    });
  const [deleteSemesterRegistration] = useDeleteSemesterRegistrationMutation();


  // handle delete function for delete button
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Semester registration...");

    try {
      const res = (await deleteSemesterRegistration(id)) as TResponse<any>;
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
  const handleEdit = (record: TTableSemesterRegistrationData) => {
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
          Academic Semesters Registration
        </h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create Semester Registration
        </Button>
      </div>
      {/* create modal here  */}
      {isModalOpen && (
        <SemesterRegistrationModal
          onClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
        />
      )}
      {/* table here  */}
      <SemesterRegistrationTable
        data={semesterRegistrationData}
        isFetching={isFetching}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        setParams={setParams}
      />
      {/* edit modal here */}
      {isEditModalOpen && editRecord && (
        <SemesterRegistrationModal
          edit={true}
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

export default SemesterRegistration;
