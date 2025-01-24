import { Dispatch, SetStateAction } from "react";
import { TCourse } from "../../../../types/courseManagement.type";
import { TMeta, TQueryParams } from "../../../../types/global.type";
import { TTableCourseData } from "./Courses";
import { Button, Table, TableColumnsType, TableProps, Tag } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { showDeleteConfirm } from "../../../../components/ui/AlertBox";
import { FaEdit } from "react-icons/fa";

// type declared here
type TTableProps = {
  courseData?: {
    data?: TCourse[] | undefined;
    meta?: TMeta | undefined;
  };
  setParams: Dispatch<SetStateAction<TQueryParams[]>>;
  handleEdit: (record: TTableCourseData) => void;
  handleDelete: (id: string) => void;
  isFetching: boolean;
};

const CourseTable = ({
  courseData,
  setParams,
  handleEdit,
  handleDelete,
  isFetching,
}: TTableProps) => {
  // table data
  const tableData: TTableCourseData[] =
    courseData?.data?.map((course) => {
      return {
        key: course?._id,
        title: course?.title,
        code: course?.code,
        prefix: course?.prefix,
        preRequisiteCourses: course?.preRequisiteCourses,
        credits: course?.credits,
      };
    }) || [];

  const columns: TableColumnsType<TTableCourseData> = [
    // first column in table
    {
      title: "Course Name",
      dataIndex: "title",
      align: "center",
    },

    // second column in table
    {
      title: "Course Code",
      dataIndex: "code",
      align: "center",

      render: (_: any, record: TTableCourseData) => {
        return `${record.prefix}  ${String(record.code)}`;
      },
    },

    // third column in table
    {
      title: "Pre Requisite Courses",
      dataIndex: "preRequisiteCourses",
      align: "center",

      render: (record: TTableCourseData) => {
        return record?.preRequisiteCourses?.length > 0 ? (
          <div className="responsive-table-div">
            {record?.preRequisiteCourses?.map((course, index) => (
              <Tag className="responsive-table-item" key={index}>
                {course?.course?.title}
              </Tag>
            ))}
          </div>
        ) : (
          <Tag>No Pre Requisite Courses</Tag>
        );
      },
    },

    // fourth column in table
    {
      align: "center",
      title: "Action",
      render: (record: TTableCourseData) => {
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
                  "Are you sure you want to delete this course ?",
                  `${record.title} course will be deleted`,
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

  const onChange: TableProps<TTableCourseData>["onChange"] = (
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
    <Table<TTableCourseData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      loading={isFetching}
      showSorterTooltip={{ target: "sorter-icon" }}
      style={{ overflow: "auto" }}
    />
  );
};
export default CourseTable;
