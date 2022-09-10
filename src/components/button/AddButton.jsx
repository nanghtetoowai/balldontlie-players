import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function AddButton({ onClick, type, style, add }) {
  return (
    <div className="d-flex justify-content-end">
      <Button
        type="primary"
        className="text-bold"
        htmlType={type}
        icon={<PlusOutlined />}
        onClick={onClick}
        style={style}
      >
        Add
      </Button>
    </div>
  );
}

export default AddButton;
