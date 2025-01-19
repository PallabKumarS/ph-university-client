import { Button } from "antd";
import { useState } from "react";
import UserModal from "./UserModal";
import { useGetAllDepartmentQuery } from "../../../redux/features/admin/academicManagement/academicDepartment.api";



const CreateStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // api related hooks
  const { data: departmentData, isFetching } = useGetAllDepartmentQuery(
    undefined,
    {
      refetchOnReconnect: true,
    }
  );

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
      </div>

      {/* create modal here  */}
      {isModalOpen && (
        <UserModal
          isModalOpen={isModalOpen}
          departmentData={departmentData}
          onClose={() => {
            setIsModalOpen(false);
          }}
          userType="student"
        />
      )}
    </div>
  );
};

export default CreateStudent;
