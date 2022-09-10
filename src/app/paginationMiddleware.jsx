import has from "lodash/has";

const composePagination = (action) => {
  const { data } = action.payload;  

  return {
    elementsPerPage: data.meta.per_page,
    currentPage: data.meta.current_page,
    totalElements: data.meta.total_count,
  };
};

const paginationMiddleware = () => (next) => (action) => {
  if (has(action, "payload.data")) {
    const modifiedAction = {
      ...action,
      meta: { ...action.meta, ...action.payload.headers },
    };
    if (has(action, "payload.data.data")) {
      // has pagination coz double data structure.
      modifiedAction.payload = action.payload.data.data;
      modifiedAction.meta.paginations = composePagination(action);
    } else {
      modifiedAction.payload = action.payload.data;
    }
    next(modifiedAction);
  } else {
    next(action);
  }
};

export default paginationMiddleware;
