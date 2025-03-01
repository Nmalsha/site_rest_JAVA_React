import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import commentReducer from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    menus: menuReducer,
    comments: commentReducer,
  },
});
