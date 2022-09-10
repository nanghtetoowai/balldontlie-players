import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import paginationMiddleware from "./paginationMiddleware";

const middleware = [
  ...getDefaultMiddleware({ serializableCheck: false }),
  paginationMiddleware,
];

export default configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
});
