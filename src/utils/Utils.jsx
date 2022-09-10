import _ from "lodash";

export const slice = (thunk, identifier) => ({
  [thunk.pending]: (state) => ({
    ...state,
    isPending: true,
  }),
  [thunk.rejected]: (state) => ({
    ...state,
    isPending: false,
    hasError: true,
  }),
  [thunk.fulfilled]: (state, action) => {
    if (_.isArray(action.payload)) {
      return {
        ...state,
        hasError: false,
        isPending: false,
        data: { ...action.data, ..._.keyBy(action.payload, identifier) },
        meta: action.meta,
      };
    }
    if (_.isObject(action.payload)) {
      return {
        ...state,
        hasError: false,
        isPending: false,
        data: { ...state.data, ..._.keyBy([action.payload], identifier) },
        meta: { ...state.meta, ...action.meta },
      };
    }
    // eslint-disable-next-line no-console
    console.error(
      "Invalid payload type, cannot reduce by identifier",
      action.payload
    );
    return state;
  },
});

export const sliceBy = (thunk, composer) => ({
  [thunk.pending]: (state) => ({
    ...state,
    isPending: true,
  }),
  [thunk.rejected]: (state) => ({
    ...state,
    isPending: false,
    hasError: true,
  }),
  [thunk.fulfilled]: composer,
});


export const initialiseSelector = (reducer) => {
  if (reducer) {
    const { data = {}, isPending, meta = {} } = reducer;
    const selectedData = {
      data,
      isPending,
      paginations: meta.paginations,
    };
    return selectedData;
  }
  return {
    data: {},
    isPending: true,
    hasError: false,
  };
};