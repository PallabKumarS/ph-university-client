import { Modal } from "antd";
import { FaExclamationCircle } from "react-icons/fa";

const { confirm } = Modal;

export const showDeleteConfirm = (
  message?: string,
  description?: string,
  onClick?: any
) => {
  confirm({
    title: message || "Do you want to delete these item ?",
    icon: (
      <FaExclamationCircle
        style={{
          textAlign: "center",
          color: "red",
          fontSize: "1.5rem",
          alignItems: "center",
          marginRight: "1rem",
        }}
      />
    ),
    content: description || "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      onClick();
    },
  });
};
