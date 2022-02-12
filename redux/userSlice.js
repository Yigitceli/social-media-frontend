import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const savePin = createAsyncThunk(
  "user/savePin",
  async (item, thunkAPI) => {
    try {
      const response = await axios.put(`user/pin-save`, {
        item: item,
      });
      return item;
    } catch (error) {
      return thunkAPI.rejectWithValue([]);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSaving: false,
    data: null,
    isSaveError: false,
  },
  reducers: {
    signIn: (state, action) => {
      state.data = action.payload;
    },
    logout: (state, action) => {
      state.data = null;
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("refreshToken");
    },
    save: (state, action) => {
      if (
        state.data.saved.some((item) => {
          item._id != action.payload._id;
        })
      ) {
        state.data.saved.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(savePin.fulfilled, (state, action) => {
      state.isSaving = false;
      state.isSaveError = false;
      if (
        !state.data.saved.some((item) => {
          return item._id == action.payload._id;
        })
      ) {
        state.data.saved.push(action.payload);
      }
    });
    builder.addCase(savePin.pending, (state, action) => {
      state.isSaving = true;
      state.isSaveError = false;
    });
    builder.addCase(savePin.rejected, (state, action) => {
      state.isSaving = false;
      state.isSaveError = true;
      if (
        !state.data.saved.some((item) => {
          return item._id == action.payload._id;
        })
      ) {
        state.data.saved.push(action.payload);
      }
    });
  },
});

export const { signIn, logout, save } = userSlice.actions;
export default userSlice.reducer;
