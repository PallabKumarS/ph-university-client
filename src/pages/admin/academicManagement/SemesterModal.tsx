import { Button, Col, Flex, Form, Modal } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { semesterOptions, yearOptions } from "../../../constants/semester";
import CustomForm from "../../../components/form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/academicManagement.schema";
import CustomSelect from "../../../components/form/CustomSelect";
import { monthsOptions } from "../../../constants/global";

type TModalProps = {
  setIsModalOpen: Function;
  isModalOpen: boolean;
  editData?: boolean;
};

const SemesterModal = ({ setIsModalOpen, isModalOpen }: TModalProps) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // convert code to name
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    console.log(semesterData);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {/* <Flex justify="center" align="center">
          <Col span={6}> */}
      <CustomForm
        onSubmit={onSubmit}
        resolver={zodResolver(academicSemesterSchema)}
      >
        {/* name of semester  */}
        <CustomSelect label="Name" name="name" options={semesterOptions} />

        {/* year */}
        <CustomSelect label="Year" name="year" options={yearOptions} />

        {/* start month */}
        <CustomSelect
          label="Start Month"
          name="startMonth"
          options={monthsOptions}
        />

        {/* end month */}
        <CustomSelect
          label="End Month"
          name="endMonth"
          options={monthsOptions}
        />

        <Button type="primary" htmlType="submit">
          Create Semester
        </Button>
      </CustomForm>
      {/* </Col>
        </Flex> */}
    </Modal>
  );
};

export default SemesterModal;
