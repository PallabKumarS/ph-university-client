import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data, isLoading } = useGetAllSemesterQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  console.log(data);

  return (
    <div>
      <h1>This is AcademicSemester Component</h1>
    </div>
  );
};

export default AcademicSemester;
