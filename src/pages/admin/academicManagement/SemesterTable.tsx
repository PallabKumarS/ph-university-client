import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TSemester } from "../../../types/academicManagement.types";
import { FaEdit } from "react-icons/fa";
import { showDeleteConfirm } from "../../../components/ui/AlertBox";
import { MdDeleteForever } from "react-icons/md";
import { TMeta, TQueryParams } from "../../../types/global.type";
import { Dispatch, SetStateAction } from "react";
import { TTableSemesterData } from "./AcademicSemester";

type TTableProps = {
  data?: {
    data: TSemester[] | undefined;
    meta: TMeta | undefined;
  };
  setParams: Dispatch<SetStateAction<TQueryParams[]>>;
  handleEdit: (record: TTableSemesterData) => void;
  handleDelete: (id: string) => void;
  isFetching: boolean;
};

const SemesterTable = ({
  data,
  setParams,
  handleEdit,
  handleDelete,
  isFetching,
}: TTableProps) => {
  // table data
  const tableData = data?.data?.map((item) => ({
    key: item._id,
    name: item.name,
    year: item.year,
    startMonth: item.startMonth,
    endMonth: item.endMonth,
    code: item.code,
  }));

  const columns: TableColumnsType<TTableSemesterData> = [
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
      align: "center",
      title: "Action",
      render: (record) => {
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

  const onChange: TableProps<TTableSemesterData>["onChange"] = (
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
    <Table<TTableSemesterData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      loading={isFetching}
      showSorterTooltip={{ target: "sorter-icon" }}
      style={{ overflow: "auto" }}
    />
  );
};

export default SemesterTable;
