import React from "react";
import { Button } from "antd";

function SubmitButton({ onClick, disabled, send }) {
  return (
    <Button
      type="primary"
      htmlType="submit"
      onClick={onClick}
      disabled={disabled}
    >
      Save
    </Button>
  );
}

export default SubmitButton;
