import { MouseEvent, useState } from "react";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import SemesterModal from "./SemesterModal";
import "./../../../index.css";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { TSemester } from "../../../types/academicManagement.types";
import { TQueryParams } from "../../../types/global.type";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { showDeleteConfirm } from "../../../components/ui/AlertBox";

// type declared here
type TTableData = Pick<
  TSemester,
  "name" | "year" | "startMonth" | "endMonth" | "code"
> & {
  key: string;
};

const AcademicSemester = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<TTableData | null>(null);
  const [params, setParams] = useState<TQueryParams[]>([]);

  // fetching data from api
  const { data: semesterData, isFetching } = useGetAllSemesterQuery(params, {
    refetchOnReconnect: true,
  });

  // delete data from api
  const handleDelete = (id: string) => {
    console.log(id);
  };

  // edit data
  const handleEdit = (record: TTableData, event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setEditRecord(record);
    setIsEditModalOpen(true);
  };

  const tableData = semesterData?.data?.map((item) => ({
    key: item._id,
    name: item.name,
    year: item.year,
    startMonth: item.startMonth,
    endMonth: item.endMonth,
    code: item.code,
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

    // fifth column in table (action column)
    {
      title: "Action",
      render: (record) => {
        return (
          <div className="responsive-table-div">
            {/* edit button  */}
            <Button
              type="primary"
              onClick={(event) => handleEdit(record, event)}
              className="responsive-table-items"
            >
              <FaEdit />
            </Button>

            {/* delete button  */}
            <Button
              type="primary"
              className="responsive-table-items"
              onClick={() =>
                showDeleteConfirm(
                  "Are you sure you want to delete this semester ?",
                  `${record.name}  ${record.year} semester will be deleted`,
                  () => handleDelete(record.key)
                )
              }
              style={{ background: "red" }}
            >
              <MdDeleteForever />
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
      {isModalOpen && (
        <SemesterModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <Table<TTableData>
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        loading={isFetching}
        showSorterTooltip={{ target: "sorter-icon" }}
        style={{ overflow: "scroll" }}
      />
      {/* edit modal here */}{" "}
      {isEditModalOpen && editRecord && (
        <SemesterModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          edit={true}
          editData={editRecord}
        />
      )}
    </div>
  );
};

export default AcademicSemester;
