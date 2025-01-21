import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TDepartment } from "../../../../types/academicManagement.types";
import { showDeleteConfirm } from "../../../../components/ui/AlertBox";
import { TTableDepartmentData } from "./AcademicDepartment";

// type declaration here

type TTableProps = {
  data?: {
    data?: TDepartment[];
  };
  handleEdit: (record: TTableDepartmentData) => void;
  handleDelete: (id: string) => void;
  isFetching: boolean;
  isFacultyFetching: boolean;
};

const DepartmentTable = ({
  data,
  isFetching,
  handleDelete,
  handleEdit,
  isFacultyFetching,
}: TTableProps) => {
  // convert to table data here
  const tableData = data?.data?.map((item) => ({
    key: item._id,
    name: item.name,
    facultyName: item.academicFaculty.name,
    facultyId: item.academicFaculty._id,
    academicFaculty: item.academicFaculty,
  }));

  const columns: ColumnsType<TTableDepartmentData> = [
    // first column here
    {
      title: "Department",
      dataIndex: "name",
      key: "name",
      align: "center",

      // custom cell style here
      onCell: () => ({
        style: {
          fontSize: "1rem",
          fontWeight: "bold",
        },
      }),
    },

    // second column here
    {
      title: "Academic Faculty",
      dataIndex: "facultyName",
      key: "facultyId",
      align: "center",

      onCell: () => ({
        style: {
          fontSize: "1rem",
          fontWeight: "bold",
        },
      }),
    },

    // third column here
    {
      align: "center",
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="responsive-table-div">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            className="responsive-table-items"
          >
            <FaEdit />
          </Button>
          <Button
            type="primary"
            className="responsive-table-items"
            onClick={() =>
              showDeleteConfirm(
                "Are you sure you want to delete this department?",
                `${record.name} will be deleted`,
                () => handleDelete(record.key)
              )
            }
            style={{ background: "red" }}
          >
            <MdDeleteForever />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table<TTableDepartmentData>
      columns={columns}
      dataSource={tableData}
      loading={isFetching || isFacultyFetching}
      rowKey="key"
      style={{ overflow: "auto" }}
    />
  );
};

export default DepartmentTable;
