import React from 'react';
import { Pagination as Pager } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';

function Pagination({ total, ...rest }) {
  const { search, pathname } = useLocation();

  const navigate = useNavigate();
  const {
    page = 0,
    size = 10,
    ...params
  } = qs.parse(search, {
    ignoreQueryPrefix: true,
    skipNulls: true,
  });

  const onPageChange = (p, s) => {
    const query = qs.stringify(
      { page: p, size: s, ...params },
      { addQueryPrefix: true }
    );
    navigate(`${pathname}${query}`);
  };
  // if (params.filter) {
  //   return null;
  // }
  return (
    <Pager
      {...rest}
      className="ant-table-pagination ant-table-pagination-right"
      total={total}
      defaultPageSize={size}
      showSizeChanger
      onChange={onPageChange}
      current={Math.min(page, Math.ceil(total / size))}
    />
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
};

export default Pagination;
