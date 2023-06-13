import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

export const postNewReview = createAsyncThunk(
  `api/review`,
  async ({ reviewData, req }) => {
    const { origin } = absoluteUrl(req);
    let link = `${origin}/api/reviews`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(reviewData);
      const { data } = await axios.put(link, reviewData, config);
      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const checkReview = createAsyncThunk(
  `api/review/check_review_availability`,
  async ({ id: roomId, req }) => {
    const { origin } = absoluteUrl(req);

    let link = `${origin}/api/reviews/check_review_availability?roomId=${roomId}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(link, config);
      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  isAvailable: false,
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postNewReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postNewReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(postNewReview.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(checkReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isAvailable = action.payload.isReviewAvaialable;
      })
      .addCase(checkReview.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// export const selectComments = (state) => state.comments.value;
export default reviewsSlice.reducer;
