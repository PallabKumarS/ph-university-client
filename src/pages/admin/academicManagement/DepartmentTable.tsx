import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./../../../index.css";
import { TDepartment } from "../../../types/academicManagement.types";
import { showDeleteConfirm } from "../../../components/ui/AlertBox";
import { TTableDepartmentData } from "./AcademicDepartment";

// type declaration here

type TTableProps = {
  data?: {
    data?: TDepartment[];
  };

  handleEdit: (record: TTableDepartmentData) => void;
  handleDelete: (id: string) => void;
  isFetching: boolean;
};

const DepartmentTable = ({
  data,
  isFetching,
  handleDelete,
  handleEdit,
}: TTableProps) => {
  // convert to table data here
  const tableData = data?.data?.map((item) => ({
    key: item._id,
    name: item.name,
    academicFaculty: item.academicFaculty,
  }));

  const columns: ColumnsType<TTableDepartmentData> = [
    // first column here
    {
      title: "Name",
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
                "Are you sure you want to delete this faculty?",
                `${record.name} faculty will be deleted`,
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
      loading={isFetching}
      rowKey="key"
    />
  );
};

export default DepartmentTable;
