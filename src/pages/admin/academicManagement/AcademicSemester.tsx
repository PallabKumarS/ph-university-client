import { useState } from "react";
import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";
import { Button } from "antd";
import SemesterModal from "./SemesterModal";

const AcademicSemester = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const { data, isLoading } = useGetAllSemesterQuery(undefined, {
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(data);

  return (
    <div>
      <h1>This is AcademicSemester Component</h1>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <SemesterModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default AcademicSemester;
