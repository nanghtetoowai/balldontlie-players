import React from 'react';
import { Button, Modal } from 'antd';

function CancelButton({ dirty, onClick, className }) {

  const handleClick = () => {
    if (!dirty) {
      onClick();
    } else {
      Modal.confirm({
        title: 'Are you sure want to cancel?',
        content: 'Changes you made may not be saved.',
        onOk: () => onClick(),
      });
    }
  };

  return (
    <Button htmlType="reset" onClick={handleClick} className={className}>
      Cancel
    </Button>
  );
}

export default CancelButton;
