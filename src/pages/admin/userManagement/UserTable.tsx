import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { TMeta, TQueryParams } from "../../../types/global.type";
import { TStudent, TUserType } from "../../../types/userManagement.type";
import { TTableStudentData } from "./StudentData";
import { FaEdit } from "react-icons/fa";
import { showDeleteConfirm } from "../../../components/ui/AlertBox";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type TTableProps = {
  data?: {
    data?: TStudent[];
    meta?: TMeta;
  };
  handleEdit: (record: TTableStudentData) => void;
  handleDelete: (id: string) => void;
  isSFetching: boolean;
  setParams: React.Dispatch<React.SetStateAction<TQueryParams[]>>;
  userType: TUserType;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
};

const UserTable = ({
  data,
  handleEdit,
  handleDelete,
  isSFetching,
  setParams,
  userType,
  setPage,
  page,
}: TTableProps) => {
  const navigate = useNavigate();

  // converting data for table
  const metaData = data?.meta;

  const tableData = data?.data?.map((item) => ({
    key: item._id,
    name: item.fullName,
    email: item.email,
    contactNo: item.contactNo,
    id: item.id,
  }));

  const columns: TableColumnsType<TTableStudentData> = [
    // first column in table
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },

    // second column in table
    {
      title: "User Id",
      dataIndex: "id",
      sorter: true,
    },

    // third column in table
    {
      title: "Email",
      dataIndex: "email",
    },

    // fourth column in table
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },

    // fifth column in table (action column)
    {
      align: "center",
      title: "Action",
      render: (record) => {
        return (
          <div className="responsive-button-group">
            {/* details button here  */}
            <Button
              className="responsive-table-items"
              onClick={() => navigate(`/admin/${userType}s/${record.key}`)}
              style={{ color: "green", border: "1px solid green" }}
            >
              Details
            </Button>

            {/* edit button  */}
            <Button
              type="primary"
              onClick={() => handleEdit(record)}
              className=""
            >
              <FaEdit />
            </Button>

            {/* delete button  */}
            <Button
              type="primary"
              className=""
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

            <Button
              className=""
              onClick={() => {
                console.log(record.key);
              }}
              danger
            >
              Block
            </Button>
          </div>
        );
      },
    },
  ];

  // handle pagination
  const onChange: TableProps<TTableStudentData>["onChange"] = (
    _pagination,
    filters,
    sorter,
    extra
  ) => {
    // query params here
    const queryParams: TQueryParams[] = [];

    if (!Array.isArray(sorter) && sorter.order) {
      sorter.order === "ascend"
        ? queryParams.push({ name: "sort", value: "id" })
        : queryParams.push({ name: "sort", value: "-id" });
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table<TTableStudentData>
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        loading={isSFetching}
        showSorterTooltip={{ target: "sorter-icon" }}
        style={{ overflow: "auto" }}
        pagination={false}
      />

      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default UserTable;
