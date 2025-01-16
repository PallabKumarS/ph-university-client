import { useState } from "react";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import SemesterModal from "./SemesterModal";
import "./../../../index.css";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { TSemester } from "../../../types/academicManagement.types";
import { TQueryParams } from "../../../types/global.type";

// type declared here
type TTableData = Pick<
  TSemester,
  "name" | "year" | "startMonth" | "endMonth"
> & {
  key: string;
};

const AcademicSemester = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState<TQueryParams[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemesterQuery(params, {
    refetchOnReconnect: true,
  });

  const tableData = semesterData?.data?.map((item) => ({
    key: item._id,
    name: item.name,
    year: item.year,
    startMonth: item.startMonth,
    endMonth: item.endMonth,
  }));

  const columns: TableColumnsType<TTableData> = [
    // first column in table
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Spring",
          value: "Spring",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },

    // second column in table
    {
      title: "Year",
      dataIndex: "year",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.year - b.year,
    },

    // third column in table
    {
      title: "End Month",
      dataIndex: "endMonth",
    },

    // fourth column in table
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },

    // fifth column in table
    {
      title: "Action",
      render: (_, record) => {
        return (
          <div>
            <Button type="primary" onClick={showModal}>
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });

      setParams(queryParams);
    }
  };

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

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
        <Button type="primary" onClick={showModal}>
          Create Semester
        </Button>
      </div>
      <SemesterModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Table<TTableData>
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        loading={isFetching}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicSemester;
