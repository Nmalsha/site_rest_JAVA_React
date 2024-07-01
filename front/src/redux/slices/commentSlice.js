import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCommentsByDishId = createAsyncThunk(
  "comments/fetchCommentsByDishId",
  async (dishId) => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get(
      `http://localhost:8081/api/comment/by-dish/${dishId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { dishId, comments: response.data };
  }
);

export const postComment = createAsyncThunk(
  "comments/postComment",
  async ({ dishId, commentData }) => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.post(
      `http://localhost:8081/api/comment/${dishId}`,
      commentData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    commentsByDish: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByDishId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsByDishId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.commentsByDish[action.payload.dishId] = action.payload.comments;
      })
      .addCase(fetchCommentsByDishId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        const {
          menu: { id: dishId },
          ...newComment
        } = action.payload;
        if (state.commentsByDish[dishId]) {
          state.commentsByDish[dishId].push(newComment);
        } else {
          state.commentsByDish[dishId] = [newComment];
        }
      });
  },
});

export default commentSlice.reducer;
