import { Button } from "antd";
import { useState } from "react";
import UserModal from "./UserModal";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartment.api";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement/studentManagement.api";
import { TQueryParams } from "../../../types/global.type";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement/academicSemester.api";
import "./../../../index.css";
import UserTable from "./UserTable";

export type TTableStudentData = {
  key: string;
  name: string;
  email: string;
  id: string;
  contactNo: string;
};

const StudentData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<TQueryParams[]>([]);

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

  // handle edit
  const handleEdit = (record: TTableStudentData) => {
    console.log(record);
  };

  // handle delete
  const handleDelete = (id: string) => {
    console.log(id);
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
      />
    </div>
  );
};

export default StudentData;
