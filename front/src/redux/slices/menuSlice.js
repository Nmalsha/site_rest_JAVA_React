import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMenus = createAsyncThunk("menus/fetchMenus", async () => {
  const response = await axios.get("http://localhost:8081/api/menus");
  return response.data;
});

const menuSlice = createSlice({
  name: "menus",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    deleteMenu(state, action) {
      state.items = state.items.filter((menu) => menu.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { deleteMenu } = menuSlice.actions;

export default menuSlice.reducer;
