import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { FaEdit } from "react-icons/fa";
import { showDeleteConfirm } from "../../../../components/ui/AlertBox";
import { MdArrowDropDownCircle, MdDeleteForever } from "react-icons/md";
import { TMeta, TQueryParams } from "../../../../types/global.type";
import { Dispatch, SetStateAction } from "react";
import { TTableSemesterRegistrationData } from "./SemesterRegistration";
import { TSemesterRegistration } from "../../../../types/courseManagement.type";

type TTableProps = {
  data?: {
    data: TSemesterRegistration[] | undefined;
    meta: TMeta | undefined;
  };
  setParams: Dispatch<SetStateAction<TQueryParams[]>>;
  handleEdit: (record: TTableSemesterRegistrationData) => void;
  handleDelete: (id: string) => void;
  isFetching: boolean;
  handleStatusChange: (id: string, status: string) => void;
};

const SemesterRegistrationTable = ({
  data,
  setParams,
  handleEdit,
  handleDelete,
  isFetching,
  handleStatusChange,
}: TTableProps) => {
  // table data
  const tableData = data?.data?.map((item) => ({
    key: item._id,
    name: item.academicSemester.name + " " + item.academicSemester.year,
    endDate: new Date(item.endDate).toDateString(),
    startDate: new Date(item.startDate).toDateString(),
    maxCredit: item.maxCredit,
    minCredit: item.minCredit,
    academicSemester: item.academicSemester,
    status: item.status,
  }));

  // Menu items for the dropdown
  const statusMenuItems: MenuProps["items"] = [
    { label: "Upcoming", key: "UPCOMING" },
    { label: "Ongoing", key: "ONGOING" },
    { label: "Ended", key: "ENDED" },
  ];

  const columns: TableColumnsType<TTableSemesterRegistrationData> = [
    // first column in table
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },

    // second column in table
    {
      title: "Start Date",
      dataIndex: "startDate",
      align: "center",
    },

    // third column in table
    {
      title: "End Date",
      dataIndex: "endDate",
      align: "center",
    },

    // fourth column in table
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      // render function for status column
      render: (status: string, record: TTableSemesterRegistrationData) => {
        let color = "green";
        if (status === "UPCOMING") color = "green";
        if (status === "ONGOING") color = "blue";
        if (status === "ENDED") color = "red";

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Tag color={color}>{status}</Tag>
            <Dropdown
              menu={{
                items: statusMenuItems,
                onClick: ({ key }) => {
                  handleStatusChange(
                    record.key,
                    key as "UPCOMING" | "ONGOING" | "ENDED"
                  );
                },
              }}
              trigger={["click"]}
            >
              <Button type="link" size="small">
                <MdArrowDropDownCircle
                  style={{ fontSize: "1.5rem", color: color }}
                />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },

    // fifth column in table (action column)
    {
      align: "center",
      title: "Action",
      render: (record: TTableSemesterRegistrationData) => {
        return (
          <div className="responsive-table-div">
            {/* edit button  */}
            <Button
              type="primary"
              onClick={() => handleEdit(record)}
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
                  "Are you sure you want to delete this semester registration ?",
                  `${record.name} semester registration will be deleted`,
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

  const onChange: TableProps<TTableSemesterRegistrationData>["onChange"] = (
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
    <Table<TTableSemesterRegistrationData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      loading={isFetching}
      showSorterTooltip={{ target: "sorter-icon" }}
      style={{ overflow: "auto" }}
    />
  );
};

export default SemesterRegistrationTable;
