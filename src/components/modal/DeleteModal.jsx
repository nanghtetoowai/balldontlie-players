import React from "react";
import { Modal } from "antd";

function DeleteModal({ visible, onOk, onCancel }) {
  return (
    <Modal title="Delete" visible={visible} onOk={onOk} onCancel={onCancel}>
      <p>Are you sure you want to delete this record?</p>
    </Modal>
  );
}

export default DeleteModal;
